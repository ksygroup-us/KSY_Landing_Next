'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart,
  Bookmark,
  Download,
  Printer,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Copy
} from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

interface BlogArticleProps {
  id: string;
}

export default function BlogArticle({ id }: BlogArticleProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const articleData = blogArticles[parseInt(id) as keyof typeof blogArticles];

  const handleShare = async (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = articleData.title;

    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent('Check out this article: ' + shareUrl)}`;
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`);
        break;
    }
  };

  const handleDownload = () => {
    // Implement your download logic here
    alert('Downloading PDF...');
  };

  const handlePrint = () => {
    window.print();
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/insights/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Blog
      </Link>

      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-5 top-[20%] transform -translate-y-1/2 z-50 flex flex-col items-center gap-4">
          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="group p-3 rounded-full bg-[rgb(106,27,154)] text-white shadow-lg 
              hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl
              hover:shadow-purple-300/50 relative animate-bounce-subtle
              hover:rotate-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500"
              title="Like Article">
              <Heart className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 
                ${isLiked ? 'fill-current animate-like' : 'group-hover:text-white'}`} />
              {isLiked && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="group p-3 rounded-full bg-[rgb(106,27,154)] text-white shadow-lg 
              hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl
              hover:shadow-purple-300/50 relative animate-bounce-subtle
              hover:rotate-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500"
              title="Bookmark Article" >
              <Bookmark className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 
                ${isBookmarked ? 'fill-current' : 'group-hover:text-white'}`} />
            </button>

            <button 
              onClick={handleDownload}
              className="group p-3 rounded-full bg-[rgb(106,27,154)] text-white shadow-lg 
              hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl
              hover:shadow-purple-300/50 relative animate-bounce-subtle
              hover:rotate-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500"
              title="Download PDF">
              <Download className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
            </button>

            <button 
              onClick={handlePrint}
              className="group p-3 rounded-full bg-[rgb(106,27,154)] text-white shadow-lg 
              hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-xl
              hover:shadow-purple-300/50 relative animate-bounce-subtle
              hover:rotate-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500"
              title="Print Article">
              <Printer className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
            </button>
          </motion.div>

          <motion.div 
            className="w-full h-px bg-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}/>

          <motion.div 
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}>
            <button 
              onClick={() => handleShare('email')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-[rgb(106,27,154)] hover:text-white transition-all duration-300 
                hover:scale-110 hover:shadow-xl hover:shadow-purple-300/30 
                hover:-translate-y-1 hover:rotate-6
                relative before:content-[''] before:absolute before:inset-0 
                before:rounded-full before:bg-gradient-to-r before:from-purple-500 
                before:to-pink-500 before:opacity-0 before:transition-opacity 
                hover:before:opacity-10"
              title="Share via Email">
              <Mail className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Email
              </span>
            </button>

            <button 
              onClick={() => handleShare('linkedin')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-[#0077B5] hover:text-white transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 hover:rotate-6
                hover:shadow-xl hover:shadow-blue-300/30"
              title="Share on LinkedIn">
              <Linkedin className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                LinkedIn
              </span>
            </button>

            <button 
              onClick={() => handleShare('whatsapp')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-[#25D366] hover:text-white transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 hover:rotate-6
                hover:shadow-xl hover:shadow-green-300/30"
              title="Share on WhatsApp">
              <MessageCircle className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                WhatsApp
              </span>
            </button>

            <button 
              onClick={() => handleShare('twitter')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 hover:rotate-6
                hover:shadow-xl hover:shadow-blue-300/30"
              title="Share on Twitter">
              <Twitter className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Twitter
              </span>
            </button>

            <button 
              onClick={() => handleShare('facebook')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-[#4267B2] hover:text-white transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 hover:rotate-6
                hover:shadow-xl hover:shadow-blue-300/30"
              title="Share on Facebook">
              <Facebook className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Facebook
              </span>
            </button>

            <button 
              onClick={() => handleShare('copy')}
              className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                hover:bg-gray-800 hover:text-white transition-all duration-300 
                hover:scale-110 hover:-translate-y-1 hover:rotate-6
                hover:shadow-xl hover:shadow-gray-300/30"
              title="Copy Link">
              <Copy className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white 
                text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Copy Link
              </span>
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

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
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-pink-500' : ''}`} />
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current text-[rgb(106,27,154)]' : ''}`} />
          <Download className="w-5 h-5" />
          <Printer className="w-5 h-5" />
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
    </div>
  );
}