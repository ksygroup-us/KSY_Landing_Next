export interface BlogPost {
  title: string;
  image: string;
  excerpt: string;
  tags: string[];
  date: string;
  author: string;
}

export interface Report {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    role?: string;
    image?: string;
    department?: string;
  };
  image: string;
  tags: string[];
  category: string;
  downloadUrl?: string;
  readTime?: string;
  metadata?: {
    fileFormat: string;
    pageCount: number;
    lastUpdated: string;
    version: string;
    language: string;
    fileSize: string;
  };
  stats?: {
    views: number;
    downloads: number;
    shares: number;
  };
} 