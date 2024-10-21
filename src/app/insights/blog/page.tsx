'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Green Chemistry",
    excerpt: "Exploring sustainable practices in the chemical industry...",
    image: "/images/green-chemistry.jpg",
    date: "2024-03-15",
    author: "Dr. Jane Smith"
  },
  {
    id: 2,
    title: "Innovations in Chemical Manufacturing",
    excerpt: "New technologies reshaping production processes, from 3D printing to nanotech applications in the chemical industry.",
    image: "/images/chemical-manufacturing.jpg",
    date: "2024-03-10",
    author: "John Doe"
  },
  {
    id: 3,
    title: "The Impact of AI on Chemical Research",
    excerpt: "How artificial intelligence is accelerating discoveries, from drug development to materials science breakthroughs.",
    image: "/images/ai-research.jpg",
    date: "2024-03-05",
    author: "Dr. Alex Johnson"
  },
  {
    id: 4,
    title: "Regulatory Challenges in the Chemical Industry",
    excerpt: "Navigating the complex landscape of chemical regulations, including REACH, GHS, and emerging global standards.",
    image: "/images/regulatory-challenges.jpg",
    date: "2024-02-28",
    author: "Sarah Brown"
  },
  {
    id: 5,
    title: "Sustainable Packaging Solutions",
    excerpt: "Exploring eco-friendly alternatives to traditional chemical packaging, from biodegradable materials to reusable containers.",
    image: "/images/sustainable-packaging.jpg",
    date: "2024-02-20",
    author: "Emily Chen"
  },
  {
    id: 6,
    title: "The Rise of Biocatalysis",
    excerpt: "How enzymes and microorganisms are revolutionizing chemical synthesis, offering greener and more efficient production methods.",
    image: "/images/biocatalysis.jpg",
    date: "2024-02-15",
    author: "Dr. Michael Rodriguez"
  },
  {
    id: 7,
    title: "Safety Innovations in Chemical Laboratories",
    excerpt: "Cutting-edge technologies and protocols enhancing safety in chemical research environments, from smart PPE to AI-powered risk assessment.",
    image: "/images/lab-safety.jpg",
    date: "2024-02-08",
    author: "Lisa Thompson"
  }
];


export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogPosts.map((post) => (
          <Link href={`/insights/blogs/blog?id=${post.id}`} key={post.id} className="block group h-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full relative">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-3xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <div className="flex-grow relative">
                  <p className="text-xl text-gray-600 mb-2 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90">
                    <span className="text-blue-600 font-semibold px-4 py-2 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">
                      Read More
                    </span>
                  </div>
                </div>
                <div className="text-lg text-gray-500 mt-4">
                  <span className="block mb-1">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="block">By {post.author}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}