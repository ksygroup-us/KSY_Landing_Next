import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Clock, Download, Eye, Share2, FileText,
  ThumbsUp, Bookmark, Info
} from 'lucide-react';
import { Report } from '@/types/blog';

interface ReportCardProps {
  report: Report;
  onAction: {
    download: (url: string) => void;
    bookmark: (report: Report) => void;
    like: (report: Report) => void;
    share: (report: Report) => void;
    showDetails: (id: string | number) => void;
  };
  states: {
    isBookmarked: boolean;
    isLiked: boolean;
    showMetadata: boolean;
  };
}

export default function ReportCard({ report, onAction, states }: ReportCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={report.image}
          alt={report.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
            {report.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-800 transition-colors duration-300">
          {report.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{report.excerpt}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {report.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {report.readTime}
            </span>
          )}
          {report.stats && (
            <>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {report.stats.views}
              </span>
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {report.stats.downloads}
              </span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href={`/industry-insights/summary-reports/${report.id}`}>
            <button className="w-full px-4 py-2 bg-purple-800 text-white rounded-lg text-sm font-semibold 
              hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              Read Report
            </button>
          </Link>
          <button
            onClick={() => report.downloadUrl && onAction.download(report.downloadUrl)}
            className="w-full px-4 py-2 border border-purple-800 text-purple-800 rounded-lg text-sm font-semibold 
              hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex gap-3">
            <button
              onClick={() => onAction.bookmark(report)}
              className={`p-2 rounded-full transition-colors duration-200 
                ${states.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAction.like(report)}
              className={`p-2 rounded-full transition-colors duration-200 
                ${states.isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
            >
              <ThumbsUp className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAction.share(report)}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => onAction.showDetails(report.id)}
            className={`p-2 rounded-full transition-colors duration-200 
              ${states.showMetadata ? 'text-purple-500 bg-purple-50' : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50'}`}
          >
            <Info className="h-5 w-5" />
          </button>
        </div>

        {/* Metadata Panel */}
        {states.showMetadata && report.metadata && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-purple-900">Format:</span>
                <span className="text-gray-700 ml-2">{report.metadata.fileFormat}</span>
              </div>
              <div>
                <span className="font-medium text-purple-900">Size:</span>
                <span className="text-gray-700 ml-2">{report.metadata.fileSize}</span>
              </div>
              <div>
                <span className="font-medium text-purple-900">Pages:</span>
                <span className="text-gray-700 ml-2">{report.metadata.pageCount}</span>
              </div>
              <div>
                <span className="font-medium text-purple-900">Updated:</span>
                <span className="text-gray-700 ml-2">{report.metadata.lastUpdated}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 