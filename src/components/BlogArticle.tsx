//src/components/BlogArticle.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, Share2, Twitter, Facebook, Linkedin, 
  Download, Bookmark, WhatsApp, Mail, Copy, Printer, Instagram,
  Pinterest, Heart, MessageCircle, ExternalLink
} from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

interface BlogArticleProps {
  id: string;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ id }) => {
  const [showActions, setShowActions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const articleData = blogArticles[parseInt(id) as keyof typeof blogArticles];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActions(true);
    }, 5000); // Show actions after 5 seconds

    return () => clearTimeout(timer);
  }, []);

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

  export default function BlogArticle(){
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/insights/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Blog
      </Link>

      {/* Action Buttons */}
      <AnimatePresence>
        {showActions && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
          >
            {/* Primary Actions */}
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`group p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110
                  ${isLiked ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-pink-50'}`}
                title="Like Article"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : 'group-hover:text-pink-500'}`} />
              </button>

              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`group p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110
                  ${isBookmarked ? 'bg-[rgb(106,27,154)] text-white' : 'bg-white text-gray-600 hover:bg-purple-50'}`}
                title="Bookmark Article"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'group-hover:text-[rgb(106,27,154)]'}`} />
              </button>

              <button 
                onClick={handleDownload}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[rgb(106,27,154)] hover:text-white transition-all duration-300 hover:scale-110"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>

              <button 
                onClick={handlePrint}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[rgb(106,27,154)] hover:text-white transition-all duration-300 hover:scale-110"
                title="Print Article"
              >
                <Printer className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="w-full h-px bg-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />

            {/* Share Options */}
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button 
                onClick={() => handleShare('twitter')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('facebook')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[#4267B2] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('linkedin')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('whatsapp')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share on WhatsApp"
              >
                <WhatsApp className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('pinterest')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[#E60023] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share on Pinterest"
              >
                <Pinterest className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('email')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-[rgb(106,27,154)] hover:text-white transition-all duration-300 hover:scale-110"
                title="Share via Email"
              >
                <Mail className="w-5 h-5" />
              </button>

              <button 
                onClick={() => handleShare('copy')}
                className="group p-3 rounded-full bg-white text-gray-600 shadow-lg 
                  hover:bg-gray-800 hover:text-white transition-all duration-300 hover:scale-110"
                title="Copy Link"
              >
                <Copy className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest of your article content */}
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

      {/* Rest of your existing JSX */}
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
}
