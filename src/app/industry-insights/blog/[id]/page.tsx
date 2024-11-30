import React from 'react';
import BlogArticle from '@/components/BlogArticle';

export default function BlogPost({ params }: { params: { id: string } }) {
  return <BlogArticle id={params.id} />;
}
