import React from 'react';
import { Search, ChevronRight, Tag, ChevronLeft } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredBlogArticles: [string, BlogPost][];
  selectedBlog: [string, BlogPost] | null;
  setSelectedBlog: (blog: [string, BlogPost] | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BlogSidebar({
  searchTerm,
  setSearchTerm,
  filteredBlogArticles,
  selectedBlog,
  setSelectedBlog,
  isOpen,
  setIsOpen,
}: BlogSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden my-8"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar with Collapse Button */}
      <div className={`
        fixed top-16 bottom-0 z-40 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out my-8
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
        w-[280px]
      `}>
        {/* Collapse Button - Desktop & Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex absolute -right-6 top-4 items-center justify-center 
            w-6 h-24 bg-purple-600 hover:bg-purple-700 
            border-y border-r border-purple-700
            rounded-r-lg shadow-md transition-colors duration-200"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronLeft 
            className={`h-4 w-4 text-white transition-transform duration-300 
              ${isOpen ? '' : 'rotate-180'}`} 
          />
        </button>

        {/* Main Sidebar Content */}
        <div className="flex flex-col h-full">
          <div className="p-4 lg:p-6 overflow-y-auto flex-grow mt-4">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Industry Insights</h1>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Blog List */}
            <div className="space-y-2">
              {filteredBlogArticles.map(([id, post]) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedBlog([id, post]);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 
                    ${selectedBlog?.[0] === id
                      ? 'bg-purple-50 border border-purple-200'
                      : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        {post.tags.slice(0, 1).map((tag, index) => (
                          <span key={index} className="flex items-center text-xs text-purple-600">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 mt-1 transition-transform duration-200
                      ${selectedBlog?.[0] === id ? 'text-purple-500 rotate-90' : 'text-gray-400'}`} 
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 