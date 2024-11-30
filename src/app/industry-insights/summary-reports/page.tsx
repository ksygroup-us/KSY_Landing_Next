'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSearch } from 'lucide-react';
import { reportService } from '@/services/reportService';
import { Report } from '@/types/blog';
import PageHeader from '@/components/ui/PageHeader';
import TagFilter from '@/components/ui/TagFilter';
import ReportCard from '@/components/reports/ReportCard';

const reportCategories = {
  "Market Research": ["Industry Analysis", "Market Trends", "Growth Opportunities"],
  "Environmental": ["Sustainability", "Green Chemistry"],
  "Regulatory": ["Compliance", "Safety Standards", "Trade Regulations", "Policy Updates"],
  "Strategy": ["Risk Assessment", "Investment Analysis"]
};

const allTags = ["All Reports", ...Object.keys(reportCategories), 
  ...Object.values(reportCategories).flat()];

export default function ReportsPage() {
  const [selectedTag, setSelectedTag] = useState("All Reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [bookmarkedReports, setBookmarkedReports] = useState<Set<string | number>>(new Set());
  const [likedReports, setLikedReports] = useState<Set<string | number>>(new Set());
  const [showMetadata, setShowMetadata] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportService.getReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesTag = selectedTag === "All Reports" || 
                      report.tags.includes(selectedTag) || 
                      report.category === selectedTag;
    const matchesSearch = !searchTerm || 
                         report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Action Handlers
  const handleShare = async (report: Report) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: report.title,
          text: report.excerpt,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleBookmark = async (report: Report) => {
    try {
      await reportService.toggleBookmark('current-user-id', report.id);
      setBookmarkedReports(prev => {
        const newBookmarks = new Set(prev);
        newBookmarks.has(report.id) ? newBookmarks.delete(report.id) : newBookmarks.add(report.id);
        return newBookmarks;
      });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleLike = (report: Report) => {
    setLikedReports(prev => {
      const newLikes = new Set(prev);
      newLikes.has(report.id) ? newLikes.delete(report.id) : newLikes.add(report.id);
      return newLikes;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-800"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageHeader
        title="Industry Reports & Insights"
        description="Access comprehensive reports and analysis on the chemical industry landscape."
        buttonText="View Latest Reports"
      />

      <div className="container mx-auto px-4 py-12">
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onAction={{
                download: handleDownload,
                bookmark: handleBookmark,
                like: handleLike,
                share: handleShare,
                showDetails: setShowMetadata,
              }}
              states={{
                isBookmarked: bookmarkedReports.has(report.id),
                isLiked: likedReports.has(report.id),
                showMetadata: showMetadata === report.id,
              }}
            />
          ))}
        </div>

        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FileSearch className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or browse all reports
            </p>
            <button
              onClick={() => {
                setSelectedTag("All Reports");
                setSearchTerm("");
              }}
              className="text-purple-800 hover:text-purple-900 font-medium"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}