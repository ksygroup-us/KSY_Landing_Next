//src/app/insights/report/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FileText, Download, Search, Calendar, User, Clock, Mail, Share2, FileSearch,
  BookOpen, Bookmark, Eye, ThumbsUp, Printer, ExternalLink, AlertCircle, Tag, TrendingUp, File, Save, FileDown, Star, Info, Copy, ArrowUpRight
} from 'lucide-react'; // ... existing imports ...
// import { Report } from '../types/report'; // Import the Report type
import { reportService } from '@/services/reportService'; // Import the report service
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const gradientOverlay = `
  linear-gradient(
    60deg,
    rgba(106, 27, 154, 0.95),
    rgba(106, 27, 154, 0.85)
  )
`;

// Enhanced Report Interface
interface Report {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: {
    id: string;
    name: string;
    role: string;
    image: string;
    department: string;
  };
  image: string;
  tags: string[];
  category: string;
  downloadUrl?: string;
  pdfSize?: string;
  readTime?: string;
  highlights?: string[];
  stats: {
    views: number;
    downloads: number;
    likes: number;
    shares: number;
  };
  metadata: {
    fileFormat: string;
    pageCount: number;
    lastUpdated: string;
    version: string;
    language: string;
    fileSize: string;
  };
  relatedReports?: string[];
  status: 'new' | 'updated' | 'featured' | 'trending';
  access: 'public' | 'premium' | 'restricted';
  preview?: {
    url: string;
    thumbnails: string[];
  };
  citations?: {
    apa: string;
    mla: string;
    chicago: string;
  };
}

// Report tags with categories
const reportCategories = {
  "Market Research": ["Industry Analysis", "Market Trends", "Competitive Landscape", "Growth Opportunities"],
  "Technical": ["Research & Development", "Process Innovation", "Quality Control", "Production Methods"],
  "Environmental": ["Sustainability", "Green Chemistry", "Environmental Impact", "Waste Management"],
  "Regulatory": ["Compliance", "Safety Standards", "Trade Regulations", "Policy Updates"],
  "Strategy": ["Business Development", "Strategic Planning", "Risk Assessment", "Investment Analysis"]
};

// Create a flat array of all tags including categories
const allTags = ["All Reports", ...Object.keys(reportCategories), 
  ...Object.values(reportCategories).flat()];


