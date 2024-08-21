import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface IArticle {
  id: number;
  date: string;
  title: string;
  preview: string;
  author: string;
  image: string;
}

const articles: IArticle[] = [
  {
    id: 1,
    date: "2023-07-01",
    title: "US Chemical Imports from South Asia on the Rise",
    preview: "In this issue, we explore the growing trend of US chemical imports from South Asian suppliers, with a focus on India and Bangladesh.",
    author: "Dr. Emily Chen",
    image: "/images/article-1.jpg"
  },
  {
    id: 2,
    date: "2023-06-01",
    title: "Sustainable Practices in Chemical Distribution",
    preview: "Discover how the chemical industry is adopting eco-friendly practices and the impact on global distribution networks.",
    author: "Michael Rodriguez",
    image: "/images/article-2.jpg"
  },
  {
    id: 3,
    date: "2023-05-15",
    title: "Emerging Technologies in Chemical Manufacturing",
    preview: "An in-depth look at cutting-edge technologies reshaping the landscape of chemical production and processing.",
    author: "Sarah Thompson",
    image: "/images/article-3.jpg"
  },
];

const ArticleList: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Latest Articles</h2>
      <div className="space-y-8">
        {articles.map((article) => (
          <div key={article.id} className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/3">
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body lg:w-2/3">
              <h3 className="card-title text-xl font-bold">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-2">By {article.author} | {article.date}</p>
              <p className="mb-4">{article.preview}</p>
              <div className="card-actions justify-end">
                <Link href={`/newsletter/${article.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;