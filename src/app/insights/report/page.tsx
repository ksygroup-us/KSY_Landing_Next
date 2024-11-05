//src/app/insights/report/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Search, Calendar, User, Clock, Mail, Share2, FileSearch,
  BookOpen, Bookmark, Eye, ThumbsUp, Printer, ExternalLink, AlertCircle, Tag, 
  TrendingUp, File, Save, FileDown, Star, Info, Copy, ArrowUpRight, ArrowRight
} from 'lucide-react';
import { reportService } from '@/services/reportService';

const gradientOverlay = `
  linear-gradient(
    60deg,
    rgba(106, 27, 154, 0.95),
    rgba(106, 27, 154, 0.85)
  )
`;

// Interface definitions
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

const reportCategories = {
  "Market Research": ["Industry Analysis", "Market Trends",  "Growth Opportunities"],
  // "Technical": ["Research & Development", "Process Innovation", "Quality Control", ],
  "Environmental": ["Sustainability", "Green Chemistry"],
  "Regulatory": ["Compliance", "Safety Standards", "Trade Regulations", "Policy Updates"],
  "Strategy": [ "Risk Assessment", "Investment Analysis"]
};
//  "Strategic Planning", "Production Methods", "Competitive Landscape", "Waste Management", "Environmental Impact", "Business Development",

const allTags = ["All Reports", ...Object.keys(reportCategories), 
  ...Object.values(reportCategories).flat()];

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

