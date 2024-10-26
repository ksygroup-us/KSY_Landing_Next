//src/components/BlogArticle.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

interface BlogArticleProps {
  id: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ id }) => {
  const articleData = blogArticles[parseInt(id) as keyof typeof blogArticles];

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

        <div className="border-t border-gray-200 pt-6 mt-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share this article
          </h3>
          <div className="flex gap-4">
            <button className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <Twitter className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </button>
    
            {/* Add more sharing options as needed */}
          </div>
        </div>
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
