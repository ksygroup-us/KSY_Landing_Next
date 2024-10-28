//src/components/BlogArticle.tsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin, Download, Bookmark, Share } from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

interface BlogArticleProps {
  id: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ id }) => {
  const [showActions, setShowActions] = useState(false);
  const articleData = blogArticles[parseInt(id) as keyof typeof blogArticles];

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  if (!articleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/insights/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/insights/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Blog
      </Link>

      {/* Action Buttons - Vertical Alignment with Toggle */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
        <button
          onClick={toggleActions}
          className="p-3 rounded-full bg-[rgb(106,27,154)] text-white hover:bg-[rgb(86,7,134)] transition-colors mb-2"
        >
          <Share2 className="w-5 h-5" />
        </button>

        {showActions && (
          <div className="flex flex-col gap-4 transition-all duration-300">
            {/* Primary Actions */}
            <div className="flex flex-col gap-3">
              <button className="p-3 rounded-full bg-[rgb(106,27,154)] text-white hover:bg-[rgb(86,7,134)] transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-[rgb(106,27,154)] text-white hover:bg-[rgb(86,7,134)] transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300"></div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3">
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Twitter className="w-5 h-5 text-[rgb(106,27,154)]" />
              </button>
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5 text-[rgb(106,27,154)]" />
              </button>
              <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Linkedin className="w-5 h-5 text-[rgb(106,27,154)]" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
        <Image
          src={articleData.image}
          alt={articleData.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transform hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">{articleData.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            {articleData.date}
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            {articleData.readTime}
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            {articleData.author}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {articleData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
      </div>
    </article>
  );
};

export default BlogArticle;


// "All Blogs",
//  "Chemical Reports",
// "Chemical Market",
// "Chemical Sourcing",
// "Flavours & Fragrances",
// "Intermediates & Solvents",
// "Paints & Coatings",
// "Personal Care",
// "Supply Chain",
// "Technology & Digitisation",
// "Green Chemistry",
// "Regulatory Compliance",
// "Industry Trends",
// "Innovation",
// "Sustainability",
// "Manufacturing",
// "Trading",
// "Distribution",
// "Environment",
// "Safety",
// "Quality Control",
// "Risk Management",
// "Blockchain",
// "AI",
// "Digital Transformation",
// "Circular Economy",
// "Future Trends",
// "Strategy",
// "Operations"
