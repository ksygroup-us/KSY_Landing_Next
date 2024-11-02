 // types/report.ts
export interface Report {
    id: string | number;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    author: {
      id: string;
      name: string;
      role: string;
      image: string;
      department: string;
    };
    image: string;
    tags: string[];
    category: string;
    downloadUrl?: string;
    pdfSize?: string;
    readTime?: string;
    highlights?: string[];
    stats: {
      views: number;
      downloads: number;
      likes: number;
      shares: number;
    };
    metadata: {
      fileFormat: string;
      pageCount: number;
      lastUpdated: string;
      version: string;
      language: string;
      fileSize: string;
    };
    relatedReports?: string[];
    status: 'new' | 'updated' | 'featured' | 'trending';
    access: 'public' | 'premium' | 'restricted';
    preview?: {
      url: string;
      thumbnails: string[];
    };
    citations?: {
      apa: string;
      mla: string;
      chicago: string;
    };
  }
  