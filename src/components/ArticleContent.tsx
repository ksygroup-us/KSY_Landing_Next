import React from 'react';
import Link from 'next/link';

interface IArticle {
  id: number;
  date: string;
  title: string;
  content: string;
}

const articles: IArticle[] = [
  {
    id: 1,
    date: "2023-07-01",
    title: "US Chemical Imports from South Asia on the Rise",
    content: "Full article content here..."
  },
  {
    id: 2,
    date: "2023-06-01",
    title: "Sustainable Practices in Chemical Distribution",
    content: "Full article content here..."
  },
  // Add more articles here
];

interface ArticleContentProps {
  articleId: number;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ articleId }) => {
  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 pr-8">
        <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
        <ul className="space-y-2">
          {articles.map((a) => (
            <li key={a.id}>
              <Link href={`/newsletter/${a.id}`} className={`hover:underline ${a.id === articleId ? 'font-bold' : ''}`}>
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-4">{article.date}</p>
        <div className="prose max-w-none">
          {article.content}
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;