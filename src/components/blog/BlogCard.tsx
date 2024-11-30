import React from 'react';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
  id: string;
  post: BlogPost;
  detailed?: boolean;
}

export default function BlogCard({ id, post, detailed = false }: BlogCardProps) {
  if (detailed) {
    return (
      <article className="w-full transition-all duration-300 ease-in-out pl-0 mx-0 my-2">
        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 mx-0">
          {post.title}
        </h1>

        {/* Tags - Limited to 3 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm font-medium"
            >
              <Tag className="w-4 h-4 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center mb-3 text-gray-500">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-[300px] lg:h-[400px] mb-4 w-full">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            priority
            style={{ objectFit: 'cover' }}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Content */}
        <div className="prose prose-purple max-w-none w-full">
          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            {post.excerpt}
          </p>
          {/* Add full content here when available */}
          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </article>
    );
  }

  return (
    <div className="mb-3">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {post.title}
      </h2>
      
      {/* Tags - Limited to 3 */}
      <div className="flex flex-wrap gap-2 mb-2">
        {post.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-purple-50 text-purple-800 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      <div className="relative h-40 mb-2">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="rounded-lg shadow-sm"
        />
      </div>
      <p className="text-gray-600 text-sm mb-2">
        {post.excerpt}
      </p>
      <span className="text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString()}
      </span>
    </div>
  );
} 