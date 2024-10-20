/**
 * Header component with navigation links and a mobile sidebar
 **/

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
// import QuoteModal from './QuoteModal'; // Make sure to import the QuoteModal component

import { blogs } from '@/app/insights/blogs/blog';
// import { blogCategories } from '@/app/insights/blogs/blogCategories'; // Unused import
import QuoteModal from '@/components/quoteModel';

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Agro Chemicals",
  "Cosmetic Chemicals",
  "Construction Chemicals",
  "Nutraceuticals"
];

const messages = [
  "KSY Group proudly presents an extensive portfolio exceeding 300 diverse chemical products",
  "Our expertise lies in specialized custom chemical sourcing and tailored solution development",
  "KSY Group serves 7 key industries with over 300 chemical products and pleased to announce the forthcoming launch of 3 innovative features designed to enhance the experience for both buyers and sellers",
  "Leveraging global partnerships to ensure consistent supply and competitive advantage",
  "Our upcoming enhancements aim to streamline transactions, improve communication, and optimize supply chain efficiency for all stakeholders"
];

export default function Header() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

// In your return statement, near the end:
<QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  const handleProductClick = (category: string) => {
    router.push(`/product/products?category=${encodeURIComponent(category)}`);
    closeSidebar();
    closeDropdowns();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
    setIsInsightsOpen(false);
  };
  const toggleInsights = () => {
    setIsInsightsOpen(!isInsightsOpen);
    setIsProductsOpen(false);
  };
  const closeDropdowns = () => {
    setIsProductsOpen(false);
    setIsInsightsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
      if (
        (productsRef.current && !productsRef.current.contains(event.target as Node)) &&
        (insightsRef.current && !insightsRef.current.contains(event.target as Node))
      ) {
        closeDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="text-lg font-semibold hover:text-[rgb(106,27,154)] transition duration-300">
      {children}
    </Link>
  );

  const SidebarLink: React.FC<{ href: string; onClick?: () => void; children: React.ReactNode; hasDropdown?: boolean }> = ({ href, onClick, children, hasDropdown }) => (
    <li>
      <Link 
        href={href} 
        className={`block py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300 ${hasDropdown ? 'flex items-center justify-between' : ''}`} 
        onClick={onClick}
      >
        {children}
        {hasDropdown && (
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
    </li>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-black shadow-md z-50">
      {/* Animated message bar */}
      <div className="bg-gradient-to-r from-[#FFA500] to-[#FF69B4] text-white py-2 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center h-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`text-sm text-center transition-all duration-1000 ${
                  index === currentMessageIndex
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform -translate-y-full'
                }`}
                style={{
                  position: 'absolute',
                  width: '100%',
                }}
              >
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-1">
          {/* Left: Mobile Menu Button and Logo */}
          <div className="flex items-center">
            <button className="lg:hidden mr-4 focus:outline-none" onClick={toggleSidebar} aria-label="Toggle menu">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/images/KSY LOGO FILE.png" alt="KSY Group Logo" width={140} height={74} priority className="mr-2" />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <div ref={productsRef} className="relative">
              <button 
                onClick={toggleProducts} 
                className="text-lg font-semibold text-black hover:text-[rgb(106,27,154)] transition duration-300 flex items-center"
              >
                Products
                <svg 
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${isProductsOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <ul className="absolute left-0 mt-4 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a 
                        onClick={() => handleProductClick(category)} 
                        className="block px-4 py-2 text-lg text-black hover:text-[rgb(106,27,154)] cursor-pointer transition duration-300"
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/about">About</NavLink>
            <div ref={insightsRef} className="relative">
              <button 
                onClick={toggleInsights} 
                className="text-lg font-semibold text-black hover:text-[rgb(106,27,154)] transition duration-300 flex items-center"
              >
                KSY Insights
                <svg 
                  className={`w-5 h-5 ml-2 transition-transform duration-200 ${isInsightsOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isInsightsOpen && (
                <ul className="absolute left-0 mt-4 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <li><Link href="/insights/newspaper" className="block px-4 py-2 text-lg text-black hover:text-[rgb(106,27,154)] transition duration-300">Newspaper</Link></li>
                  <li><Link href="/insights/report" className="block px-4 py-2 text-lg text-black hover:text-[rgb(106,27,154)] transition duration-300">Reports</Link></li>
                  <li><Link href="/insights/blogs" className="block px-4 py-2 text-lg text-black hover:text-[rgb(106,27,154)] transition duration-300">Blogs</Link></li>
                </ul>
              )}
            </div>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right: Get a Quote Button */}
          <Button
            onClick={openQuoteModal}
            variant="ghost"
            size="sm"
            className="text-black border border-[rgb(106,27,154)] rounded-full hover:bg-[rgb(106,27,154)] hover:text-white transition duration-300">
            Get a Quote
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-72 h-full bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button className="absolute top-4 right-4 focus:outline-none" onClick={closeSidebar} aria-label="Close menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="mt-12">
            <SidebarLink href="/" onClick={closeSidebar}>Home</SidebarLink>
            <li>
              <button onClick={toggleProducts} className="flex justify-between items-center w-full py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300">
                Products
                <svg className={`w-5 h-5 transition-transform duration-200 ${isProductsOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <ul className="ml-4 mt-2">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a onClick={() => handleProductClick(category)} className="block py-2 px-4 text-lg hover:text-[rgb(106,27,154)] cursor-pointer transition duration-300">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <SidebarLink href="/services" onClick={closeSidebar}>Services</SidebarLink>
            <SidebarLink href="/about" onClick={closeSidebar}>About</SidebarLink>
            <li>
              <button onClick={toggleInsights} className="flex justify-between items-center w-full py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300">
                KSY Insights
                <svg className={`w-5 h-5 transition-transform duration-200 ${isInsightsOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isInsightsOpen && (
                <ul className="ml-4 mt-2">
                  <li><Link href="/insights/newspaper" className="block py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300" onClick={closeSidebar}>Newspaper</Link></li>
                  <li><Link href="/insights/report" className="block py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300" onClick={closeSidebar}>Reports</Link></li>
                  <li><Link href="/insights/blog" className="block py-2 px-4 text-lg hover:text-[rgb(106,27,154)] transition duration-300" onClick={closeSidebar}>Blogs</Link></li>
                </ul>
              )}
            </li>
            <SidebarLink href="/contact" onClick={closeSidebar}>Contact</SidebarLink>
          </ul>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </header>
  );
}