export default function ReportsPage() {
  const [selectedTag, setSelectedTag] = useState("All Reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [bookmarkedReports, setBookmarkedReports] = useState<Set<string | number>>(new Set());
  const [likedReports, setLikedReports] = useState<Set<string | number>>(new Set());
  const [savedReports, setSavedReports] = useState<Set<string | number>>(new Set());
  const [starredReports, setStarredReports] = useState<Set<string | number>>(new Set());
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
                      (Array.isArray(report.tags) && report.tags.includes(selectedTag)) || 
                      report.category === selectedTag;
    const matchesSearch = !searchTerm || 
                         report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

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

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[rgb(106,27,154)]"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-32 w-32 border-r-4 border-l-4 border-purple-300 animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-[rgb(106,27,154)] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[250px] font-['Inter'] antialiased">
        <div
          className="absolute inset-0 bg-[url('/api/placeholder/1920/250')] bg-cover bg-center"
          style={{ backgroundImage: `${gradientOverlay}, url('/api/placeholder/1920/250')` }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto pt-8">
          <motion.div
            className="w-12 h-0.5 bg-white mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.6 }}
          />
          
          <div className="text-center px-4">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Industry Reports & Insights
            </motion.h1>
            
            <motion.p
              className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore key trends and opportunities in the chemical industry through our expert insights.
            </motion.p>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button className="group bg-white text-purple-800 px-5 py-2 rounded-full text-sm font-medium 
                transition-all duration-300 hover:bg-purple-50 hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800">
                <span className="flex items-center space-x-2">
                  <span>View Latest Reports</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto transform translate-y-1"
          >
            <path
              d="M0 25L48 22.85C96 20.65 192 16.35 288 14.6C384 12.85 480 13.65 576 17.9C672 22.15 768 29.85 864 32.1C960 34.35 1056 31.15 1152 27.9C1248 24.65 1344 21.35 1392 19.65L1440 18V50H1392C1344 50 1248 50 1152 50C1056 50 960 50 864 50C768 50 672 50 576 50C480 50 384 50 288 50C192 50 96 50 48 50H0V25Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
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
            {/* Image Section */}
            <div className="relative h-48">
              <Image
                src={report.image}
                alt={report.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 relative">
              {/* Category and Read Time */}
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

              {/* Title and Excerpt */}
              <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[rgb(106,27,154)] transition-colors duration-300">
                {report.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {report.excerpt}
              </p>

              {/* Author and Date */}
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

              {/* Actions Container */}
              <div className="space-y-6">
                {/* Main Action Bar */}
                <div className="flex flex-col gap-4">
                  {/* Primary Actions Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Read Report Button */}
                    <Link href={`/insights/report/${report.id}`} className="group">
                      <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[rgb(106,27,154)] to-[rgb(126,47,174)] 
                        text-white rounded-xl text-sm font-semibold shadow-lg 
                        hover:shadow-purple-200/50 hover:scale-[1.02] 
                        active:scale-[0.98] transform transition-all duration-200 
                        flex items-center justify-center gap-2"
                      >
                        <FileText className="h-4 w-4 transition-transform group-hover:rotate-6" />
                        <span>Read Full Report</span>
                      </button>
                    </Link>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(report.downloadUrl!)}
                      className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500
                        text-white rounded-xl text-sm font-semibold shadow-lg 
                        hover:shadow-emerald-200/50 hover:scale-[1.02] 
                        active:scale-[0.98] transform transition-all duration-200 
                        flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
                    <div className="grid grid-cols-4 gap-2">
                      {/* Favorite Actions */}
                      <button 
                        onClick={() => handleBookmark(report)}
                        className={`group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          ${bookmarkedReports.has(report.id) 
                            ? 'bg-yellow-50 hover:bg-yellow-100/80' 
                            : 'bg-white hover:bg-yellow-50'
                          }`}
                        title="Bookmark Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Bookmark className={`h-5 w-5 transition-colors duration-200 
                            ${bookmarkedReports.has(report.id) 
                              ? 'text-yellow-500' 
                              : 'text-gray-400 group-hover:text-yellow-500'
                            }`} 
                          />
                          <span className={`text-xs font-medium transition-colors duration-200
                            ${bookmarkedReports.has(report.id)
                              ? 'text-yellow-600'
                              : 'text-gray-500 group-hover:text-yellow-600'
                            }`}>
                            Bookmark
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleSave(report)}
                        className={`group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          ${savedReports.has(report.id) 
                            ? 'bg-blue-50 hover:bg-blue-100/80' 
                            : 'bg-white hover:bg-blue-50'
                          }`}
                        title="Save for Later"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Save className={`h-5 w-5 transition-colors duration-200 
                            ${savedReports.has(report.id) 
                              ? 'text-blue-500' 
                              : 'text-gray-400 group-hover:text-blue-500'
                            }`} 
                          />
                          <span className={`text-xs font-medium transition-colors duration-200
                            ${savedReports.has(report.id)
                              ? 'text-blue-600'
                              : 'text-gray-500 group-hover:text-blue-600'
                            }`}>
                            Save
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleStar(report)}
                        className={`group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          ${starredReports.has(report.id) 
                            ? 'bg-orange-50 hover:bg-orange-100/80' 
                            : 'bg-white hover:bg-orange-50'
                          }`}
                        title="Star Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Star className={`h-5 w-5 transition-colors duration-200 
                            ${starredReports.has(report.id) 
                              ? 'text-orange-500' 
                              : 'text-gray-400 group-hover:text-orange-500'
                            }`} 
                          />
                          <span className={`text-xs font-medium transition-colors duration-200
                            ${starredReports.has(report.id)
                              ? 'text-orange-600'
                              : 'text-gray-500 group-hover:text-orange-600'
                            }`}>
                            Star
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleLike(report)}
                        className={`group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          ${likedReports.has(report.id) 
                            ? 'bg-red-50 hover:bg-red-100/80' 
                            : 'bg-white hover:bg-red-50'
                          }`}
                        title="Like Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <ThumbsUp className={`h-5 w-5 transition-colors duration-200 
                            ${likedReports.has(report.id) 
                              ? 'text-red-500' 
                              : 'text-gray-400 group-hover:text-red-500'
                            }`} 
                          />
                          <span className={`text-xs font-medium transition-colors duration-200
                            ${likedReports.has(report.id)
                              ? 'text-red-600'
                              : 'text-gray-500 group-hover:text-red-600'
                            }`}>
                            Like
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Share Actions Grid */}
                  <div className="bg-gray-50/50 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
                    <div className="grid grid-cols-5 gap-2">
                      <button 
                        onClick={() => handleEmail(report)}
                        className="group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          bg-white hover:bg-purple-50"
                        title="Email Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Mail className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-purple-600 transition-colors duration-200">
                            Email
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleShare(report)}
                        className="group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          bg-white hover:bg-purple-50"
                        title="Share Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Share2 className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-purple-600 transition-colors duration-200">
                            Share
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handlePrint(report)}
                        className="group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          bg-white hover:bg-purple-50"
                        title="Print Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Printer className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-purple-600 transition-colors duration-200">
                            Print
                          </span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleCitationCopy(report, 'apa')}
                        className="group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          bg-white hover:bg-purple-50"
                        title="Cite Report"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Copy className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-purple-600 transition-colors duration-200">
                            Cite
                          </span>
                        </div>
                      </button>

                      <button
                        onClick={() => setShowMetadata(showMetadata === report.id ? null : report.id)}
                        className={`group p-3 rounded-xl transition-all duration-200 
                          hover:scale-105 active:scale-95 shadow-sm hover:shadow-md
                          ${showMetadata === report.id 
                            ? 'bg-purple-50 hover:bg-purple-100/80' 
                            : 'bg-white hover:bg-purple-50'
                          }`}
                        title="Show Details"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Info className={`h-5 w-5 transition-colors duration-200 
                            ${showMetadata === report.id 
                              ? 'text-purple-500' 
                              : 'text-gray-400 group-hover:text-purple-500'
                            }`} 
                          />
                          <span className={`text-xs font-medium transition-colors duration-200
                            ${showMetadata === report.id
                              ? 'text-purple-600'
                              : 'text-gray-500 group-hover:text-purple-600'
                            }`}>
                            Details
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Metadata Panel */}
                {showMetadata === report.id && (
                  <div className="mt-4 p-5 bg-gradient-to-br from-gray-50 to-purple-50/30 
                    rounded-xl shadow-sm border border-purple-100/50 text-sm backdrop-blur-sm"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Format", value: report.metadata?.fileFormat },
                        { label: "Size", value: report.metadata?.fileSize },
                        { label: "Pages", value: report.metadata?.pageCount },
                        { label: "Version", value: report.metadata?.version },
                        { label: "Last Updated", value: report.metadata?.lastUpdated },
                        { label: "Language", value: report.metadata?.language }
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white p-3 rounded-xl shadow-sm">
                          <span className="font-medium text-purple-900">{label}:</span>{' '}
                          <span className="text-gray-700">{value || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 bg-white p-4 rounded-xl shadow-sm">
                      <span className="font-medium text-purple-900">Stats:</span>
                      <div className="flex gap-6 mt-2">
                        <span className="flex items-center gap-2 text-gray-700">
                          <Eye className="h-4 w-4 text-purple-500" /> 
                          <span className="font-medium">{report.stats?.views || 0}</span> views
                        </span>
                        <span className="flex items-center gap-2 text-gray-700">
                          <Download className="h-4 w-4 text-purple-500" /> 
                          <span className="font-medium">{report.stats?.downloads || 0}</span> downloads
                        </span>
                        <span className="flex items-center gap-2 text-gray-700">
                          <Share2 className="h-4 w-4 text-purple-500" /> 
                          <span className="font-medium">{report.stats?.shares || 0}</span> shares
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