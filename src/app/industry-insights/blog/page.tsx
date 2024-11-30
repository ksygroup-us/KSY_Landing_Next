//src/app/insights/blog/page.tsx
'use client';

import React, { useState } from 'react';
import { blogArticles } from '@/data/blogArticles';
import BlogCard from '@/components/blog/BlogCard';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { BlogPost } from '@/types/blog';
import { motion } from 'framer-motion';

const tags = [
  "All Blogs",
  "Market Insights",
  "Chemical Industry",
  "Sustainability",
  "Innovation",
  "Supply Chain",
  "Regulatory Updates"
];

export default function BlogsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All Blogs");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBlog, setSelectedBlog] = useState<[string, BlogPost] | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredBlogArticles = Object.entries(blogArticles)
    .slice(0, 9)
    .filter(([_, post]: [string, BlogPost]) => 
      (selectedTag === "All Blogs" || post.tags.includes(selectedTag)) &&
      (searchTerm === "" || 
       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  React.useEffect(() => {
    if (filteredBlogArticles.length > 0 && !selectedBlog) {
      setSelectedBlog(filteredBlogArticles[0]);
    }
  }, [filteredBlogArticles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/10 to-white">
      <div className="flex relative">
        <BlogSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredBlogArticles={filteredBlogArticles}
          selectedBlog={selectedBlog}
          setSelectedBlog={setSelectedBlog}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <div className={`flex-1 min-h-screen transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-0'}`}>
          {selectedBlog ? (
            <motion.div
              key={selectedBlog[0]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="py-6 pr-4 lg:pr-8 pl-0 mx-0"
            >
              <BlogCard id={selectedBlog[0]} post={selectedBlog[1]} detailed={true} />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-500">Select an article to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
