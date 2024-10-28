//src/app/insights/report/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Search, Calendar, User, Clock, Mail, Share2, FileSearch,
  BookOpen, Bookmark, Eye, ThumbsUp, Printer, ExternalLink, AlertCircle, Tag, TrendingUp, File, Save, FileDown, Star, Info, Copy, ArrowUpRight
} from 'lucide-react'; // ... existing imports ...

// Enhanced Report Interface
interface Report {
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

// Sample enhanced report data (add this to your reportArticles)
const sampleEnhancedReport = {
  id: 1,
  title: "Chemical Industry Market Analysis 2024",
  excerpt: "Comprehensive analysis of global chemical industry trends...",
  date: "2024-01-15",
  author: {
    id: "auth-001",
    name: "Dr. Sarah Chen",
    role: "Lead Market Analyst",
    image: "/api/placeholder/40/40",
    department: "Market Research"
  },
  image: "/api/placeholder/600/400",
  tags: ["Market Analysis", "Industry Trends", "Global Markets"],
  category: "Market Research",
  downloadUrl: "/reports/chemical-industry-analysis-2024.pdf",
  readTime: "15 min read",
  stats: {
    views: 1234,
    downloads: 567,
    likes: 89,
    shares: 45
  },
  metadata: {
    fileFormat: "PDF",
    pageCount: 45,
    lastUpdated: "2024-02-15",
    version: "2.1",
    language: "English",
    fileSize: "4.2 MB"
  },
  status: "trending",
  access: "public",
  citations: {
    apa: "Chen, S. (2024). Chemical Industry Market Analysis 2024...",
    mla: "Chen, S. (2024). Chemical Industry Market Analysis 2024...",
    chicago: "Chen, S. (2024). Chemical Industry Market Analysis 2024..."
  }
};

// Report tags with categories
const reportCategories = {
  "Market Research": ["Industry Analysis", "Market Trends", "Competitive Landscape", "Growth Opportunities"],
  "Technical": ["Research & Development", "Process Innovation", "Quality Control", "Production Methods"],
  "Environmental": ["Sustainability", "Green Chemistry", "Environmental Impact", "Waste Management"],
  "Regulatory": ["Compliance", "Safety Standards", "Trade Regulations", "Policy Updates"],
  "Strategy": ["Business Development", "Strategic Planning", "Risk Assessment", "Investment Analysis"]
};

// Create a flat array of all tags including categories
const allTags = ["All Reports", ...Object.keys(reportCategories), 
  ...Object.values(reportCategories).flat()];

// Sample reports data (keeping your existing reports)
const reportArticles: Record<string, Report> = {
  'report-1': {
    id: "market-analysis-2024",
    title: "Chemical Industry Market Analysis 2024-2025: Post-Pandemic Recovery & Regional Growth Patterns",
    excerpt: "Comprehensive analysis of the $4.7 trillion global chemical industry, including detailed regional forecasts, supply chain resilience strategies, and emerging market opportunities in specialty chemicals. Features insights from 200+ industry leaders and econometric modeling of key growth sectors.",
    date: "2024-01-15",
    author: {
      id: "auth-001",
      name: "Dr. Sarah Chen, Ph.D.",
      role: "Principal Market Analyst",
      image: "/api/placeholder/40/40",
      department: "Market Research",
      credentials: ["Ph.D. Chemical Engineering, MIT", "MBA, INSEAD"],
      expertise: ["Market Analysis", "Strategic Planning", "Asian Markets"],
      publications: 34
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Market Analysis",
      "Industry Trends",
      "Global Markets",
      "Supply Chain",
      "Specialty Chemicals",
      "Regional Analysis"
    ],
    category: "Market Research",
    downloadUrl: "/reports/chemical-industry-analysis-2024-2025.pdf",
    readTime: "2.5 hours",
    highlights: [
      "Analysis of 17 key chemical segments across 6 regions",
      "5-year growth projections with quarterly milestones",
      "Impact assessment of new environmental regulations",
      "Specialty chemicals market opportunity analysis",
      "Competitive landscape analysis of top 50 global players"
    ],
    stats: {
      views: 23567,
      downloads: 4892,
      likes: 1245,
      shares: 892,
      citations: 127,
      comments: 234
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 267,
      lastUpdated: "2024-02-15",
      version: "3.2",
      language: "English",
      fileSize: "24.7 MB",
      tables: 45,
      figures: 68,
      references: 189
    },
    status: "trending",
    access: "premium",
    pricing: {
      standard: 4999,
      enterprise: 12999,
      academic: 1499
    }
  },
  'report-2': {
    id: "green-chemistry-2024",
    title: "Sustainable Chemical Manufacturing 2024: ESG Implementation & Carbon Reduction Strategies",
    excerpt: "In-depth analysis of sustainable practices in chemical manufacturing, featuring case studies from 75 leading companies achieving significant emissions reductions. Includes detailed ROI analysis of green technologies and regulatory compliance roadmaps.",
    date: "2024-02-01",
    author: {
      id: "auth-002",
      name: "Dr. John Smith",
      role: "Head of Sustainability Research",
      image: "/api/placeholder/40/40",
      department: "Environmental",
      credentials: [
        "Ph.D. Environmental Engineering, Stanford",
        "Certified Sustainability Professional"
      ],
      expertise: ["Green Chemistry", "Carbon Reduction", "ESG Integration"],
      publications: 28
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Sustainability",
      "ESG",
      "Green Chemistry",
      "Carbon Reduction",
      "Clean Technology"
    ],
    category: "Environmental",
    downloadUrl: "/reports/sustainability-report-2024.pdf",
    readTime: "3 hours",
    highlights: [
      "Analysis of 75 successful sustainability implementations",
      "Carbon reduction strategies with cost-benefit analysis",
      "ESG compliance frameworks and metrics",
      "Green technology ROI case studies",
      "Regulatory compliance roadmap 2024-2030"
    ],
    stats: {
      views: 18934,
      downloads: 3567,
      likes: 892,
      shares: 445,
      citations: 89,
      comments: 156
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 312,
      lastUpdated: "2024-02-10",
      version: "2.3",
      language: "English",
      fileSize: "28.5 MB",
      tables: 52,
      figures: 87,
      references: 234
    },
    status: "featured",
    access: "premium",
    methodology: {
      researchPeriod: "2023-Q2 to 2024-Q1",
      companiesAnalyzed: 75,
      expertInterviews: 45,
      casestudies: 12,
      dataPoints: "50,000+"
    }
  },
  'report-3': {
    id: "tech-innovation-2024",
    title: "Digital Transformation in Chemical Processing: AI, IoT & Industry 4.0 Implementation Guide",
    excerpt: "Comprehensive analysis of emerging technologies in chemical processing, featuring practical implementation guides, ROI analysis, and real-world case studies from early adopters. Includes detailed technical specifications and integration frameworks.",
    date: "2024-02-15",
    author: {
      id: "auth-003",
      name: "Dr. Emily Johnson",
      role: "Director of Technology Research",
      image: "/api/placeholder/40/40",
      department: "Technology",
      credentials: [
        "Ph.D. Process Engineering, UC Berkeley",
        "MS Computer Science, Georgia Tech"
      ],
      expertise: ["AI/ML", "Process Optimization", "Industry 4.0"],
      patents: 5,
      publications: 41
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Digital Transformation",
      "Industry 4.0",
      "AI/ML",
      "IoT",
      "Process Optimization"
    ],
    category: "Technology",
    downloadUrl: "/reports/emerging-tech-2024.pdf",
    readTime: "4 hours",
    highlights: [
      "Comprehensive AI/ML implementation frameworks",
      "IoT integration strategies for chemical plants",
      "Real-time process optimization case studies",
      "Cost-benefit analysis of digital transformations",
      "Security and data governance frameworks"
    ],
    stats: {
      views: 15678,
      downloads: 2893,
      likes: 678,
      shares: 445,
      citations: 156,
      comments: 234
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 423,
      lastUpdated: "2024-02-20",
      version: "2.1",
      language: "English",
      fileSize: "35.8 MB",
      tables: 67,
      figures: 92,
      references: 278,
      technicalDiagrams: 45
    },
    status: "trending",
    access: "enterprise",
    pricing: {
      standard: 5999,
      enterprise: 14999,
      academic: 1999
    }
  },
    'report-4': {
      id: "regulatory-compliance-2024",
      title: "Global Chemical Regulatory Compliance Guide 2024: REACH, TSCA & International Standards",
      excerpt: "Authoritative guide to chemical industry regulations across major markets, featuring compliance frameworks, registration procedures, and risk mitigation strategies. Includes detailed analysis of recent regulatory changes and their impact on global trade.",
      date: "2024-03-01",
      author: {
        id: "auth-004",
        name: "Dr. Michael Brown, J.D.",
        role: "Chief Regulatory Affairs Officer",
        image: "/api/placeholder/40/40",
        department: "Regulatory",
        credentials: [
          "Ph.D. Chemistry, Harvard University",
          "J.D. Environmental Law, Yale",
          "Certified Regulatory Affairs Professional"
        ],
        expertise: ["Chemical Regulation", "International Trade", "Risk Assessment"],
        publications: 23,
        committees: ["EPA Advisory Board", "REACH Expert Panel"]
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Regulatory Compliance",
        "REACH",
        "TSCA",
        "Risk Assessment",
        "International Trade"
      ],
      category: "Regulatory",
      downloadUrl: "/reports/regulatory-guide-2024.pdf",
      readTime: "5 hours",
      highlights: [
        "Complete REACH 2024 compliance framework",
        "TSCA registration procedures and updates",
        "Comparative analysis of global regulations",
        "Risk assessment methodologies",
        "Cost of compliance analysis across regions"
      ],
      stats: {
        views: 25678,
        downloads: 6234,
        likes: 1567,
        shares: 892,
        citations: 234,
        comments: 345
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 478,
        lastUpdated: "2024-03-05",
        version: "4.1",
        language: "English",
        fileSize: "42.5 MB",
        tables: 78,
        figures: 56,
        references: 312,
        legalCitations: 145
      },
      status: "featured",
      access: "enterprise",
      pricing: {
        standard: 6999,
        enterprise: 15999,
        academic: 2499
      }
    },
    'report-5': {
      id: "specialty-chemicals-2024",
      title: "Specialty Chemicals Market Analysis 2024-2030: High-Growth Segments & Regional Opportunities",
      excerpt: "Strategic analysis of the $800+ billion specialty chemicals market, featuring segment-wise growth projections, competitive landscape analysis, and emerging application opportunities. Includes detailed porter's five forces analysis for key segments.",
      date: "2024-03-10",
      author: {
        id: "auth-005",
        name: "Dr. Olivia Wilson",
        role: "Principal Market Analyst",
        image: "/api/placeholder/40/40",
        department: "Market Research",
        credentials: [
          "Ph.D. Industrial Chemistry, ETH Zurich",
          "MBA, London Business School"
        ],
        expertise: ["Specialty Chemicals", "Market Analysis", "Product Strategy"],
        publications: 31,
        industryExperience: 15
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Specialty Chemicals",
        "Market Analysis",
        "Growth Opportunities",
        "Product Strategy"
      ],
      category: "Market Research",
      downloadUrl: "/reports/specialty-chemicals-2024.pdf",
      readTime: "3.5 hours",
      highlights: [
        "Analysis of 25 high-growth segments",
        "Regional market opportunity assessment",
        "Competitive landscape analysis",
        "Technology adoption trends",
        "End-user industry demand analysis"
      ],
      stats: {
        views: 19567,
        downloads: 4123,
        likes: 934,
        shares: 567,
        citations: 178,
        comments: 245
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 356,
        lastUpdated: "2024-03-15",
        version: "2.3",
        language: "English",
        fileSize: "31.2 MB",
        tables: 62,
        figures: 84,
        references: 245
      },
      status: "trending",
      access: "premium"
    },
    'report-6': {
      id: "green-chemistry-innovation",
      title: "Innovations in Green Chemistry 2024: Sustainable Solutions & Circular Economy",
      excerpt: "Comprehensive analysis of breakthrough innovations in green chemistry, featuring novel synthesis routes, bio-based alternatives, and circular economy implementations. Includes technology readiness assessments and commercialization roadmaps.",
      date: "2024-03-20",
      author: {
        id: "auth-006",
        name: "Dr. David Lee",
        role: "Head of Green Chemistry Research",
        image: "/api/placeholder/40/40",
        department: "Environmental",
        credentials: [
          "Ph.D. Green Chemistry, Yale University",
          "Green Chemistry Design Award Winner"
        ],
        expertise: ["Sustainable Synthesis", "Circular Economy", "Bio-based Materials"],
        publications: 45,
        patents: 8
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Green Chemistry",
        "Sustainability",
        "Circular Economy",
        "Bio-based Materials"
      ],
      category: "Environmental",
      downloadUrl: "/reports/green-chemistry-innovation-2024.pdf",
      readTime: "4 hours",
      highlights: [
        "50+ innovative green chemistry solutions",
        "Circular economy implementation cases",
        "Bio-based materials development",
        "Commercial viability assessment",
        "Patent landscape analysis"
      ],
      stats: {
        views: 16789,
        downloads: 3567,
        likes: 878,
        shares: 445,
        citations: 189,
        comments: 167
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 389,
        lastUpdated: "2024-03-25",
        version: "2.2",
        language: "English",
        fileSize: "33.5 MB",
        tables: 58,
        figures: 92,
        references: 267,
        patentCitations: 145
      },
      status: "featured",
      access: "premium"
    },
    'report-7': {
      id: "advanced-materials-2024",
      title: "Advanced Materials & Nanotechnology in Chemical Industry 2024-2030",
      excerpt: "Strategic analysis of advanced materials market opportunities, featuring emerging applications in nanomaterials, smart polymers, and composites. Includes technical feasibility studies, commercialization pathways, and patent analysis of 1,200+ innovations.",
      date: "2024-04-01",
      author: {
        id: "auth-007",
        name: "Dr. Elena Rodriguez",
        role: "Principal Materials Scientist",
        image: "/api/placeholder/40/40",
        department: "Advanced Materials",
        credentials: [
          "Ph.D. Materials Science, University of Cambridge",
          "MSc Nanotechnology, Imperial College London"
        ],
        expertise: ["Nanomaterials", "Smart Polymers", "Material Characterization"],
        publications: 52,
        patents: 11,
        researchGrants: "$8.5M+"
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Advanced Materials",
        "Nanotechnology",
        "Smart Polymers",
        "Composites"
      ],
      category: "R&D",
      downloadUrl: "/reports/advanced-materials-2024.pdf",
      readTime: "4.5 hours",
      highlights: [
        "Analysis of 200+ emerging materials",
        "Patent landscape analysis",
        "Application-specific market sizing",
        "Technical feasibility studies",
        "Commercialization roadmaps"
      ],
      stats: {
        views: 17845,
        downloads: 3892,
        likes: 945,
        shares: 534,
        citations: 223,
        comments: 178
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 412,
        lastUpdated: "2024-04-05",
        version: "2.4",
        language: "English",
        fileSize: "38.7 MB",
        tables: 73,
        figures: 98,
        references: 289,
        patentCitations: 167
      },
      status: "trending",
      access: "enterprise",
      pricing: {
        standard: 5499,
        enterprise: 13999,
        academic: 1899
      }
    },
    'report-8': {
      id: "supply-chain-optimization",
      title: "Chemical Industry Supply Chain Optimization 2024: Digital Integration & Resilience",
      excerpt: "Comprehensive guide to modern chemical supply chain management, featuring digital twin implementations, blockchain integration, and resilience strategies. Includes 25 detailed case studies from leading chemical companies.",
      date: "2024-04-15",
      author: {
        id: "auth-008",
        name: "Dr. Marcus Chen",
        role: "Global Supply Chain Director",
        image: "/api/placeholder/40/40",
        department: "Supply Chain",
        credentials: [
          "Ph.D. Operations Research, Georgia Tech",
          "Six Sigma Black Belt",
          "CSCP Certified"
        ],
        expertise: ["Supply Chain Optimization", "Digital Integration", "Risk Management"],
        implementations: 15,
        industryAwards: 3
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Supply Chain",
        "Digital Integration",
        "Risk Management",
        "Blockchain"
      ],
      category: "Operations",
      downloadUrl: "/reports/supply-chain-optimization-2024.pdf",
      readTime: "3.5 hours",
      highlights: [
        "Digital twin implementation frameworks",
        "Blockchain integration strategies",
        "Risk mitigation methodologies",
        "Real-time optimization tools",
        "Cost reduction case studies"
      ],
      stats: {
        views: 16234,
        downloads: 3567,
        likes: 856,
        shares: 478,
        citations: 167,
        comments: 198
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 345,
        lastUpdated: "2024-04-20",
        version: "2.1",
        language: "English",
        fileSize: "29.5 MB",
        tables: 56,
        figures: 82,
        references: 234,
        caseStudies: 25
      },
      status: "featured",
      access: "premium"
    },
    'report-9': {
      id: "plant-safety-2024",
      title: "Chemical Plant Safety & Risk Management 2024: Best Practices & Digital Solutions",
      excerpt: "Essential guide to chemical plant safety featuring AI-powered risk prediction, IoT safety monitoring systems, and emergency response protocols. Includes analysis of 150 incident case studies and preventive strategies.",
      date: "2024-04-20",
      author: {
        id: "auth-009",
        name: "Dr. Robert Williams",
        role: "Head of Process Safety",
        image: "/api/placeholder/40/40",
        department: "Safety",
        credentials: [
          "Ph.D. Process Safety, Texas A&M",
          "CSP Certified",
          "NEBOSH International Diploma"
        ],
        expertise: ["Process Safety", "Risk Assessment", "Emergency Response"],
        investigations: 75,
        safetyPrograms: 30
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Plant Safety",
        "Risk Management",
        "Emergency Response",
        "Digital Safety"
      ],
      category: "Safety",
      downloadUrl: "/reports/plant-safety-2024.pdf",
      readTime: "5 hours",
      highlights: [
        "AI-based risk prediction models",
        "IoT safety monitoring systems",
        "Emergency response protocols",
        "Incident investigation methodologies",
        "Safety culture development"
      ],
      stats: {
        views: 22456,
        downloads: 5678,
        likes: 1234,
        shares: 789,
        citations: 234,
        comments: 345
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 467,
        lastUpdated: "2024-04-25",
        version: "3.2",
        language: "English",
        fileSize: "41.2 MB",
        tables: 85,
        figures: 112,
        references: 278,
        caseStudies: 150
      },
      status: "trending",
      access: "enterprise"
    },
    'report-10': {
      id: "pharma-chemicals-2024",
      title: "Pharmaceutical Chemicals Market Analysis 2024-2030: Innovation & Growth Opportunities",
      excerpt: "Strategic analysis of the $180+ billion pharmaceutical chemicals market, featuring segment-wise projections, regulatory compliance frameworks, and emerging therapy areas. Includes analysis of 300+ APIs and intermediates.",
      date: "2024-05-01",
      author: {
        id: "auth-010",
        name: "Dr. Sarah Anderson",
        role: "Pharmaceutical Industry Analyst",
        image: "/api/placeholder/40/40",
        department: "Market Research",
        credentials: [
          "Ph.D. Medicinal Chemistry, Stanford",
          "MBA, INSEAD",
          "RAC-Global Certified"
        ],
        expertise: ["Pharma Markets", "Drug Development", "Regulatory Strategy"],
        publications: 38,
        marketReports: 45
      },
      image: "/api/placeholder/600/400",
      tags: [
        "Pharmaceutical",
        "APIs",
        "Drug Development",
        "Market Analysis"
      ],
      category: "Market Research",
      downloadUrl: "/reports/pharma-chemicals-2024.pdf",
      readTime: "4.5 hours",
      highlights: [
        "Analysis of 300+ APIs & intermediates",
        "Regulatory compliance frameworks",
        "Emerging therapy areas analysis",
        "Cost optimization strategies",
        "Supply chain security measures"
      ],
      stats: {
        views: 19876,
        downloads: 4567,
        likes: 1123,
        shares: 678,
        citations: 245,
        comments: 189
      },
      metadata: {
        fileFormat: "PDF",
        pageCount: 434,
        lastUpdated: "2024-05-05",
        version: "2.3",
        language: "English",
        fileSize: "37.8 MB",
        tables: 78,
        figures: 95,
        references: 267,
        marketModels: 45
      },
      status: "featured",
      access: "premium"
    },
  'report-11': {
    id: "battery-materials-2024",
    title: "Battery Materials Market 2024-2030: Next-Generation Chemistry & Manufacturing Innovation",
    excerpt: "Strategic analysis of the $45B+ battery materials market, featuring detailed assessments of advanced cathode/anode materials, solid-state electrolytes, and manufacturing innovations. Includes technical evaluations of emerging battery chemistries and supply chain analysis.",
    date: "2024-05-10",
    author: {
      id: "auth-011",
      name: "Dr. James Park",
      role: "Senior Battery Technology Analyst",
      image: "/api/placeholder/40/40",
      department: "Energy Materials",
      credentials: [
        "Ph.D. Materials Science, MIT",
        "MS Electrochemistry, Seoul National University"
      ],
      expertise: ["Battery Materials", "Energy Storage", "Manufacturing Processes"],
      publications: 43,
      patents: 7,
      industryCollaborations: 12
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Battery Materials",
      "Energy Storage",
      "Manufacturing",
      "Supply Chain"
    ],
    category: "Energy",
    downloadUrl: "/reports/battery-materials-2024.pdf",
    readTime: "4 hours",
    highlights: [
      "Analysis of next-gen battery chemistries",
      "Manufacturing cost optimization",
      "Supply chain resilience strategies",
      "Performance benchmarking studies",
      "Sustainability assessments"
    ],
    stats: {
      views: 18934,
      downloads: 4123,
      likes: 967,
      shares: 534,
      citations: 189,
      comments: 156
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 389,
      lastUpdated: "2024-05-15",
      version: "2.4",
      language: "English",
      fileSize: "35.6 MB",
      tables: 64,
      figures: 92,
      references: 245,
      technicalDiagrams: 38
    },
    status: "trending",
    access: "enterprise",
    pricing: {
      standard: 5999,
      enterprise: 14999,
      academic: 1999
    }
  },
  'report-12': {
    id: "water-treatment-2024",
    title: "Industrial Water Treatment Chemicals 2024: Innovation in Sustainability & Efficiency",
    excerpt: "Comprehensive analysis of the $35B water treatment chemicals market, featuring emerging treatment technologies, regulatory compliance strategies, and sustainability initiatives. Includes case studies from 50 major industrial installations.",
    date: "2024-05-15",
    author: {
      id: "auth-012",
      name: "Dr. Lisa Martinez",
      role: "Water Technology Specialist",
      image: "/api/placeholder/40/40",
      department: "Environmental Solutions",
      credentials: [
        "Ph.D. Environmental Engineering, UC Berkeley",
        "Professional Environmental Engineer",
        "Water Treatment Specialist Certification"
      ],
      expertise: ["Water Treatment", "Process Optimization", "Environmental Compliance"],
      implementations: 25,
      publications: 31
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Water Treatment",
      "Sustainability",
      "Process Optimization",
      "Environmental"
    ],
    category: "Environmental",
    downloadUrl: "/reports/water-treatment-2024.pdf",
    readTime: "3.5 hours",
    highlights: [
      "Advanced treatment technology analysis",
      "Regulatory compliance frameworks",
      "Sustainability metrics & benchmarks",
      "Cost optimization strategies",
      "Implementation case studies"
    ],
    stats: {
      views: 15678,
      downloads: 3456,
      likes: 789,
      shares: 445,
      citations: 167,
      comments: 198
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 356,
      lastUpdated: "2024-05-20",
      version: "2.2",
      language: "English",
      fileSize: "31.2 MB",
      tables: 58,
      figures: 75,
      references: 223,
      caseStudies: 50
    },
    status: "featured",
    access: "premium"
  },
  'report-13': {
    id: "electronic-chemicals-2024",
    title: "Electronic Chemicals & Semiconductor Materials 2024-2030: Next-Gen Manufacturing & Supply Chain Security",
    excerpt: "Strategic analysis of the $65B electronic chemicals market, featuring ultra-high purity materials, advanced manufacturing processes, and supply chain security measures. Includes detailed analysis of emerging semiconductor technologies.",
    date: "2024-06-01",
    author: {
      id: "auth-013",
      name: "Dr. Kevin Zhang",
      role: "Principal Semiconductor Analyst",
      image: "/api/placeholder/40/40",
      department: "Electronic Materials",
      credentials: [
        "Ph.D. Chemical Engineering, Stanford",
        "MS Semiconductor Physics, Tsinghua University"
      ],
      expertise: ["Semiconductor Materials", "High-Purity Chemistry", "Process Integration"],
      publications: 47,
      patents: 9,
      industryAwards: 3
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Electronic Chemicals",
      "Semiconductors",
      "High-Purity Materials",
      "Manufacturing"
    ],
    category: "Electronics",
    downloadUrl: "/reports/electronic-chemicals-2024.pdf",
    readTime: "4.5 hours",
    highlights: [
      "Ultra-high purity material analysis",
      "Advanced process technologies",
      "Supply chain security strategies",
      "Contamination control methods",
      "Cost optimization frameworks"
    ],
    stats: {
      views: 17845,
      downloads: 3987,
      likes: 876,
      shares: 534,
      citations: 198,
      comments: 167
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 412,
      lastUpdated: "2024-06-05",
      version: "2.3",
      language: "English",
      fileSize: "36.8 MB",
      tables: 67,
      figures: 89,
      references: 256,
      technicalDiagrams: 45
    },
    status: "trending",
    access: "enterprise"
  },
  'report-14': {
    id: "agrochem-2024",
    title: "Agricultural Chemicals & Food Security 2024: Sustainable Solutions & Market Dynamics",
    excerpt: "Comprehensive analysis of the $250B agricultural chemicals market, featuring sustainable crop protection solutions, precision agriculture technologies, and food security strategies. Includes regional market analysis and regulatory frameworks.",
    date: "2024-06-10",
    author: {
      id: "auth-014",
      name: "Dr. Thomas Anderson",
      role: "Head of Agrochemical Research",
      image: "/api/placeholder/40/40",
      department: "Agricultural Solutions",
      credentials: [
        "Ph.D. Agricultural Chemistry, Wageningen University",
        "MS Crop Science, Cornell University"
      ],
      expertise: ["Crop Protection", "Sustainable Agriculture", "Food Security"],
      publications: 35,
      fieldTrials: 200,
      patents: 5
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Agricultural Chemicals",
      "Food Security",
      "Sustainability",
      "Crop Protection"
    ],
    category: "Agriculture",
    downloadUrl: "/reports/agricultural-chemicals-2024.pdf",
    readTime: "4 hours",
    highlights: [
      "Sustainable agriculture solutions",
      "Precision farming technologies",
      "Regional market analysis",
      "Regulatory compliance frameworks",
      "Environmental impact assessments"
    ],
    stats: {
      views: 16789,
      downloads: 3678,
      likes: 845,
      shares: 467,
      citations: 178,
      comments: 156
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 378,
      lastUpdated: "2024-06-15",
      version: "2.2",
      language: "English",
      fileSize: "33.5 MB",
      tables: 62,
      figures: 85,
      references: 234,
      caseStudies: 40
    },
    status: "featured",
    access: "premium"
  },
  'report-15': {
    id: "ma-chemicals-2024",
    title: "Chemical Industry M&A Landscape 2024: Strategic Analysis & Deal-Making Trends",
    excerpt: "Strategic analysis of global chemical industry M&A activities, featuring deal valuations, integration strategies, and market consolidation trends. Includes detailed analysis of 100+ major transactions and future outlook.",
    date: "2024-06-15",
    author: {
      id: "auth-015",
      name: "Dr. Michael Thompson",
      role: "Chief Industry Strategist",
      image: "/api/placeholder/40/40",
      department: "Strategic Research",
      credentials: [
        "Ph.D. Economics, London School of Economics",
        "MBA, Harvard Business School",
        "CFA Charterholder"
      ],
      expertise: ["M&A Strategy", "Industry Consolidation", "Value Creation"],
      transactions: "$50B+",
      publications: 28
    },
    image: "/api/placeholder/600/400",
    tags: [
      "Mergers & Acquisitions",
      "Industry Strategy",
      "Deal Analysis",
      "Market Consolidation"
    ],
    category: "Strategy",
    downloadUrl: "/reports/chemical-ma-2024.pdf",
    readTime: "3.5 hours",
    highlights: [
      "Global M&A trend analysis",
      "Deal valuation frameworks",
      "Integration strategy assessment",
      "Synergy realization cases",
      "Regional market dynamics"
    ],
    stats: {
      views: 15678,
      downloads: 3456,
      likes: 767,
      shares: 423,
      citations: 156,
      comments: 189
    },
    metadata: {
      fileFormat: "PDF",
      pageCount: 345,
      lastUpdated: "2024-06-20",
      version: "2.1",
      language: "English",
      fileSize: "29.8 MB",
      tables: 54,
      figures: 78,
      references: 212,
      dealAnalyses: 100
    },
    status: "new",
    access: "enterprise",
    pricing: {
      standard: 4999,
      enterprise: 12999,
      academic: 1499
    }
  }
};

export default function ReportsPage() {
  const [selectedTag, setSelectedTag] = useState("All Reports");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Add these state variables to your component
  const [bookmarkedReports, setBookmarkedReports] = useState<Set<string | number>>(new Set());
  const [likedReports, setLikedReports] = useState<Set<string | number>>(new Set());
  const [savedReports, setSavedReports] = useState<Set<string | number>>(new Set());
  const [starredReports, setStarredReports] = useState<Set<string | number>>(new Set());
  const [showMetadata, setShowMetadata] = useState<string | number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredReports = Object.values(reportArticles).filter(report => {
    const matchesTag = selectedTag === "All Reports" || 
                      report.tags.includes(selectedTag) || 
                      report.category === selectedTag;
    const matchesSearch = !searchTerm || 
                         report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleShare = async (report: Report) => {
    const shareData = {
      title: report.title,
      text: report.excerpt,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // You might want to add a toast notification here
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleEmail = (report: Report) => {
    const subject = encodeURIComponent(report.title);
    const body = encodeURIComponent(`Check out this report: ${report.title}\n\n${report.excerpt}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Add these handlers to your component
  const handleBookmark = (report: Report) => {
    setBookmarkedReports(prev => {
      const newBookmarks = new Set(prev);
      newBookmarks.has(report.id) ? newBookmarks.delete(report.id) : newBookmarks.add(report.id);
      return newBookmarks;
    });
  };

  const handleLike = (report: Report) => {
    setLikedReports(prev => {
      const newLikes = new Set(prev);
      newLikes.has(report.id) ? newLikes.delete(report.id) : newLikes.add(report.id);
      return newLikes;
    });
  };

  const handleSave = (report: Report) => {
    setSavedReports(prev => {
      const newSaved = new Set(prev);
      newSaved.has(report.id) ? newSaved.delete(report.id) : newSaved.add(report.id);
      return newSaved;
    });
  };

  const handleStar = (report: Report) => {
    setStarredReports(prev => {
      const newStarred = new Set(prev);
      newStarred.has(report.id) ? newStarred.delete(report.id) : newStarred.add(report.id);
      return newStarred;
    });
  };

  const handleCitationCopy = (report: Report, format: 'apa' | 'mla' | 'chicago') => {
    navigator.clipboard.writeText(report.citations?.[format] || '');
    alert(`${format.toUpperCase()} citation copied to clipboard!`);
  };

  const handlePrint = (report: Report) => {
    window.print();
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Main spinner */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[rgb(106,27,154)]"></div>
        
        {/* Secondary spinner */}
        <div className="absolute top-0 left-0 animate-spin rounded-full h-32 w-32 border-r-4 border-l-4 border-purple-300 animate-[spin_3s_linear_infinite]"></div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-[rgb(106,27,154)] animate-pulse flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-[rgb(106,27,154)] text-lg font-semibold mb-2">Loading</p>
          <div className="flex items-center gap-1">
            {[0, 150, 300].map((delay) => (
              <div key={delay} className="w-2 h-2 rounded-full bg-[rgb(106,27,154)] animate-bounce" style={{ animationDelay: `${delay}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-[rgb(106,27,154)] text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-4 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Industry Reports & Insights
          </motion.h1>
          <motion.p 
            className="text-xl text-center max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dive into a treasure trove of insights and analyses that illuminate the dynamic landscape of the chemical industry, 
            revealing groundbreaking trends and untapped market opportunities.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-[rgb(106,27,154)] focus:ring-2 focus:ring-[rgb(106,27,154)] focus:ring-opacity-50 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
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

        {/* Reports Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={report.image}
                  alt={report.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
              </div>

              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-[rgb(106,27,154)] rounded-full text-xs font-semibold">
                    {report.category}
                  </span>
                  {report.readTime && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.readTime}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[rgb(106,27,154)] transition-colors duration-300">
                  {report.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {report.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{report.author.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(report.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Primary Actions */}
                  <div className="flex gap-2 items-center">
                    <Link href={`/insights/report/${report.id}`} className="flex-1">
                      <button className="w-full px-3 py-2 bg-[rgb(106,27,154)] text-white rounded-full text-sm font-medium hover:bg-[rgb(86,7,134)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        <FileText className="h-4 w-4" />
                        Read Report {/* Button to navigate to the report detail page */}
                      </button>
                    </Link>
                    
                    <div className="flex gap-1">
                      {/* Quick Actions */}
                      <button 
                        onClick={() => handleBookmark(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          bookmarkedReports.has(report.id) 
                            ? 'text-yellow-500 bg-yellow-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Bookmark Report"
                      >
                        <Bookmark className="h-5 w-5" />
                        {/* Button to bookmark the report */}
                      </button>

                      <button 
                        onClick={() => handleSave(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          savedReports.has(report.id) 
                            ? 'text-blue-500 bg-blue-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Save for Later"
                      >
                        <Save className="h-5 w-5" />
                        {/* Button to save the report for later */}
                      </button>

                      <button 
                        onClick={() => handleStar(report)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          starredReports.has(report.id) 
                            ? 'text-orange-500 bg-orange-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Star Report"
                      >
                        <Star className="h-5 w-5" />
                        {/* Button to star the report */}
                      </button>
                    </div>
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex flex-wrap gap-2 justify-between">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEmail(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Email Report"
                      >
                        <Mail className="h-5 w-5" />
                        {/* Button to email the report */}
                      </button>
                      
                      <button 
                        onClick={() => handleShare(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Share Report"
                      >
                        <Share2 className="h-5 w-5" />
                        {/* Button to share the report */}
                      </button>

                      <button 
                        onClick={() => handlePrint(report)}
                        className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                        title="Print Report"
                      >
                        <Printer className="h-5 w-5" />
                        {/* Button to print the report */}
                      </button>

                      {report.downloadUrl && (
                        <button 
                          onClick={() => window.open(report.downloadUrl, '_blank')}
                          className="p-2 text-[rgb(106,27,154)] hover:bg-purple-50 rounded-full transition-all duration-300 tooltip"
                          title="Download PDF"
                        >
                          <Download className="h-5 w-5" />
                          {/* Button to download the report as a PDF */}
                        </button>
                      )}
                    </div>

                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleLike(report)}
                        className={`p-2 rounded-full transition-all duration-300 tooltip ${
                          likedReports.has(report.id) 
                            ? 'text-red-500 bg-red-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title="Like Report"
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="text-xs ml-1">{report.stats.likes}</span>
                        {/* Button to like the report */}
                      </button>

                      <button
                        onClick={() => setShowMetadata(showMetadata === report.id ? null : report.id)}
                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all duration-300 tooltip"
                        title="Show Details"
                      >
                        <Info className="h-5 w-5" />
                        {/* Button to toggle the display of report metadata */}
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => {/* Toggle citation dropdown */}}
                          className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-all duration-300 tooltip"
                          title="Copy Citation"
                        >
                          <Copy className="h-5 w-5" />
                          {/* Button to copy the citation of the report */}
                        </button>
                        {/* Citation Dropdown (Add show/hide logic) */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                          <div className="py-1">
                            <button
                              onClick={() => handleCitationCopy(report, 'apa')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy APA
                              {/* Button to copy APA citation */}
                            </button>
                            <button
                              onClick={() => handleCitationCopy(report, 'mla')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy MLA
                              {/* Button to copy MLA citation */}
                            </button>
                            <button
                              onClick={() => handleCitationCopy(report, 'chicago')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Copy Chicago
                              {/* Button to copy Chicago citation */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Panel */}
                  {showMetadata === report.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Format:</span> {report.metadata.fileFormat}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {report.metadata.fileSize}
                        </div>
                        <div>
                          <span className="font-medium">Pages:</span> {report.metadata.pageCount}
                        </div>
                        <div>
                          <span className="font-medium">Version:</span> {report.metadata.version}
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span> {report.metadata.lastUpdated}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span> {report.metadata.language}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <span className="font-medium">Stats:</span>
                        <div className="flex gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" /> {report.stats.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" /> {report.stats.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" /> {report.stats.shares}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 border border-gray-300 rounded-lg bg-gray-50"
          >
            <FileSearch className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any reports matching your criteria. Please try adjusting your search or explore our latest reports.
            </p>
            <button
              onClick={() => {
                setSelectedTag("All Reports");
                setSearchTerm("");
              }}
              className="text-[rgb(106,27,154)] hover:text-[rgb(86,7,134)] font-medium border border-[rgb(106,27,154)] rounded px-4 py-2 transition duration-300"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
