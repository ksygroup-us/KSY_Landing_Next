'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';

const ArticlePage: React.FC = () => {
  const params = useParams();
  const articleId = Number(params.articleId);

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleContent articleId={articleId} />
    </div>
  );
};

export default ArticlePage;