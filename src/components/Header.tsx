/**
 * Header component with navigation links and a mobile sidebar
 **/

'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
  "KSY Group serves 7 key industries with over 300 chemical products",
  "Leveraging global partnerships to ensure consistent supply and competitive advantage",
  "Streamlining transactions, improving communication, and optimizing supply chain efficiency"
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

  const NavLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ 
    href, 
    children,
    className 
  }) => (
    <Link
      href={href}
      className={className || "text-base font-medium text-gray-900 hover:text-primary transition-colors duration-300"}
    >
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

  const MobileMenuItem: React.FC<{ href: string; onClick?: () => void; children: React.ReactNode }> = ({ 
    href, 
    onClick, 
    children 
  }) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Link 
        href={href} 
        className="block py-2 px-4 text-lg text-gray-800 hover:text-primary transition-colors duration-300"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.li>
  );

  const DropdownMenu: React.FC<{
    isOpen: boolean;
    items: { href: string; label: string }[];
    onItemClick?: (item: string) => void;
  }> = ({ isOpen, items, onItemClick }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {onItemClick ? (
                <a
                  onClick={() => {
                    onItemClick(item.label);
                    closeDropdowns();
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-primary cursor-pointer transition-all duration-300"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeDropdowns}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-50 hover:text-primary transition-all duration-300"
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const DropdownButton: React.FC<{
    label: string;
    isOpen: boolean;
    onClick: () => void;
  }> = ({ label, isOpen, onClick }) => (
    <button
      onClick={onClick}
      className="text-base font-medium text-gray-900 hover:text-primary transition-colors duration-300 flex items-center"
    >
      {label}
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="ml-1"
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </button>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
        {/* Message Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="container mx-auto py-2 md:py-3">
            <div className="relative h-8 md:h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute text-sm md:text-base text-center px-4 leading-tight"
                >
                  {messages[currentMessageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/KSY LOGO FILE.png" 
                alt="KSY Group Logo" 
                width={120} 
                height={60} 
                className="md:w-[140px] md:h-[70px]"
                priority 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink href="/">Home</NavLink>
              
              {/* Products Dropdown */}
              <div ref={productsRef} className="relative">
                <DropdownButton
                  label="Products"
                  isOpen={isProductsOpen}
                  onClick={toggleProducts}
                />
                <DropdownMenu
                  isOpen={isProductsOpen}
                  items={productCategories.map(category => ({
                    href: `/product/products?category=${encodeURIComponent(category)}`,
                    label: category
                  }))}
                  onItemClick={(category) => handleProductClick(category)}
                />
              </div>

              <NavLink href="/services">Services</NavLink>
              <NavLink href="/about">About</NavLink>

              {/* Industry Insights Dropdown */}
              <div ref={insightsRef} className="relative">
                <DropdownButton
                  label="Industry Insights"
                  isOpen={isInsightsOpen}
                  onClick={toggleInsights}
                />
                <DropdownMenu
                  isOpen={isInsightsOpen}
                  items={[
                    { href: '/industry-insights/blog', label: 'Blog' },
                    { href: '/industry-insights/summary-reports', label: 'Summary Reports' }
                  ]}
                />
              </div>

              <Button
                onClick={() => router.push('/contact')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-6 py-2"
              >
                Get a Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Move Mobile Sidebar and Modal outside of header */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[999]"
              onClick={closeSidebar}
            />
            <motion.div
              ref={sidebarRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-[280px] h-full bg-white shadow-xl z-[1000] lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <Link href="/" onClick={closeSidebar}>
                      <Image 
                        src="/images/KSY LOGO FILE.png" 
                        alt="KSY Group Logo" 
                        width={100} 
                        height={50} 
                        priority 
                      />
                    </Link>
                    <button
                      onClick={closeSidebar}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="px-4">
                    <ul className="space-y-2">
                      <MobileMenuItem href="/" onClick={closeSidebar}>Home</MobileMenuItem>
                      <li>
                        <button 
                          onClick={toggleProducts}
                          className="flex items-center justify-between w-full p-3 text-gray-800 hover:bg-gray-50 rounded-lg transition-colors duration-300"
                        >
                          <span>Products</span>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isProductsOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100"
                            >
                              {productCategories.map((category, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <Link
                                    href={`/product/products?category=${encodeURIComponent(category)}`}
                                    className="block py-2 px-4 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-300"
                                    onClick={closeSidebar}
                                  >
                                    {category}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                      <MobileMenuItem href="/services" onClick={closeSidebar}>Services</MobileMenuItem>
                      <MobileMenuItem href="/about" onClick={closeSidebar}>About</MobileMenuItem>
                      <MobileMenuItem href="/contact" onClick={closeSidebar}>Contact</MobileMenuItem>
                    </ul>
                  </nav>
                </div>

                {/* Mobile Sidebar Footer */}
                <div className="p-4 border-t border-gray-100">
                  <Button
                    onClick={() => {
                      openQuoteModal();
                      closeSidebar();
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-3"
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Move QuoteModal outside header */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </>
  );
}