export default function ReportsPage() {
  const [selectedTag, setSelectedTag] = useState("All Reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Add these state variables to your component
  const [bookmarkedReports, setBookmarkedReports] = useState<Set<string | number>>(new Set());
  const [likedReports, setLikedReports] = useState<Set<string | number>>(new Set());
  const [savedReports, setSavedReports] = useState<Set<string | number>>(new Set());
  const [starredReports, setStarredReports] = useState<Set<string | number>>(new Set());
  const [showMetadata, setShowMetadata] = useState<string | number | null>(null);

  // Replace reportArticles with reports
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await reportService.getReports(); // Fetch reports from Supabase
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
                      (Array.isArray(report.tags) && report.tags.includes(selectedTag)) || 
                      report.category === selectedTag;
    const matchesSearch = !searchTerm || 
                         report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleShare = async (report: Report) => {
    const shareData = {
      title: report.title,
      text: report.excerpt,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleEmail = (report: Report) => {
    const subject = encodeURIComponent(report.title);
    const body = encodeURIComponent(`Check out this report: ${report.title}\n\n${report.excerpt}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Add this handler to your component
  const handleBookmark = async (report: Report) => {
    try {
      await reportService.toggleBookmark('current-user-id', report.id); // Toggle bookmark in the database
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

  const handleSave = (report: Report) => {
    setSavedReports(prev => {
      const newSaved = new Set(prev);
      newSaved.has(report.id) ? newSaved.delete(report.id) : newSaved.add(report.id);
      return newSaved;
    });
  };

  const handleStar = (report: Report) => {
    setStarredReports(prev => {
      const newStarred = new Set(prev);
      newStarred.has(report.id) ? newStarred.delete(report.id) : newStarred.add(report.id);
      return newStarred;
    });
  };

  const handleCitationCopy = (report: Report, format: 'apa' | 'mla' | 'chicago') => {
    navigator.clipboard.writeText(report.citations?.[format] || '');
    alert(`${format.toUpperCase()} citation copied to clipboard!`);
  };

  const handlePrint = (report: Report) => {
    window.print();
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Main spinner */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[rgb(106,27,154)]"></div>
        
        {/* Secondary spinner */}
        <div className="absolute top-0 left-0 animate-spin rounded-full h-32 w-32 border-r-4 border-l-4 border-purple-300 animate-[spin_3s_linear_infinite]"></div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-[rgb(106,27,154)] animate-pulse flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-[rgb(106,27,154)] text-lg font-semibold mb-2">Loading</p>
          <div className="flex items-center gap-1">
            {[0, 150, 300].map((delay) => (
              <div key={delay} className="w-2 h-2 rounded-full bg-[rgb(106,27,154)] animate-bounce" style={{ animationDelay: `${delay}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative min-h-[400px] font-['Inter'] antialiased">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] bg-cover bg-center"
        style={{ backgroundImage: `${gradientOverlay}, url('/api/placeholder/1920/400')` }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Decorative Elements */}
        <motion.div 
          className="w-16 h-1 bg-white mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6 }}
        />

        {/* Main Content */}
        <div className="text-center">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 
                       tracking-tight leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            Industry Reports & Insights
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8
                       leading-relaxed font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            Explore key trends and opportunities in the chemical industry through 
            our comprehensive analyses and expert insights.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <button className="group bg-white text-purple-800 px-6 py-3 rounded-full
                             font-medium transition-all duration-300
                             hover:bg-purple-50 hover:shadow-lg
                             active:shadow-md active:transform active:translate-y-0.5
                             focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                             focus:ring-offset-purple-800">
              <span className="flex items-center space-x-2">
                <span>View Latest Reports</span>
                <ArrowRight className="w-4 h-4 transform transition-transform 
                                     group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <ChevronDown className="w-6 h-6 text-white/70 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Optional: Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto transform translate-y-1"
        >
          <path 
            d="M0 50L48 45.7C96 41.3 192 32.7 288 29.2C384 25.7 480 27.3 576 35.8C672 44.3 768 59.7 864 64.2C960 68.7 1056 62.3 1152 55.8C1248 49.3 1344 42.7 1392 39.3L1440 36V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-[rgb(106,27,154)] focus:ring-2 focus:ring-[rgb(106,27,154)] focus:ring-opacity-50 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-[rgb(106,27,154)] text-white shadow-lg transform -translate-y-0.5'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={report.image}
                  alt={report.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
              </div>

              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-[rgb(106,27,154)] rounded-full text-xs font-semibold">
                    {report.category}
                  </span>
                  {report.readTime && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.readTime}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[rgb(106,27,154)] transition-colors duration-300">
                  {report.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {report.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  {report.author ? (
                    <span className="text-sm text-gray-600">{report.author.name}</span>
                  ) : (
                    <span className="text-sm text-gray-600">Unknown Author</span>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(report.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Primary Actions  or Raw 1 and column 1 */}
                  <div className="flex gap-2 items-center">
                    <Link href={`/insights/report/${report.id}`} className="flex-1">
                      <button className="w-auto px-2 py-1 bg-[rgb(106,27,154)] text-white rounded-full text-sm font-medium hover:bg-[rgb(86,7,134)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        <FileText className="h-4 w-4" />
                        Read Report {/* Button to navigate to the report detail page */}
                      </button>
                    </Link>
                    
                    <div className="flex gap-1">
                      {/* Quick Actions, Raw 1 and column 2 */}
                      <button 
                        onClick={() => handleBookmark(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          bookmarkedReports.has(report.id) 
                            ? 'text-yellow-500 bg-yellow-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Bookmark Report"
                      >
                        <Bookmark className="h-5 w-5" />
                        {/* Button to bookmark the report */}
                      </button>

                      <button 
                        onClick={() => handleSave(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          savedReports.has(report.id) 
                            ? 'text-blue-500 bg-blue-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Save for Later"
                      >
                        <Save className="h-5 w-5" />
                        {/* Button to save the report for later */}
                      </button>

                      <button 
                        onClick={() => handleStar(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          starredReports.has(report.id) 
                            ? 'text-orange-500 bg-orange-50' 
                            : 'text-gray-400 hover:bg-gray-500'
                        }`}
                        title="Star Report"
                      >
                        <Star className="h-5 w-5" />
                        {/* Button to star the report */}
                      </button>
                    </div>
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-1">     
                      <button 
                        onClick={() => handleEmail(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Email Report">
                        <Mail className="h-5 w-5" />
                        {/* Button to email the report */}
                      </button>
                      
                      <button 
                        onClick={() => handleShare(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Share Report"
                      >
                        <Share2 className="h-5 w-5" />
                        {/* Button to share the report */}
                      </button>

                      <button 
                        onClick={() => handlePrint(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Print Report"
                      >
                        <Printer className="h-5 w-5" />
                        {/* Button to print the report */}
                      </button>

                      {report.downloadUrl && (
                        <button 
                          onClick={() => window.open(report.downloadUrl, '_blank')}
                          className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                          title="Download PDF"
                        >
                          <Download className="h-5 w-5" />
                          {/* Button to download the report as a PDF */}
                        </button>
                      )}
                      


                    </div>

                    <div className="flex gap-1">     
                      <button 
                        onClick={() => handleLike(report)}
                        className={`p-2 rounded-full transition-all duration-300 tooltip ${
                          likedReports.has(report.id) 
                            ? 'text-red-500 bg-red-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Like Report"
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="text-xs ml-1">
                          {report.stats ? report.stats.likes : 0}
                        </span>
                        {/* Button to like the report */}
                      </button>

                      <button
                        onClick={() => setShowMetadata(showMetadata === report.id ? null : report.id)}
                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all duration-300 tooltip"
                        title="Show Details"
                      >
                        <Info className="h-5 w-5" />
                        {/* Button to toggle the display of report metadata */}
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => {/* Toggle citation dropdown */}}
                          className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all duration-300 tooltip"
                          title="Copy Citation"
                        >
                          <Copy className="h-5 w-5" />
                          {/* Button to copy the citation of the report */}
                        </button>
                        {/* Citation Dropdown (Add show/hide logic) */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                          <div className="py-1">
                            <button
                              onClick={() => handleCitationCopy(report, 'apa')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy APA
                              {/* Button to copy APA citation */}
                            </button>
                            <button
                              onClick={() => handleCitationCopy(report, 'mla')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy MLA
                              {/* Button to copy MLA citation */}
                            </button>
                            <button
                              onClick={() => handleCitationCopy(report, 'chicago')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy Chicago
                              {/* Button to copy Chicago citation */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Panel */}
                  {showMetadata === report.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Format:</span> {report.metadata?.fileFormat || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {report.metadata?.fileSize || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Pages:</span> {report.metadata?.pageCount || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Version:</span> {report.metadata?.version || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span> {report.metadata?.lastUpdated || 'N/A'}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span> {report.metadata?.language || 'N/A'}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="font-medium">Stats:</span>
                        <div className="flex gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" /> {report.stats?.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" /> {report.stats?.downloads || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" /> {report.stats?.shares || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 border border-gray-300 rounded-lg bg-gray-50"
          >
            <FileSearch className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any reports matching your criteria. Please try adjusting your search or explore our latest reports.
            </p>
            <button
              onClick={() => {
                setSelectedTag("All Reports");
                setSearchTerm("");
              }}
              className="text-[rgb(106,27,154)] hover:text-[rgb(86,7,134)] font-medium border border-[rgb(106,27,154)] rounded px-4 py-2 transition duration-300"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
