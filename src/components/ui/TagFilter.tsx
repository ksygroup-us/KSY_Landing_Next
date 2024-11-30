import React from 'react';
import { Search } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function TagFilter({
  tags,
  selectedTag,
  setSelectedTag,
  searchTerm,
  setSearchTerm
}: TagFilterProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-[rgb(106,27,154)] focus:ring-2 focus:ring-[rgb(106,27,154)] focus:ring-opacity-50 transition-all duration-300"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
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
  );
} 