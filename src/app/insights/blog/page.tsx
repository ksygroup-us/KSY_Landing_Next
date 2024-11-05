//src/app/insights/blog/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogArticles } from '@/data/blogArticles';
// import BlogArticle from '@/components/BlogArticle';

// Add type definitions for blog post
interface BlogPost {
  title: string;
  image: string;
  excerpt: string;
  tags: string[];
  date: string;
  author: string;
}

const tags = [
  "All Blogs",
  "Chemical Reports",
  "Chemical Market",
  "Chemical Sourcing",
  "AI",
  "Flavours & Fragrances",
  "Intermediates & Solvents",
  "Paints & Coatings",
  "Personal Care",
  "Supply Chain",
  "Technology & Digitisation",
  "Green Chemistry",
  "Regulatory Compliance",
  "Industry Trends",
  "Innovation",
  "Sustainability"
];

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All Blogs");

  const filteredBlogArticles = Object.entries(blogArticles).filter(([_, post]: [string, BlogPost]) => 
    selectedTag === "All Blogs" || post.tags.includes(selectedTag)
  );

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">KSY Group Blogs</h1>
      
      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTag === tag
                ? 'bg-[rgb(106,27,154)] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-[rgb(106,27,154)] hover:text-white transition-colors duration-300'
            } transition-colors duration-300`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredBlogArticles.map(([id, post]) => (
          <Link href={`/insights/blog/${id}`} key={id} className="block group h-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full relative">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-[rgb(106,27,154)] transition-colors duration-300">{post.title}</h2>
                <div className="flex-grow relative">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white via-white to-transparent">
                    <span className="text-[rgb(106,27,154)] font-semibold px-4 py-2 rounded-full border border-[rgb(106,27,154)] hover:bg-[rgb(106,27,154)] hover:text-white transition-all duration-300">
                      Read More
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="block mb-1">{new Date(post.date).toLocaleDateString()}</span>
                    <span className="block">By {post.author}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[rgb(106,27,154)] via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
