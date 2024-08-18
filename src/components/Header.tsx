'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Agro Chemicals",
  "Cosmetic Chemicals",
  "Construction Chemicals",
  "Nutraceuticals"
];

export default function Header() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDetailsElement>(null);

  const handleProductClick = (category: string) => {
    router.push(`/product/products?category=${encodeURIComponent(category)}`);
    closeSidebar();
    closeDropdowns();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const closeDropdowns = () => {
    setIsProductsOpen(false);
    if (dropdownRef.current) dropdownRef.current.open = false;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <Link href={href} className="text-lg font-semibold hover:text-black transition duration-300">
      {children}
    </Link>
  );

  const SidebarLink: React.FC<{ href: string; onClick?: () => void; children: React.ReactNode }> = ({ href, onClick, children }) => (
    <li>
      <Link href={href} className="block py-2 px-4 text-lg hover:text-black transition duration-300" onClick={onClick}>
        {children}
      </Link>
    </li>
  );

  return (
    <header className="bg-white text-black shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/KSY LOGO FILE.png" alt="KSY Group Logo" width={108} height={57} priority className="mr-2" />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <div className="relative group">
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
                <ul className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
            <NavLink href="/newsletter">Newsletter</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right: Get a Quote Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact" className="btn btn-ghost text-black border border-[rgb(106,27,154)] rounded-full px-6 py-2 hover:bg-[rgb(106,27,154)] hover:text-black transition duration-300">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden focus:outline-none" onClick={toggleSidebar} aria-label="Toggle menu">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
              <button onClick={toggleProducts} className="flex justify-between items-center w-full py-2 px-4 text-lg hover:text-black transition duration-300">
                Products
                <svg className={`w-5 h-5 transition-transform duration-200 ${isProductsOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <ul className="ml-4">
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a onClick={() => handleProductClick(category)} className="block py-2 px-4 text-lg hover:text-black cursor-pointer transition duration-300">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <SidebarLink href="/services" onClick={closeSidebar}>Services</SidebarLink>
            <SidebarLink href="/about" onClick={closeSidebar}>About</SidebarLink>
            <SidebarLink href="/newsletter" onClick={closeSidebar}>Newsletter</SidebarLink>
            <SidebarLink href="/contact" onClick={closeSidebar}>Contact</SidebarLink>
            <li className="mt-4">
              <Link href="/contact" className="block w-full text-center bg-[rgb(106,27,154)] text-black rounded-full px-4 py-2 hover:bg-[rgb(86,7,134)] transition duration-300" onClick={closeSidebar}>
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

