'use client';
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Agro Chemicals",
  "Cosmetic Chemicals",
  "Construction Chemicals",
  "Nutraceuticals"
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white/90">KSY Group LLC</h3>
            <p className="text-white/70 mb-4">
              Your trusted partner in chemical distribution, providing innovative solutions and quality products to meet your industry needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white/90">Products</h3>
            <ul className="space-y-2">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    href={`/product/products?category=${encodeURIComponent(category)}`}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white/90">Company</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' },
                // { name: 'Newsletter', path: '/newsletter' },
                { name: 'Industry Insights', path: '/industry' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white/90">Legal</h3>
            <ul className="space-y-2">
              {[
                { name: 'Terms of Use', path: '/legal/termsOfUse' },
                { name: 'Privacy Policy', path: '/legal/privacyPolicy' },
                { name: 'Cookie Policy', path: '/legal/cookiePolicy' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.path}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/70">
              <p className="mb-1">PO Box 76180, Fort Worth, Texas</p>
              <p className="mb-1">
                Email: <a href="mailto:info@ksygroup.com" className="hover:text-white transition-colors duration-300">info@ksygroup.com</a> | 
                Phone: <a href="tel:+16692437152" className="hover:text-white transition-colors duration-300">(669) 295-3313</a>
              </p>
              <p className="text-sm">&copy; 2024 KSY Group LLC. All rights reserved.</p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: FaFacebookF, href: 'https://facebook.com', hoverColor: 'hover:text-blue-400' },
                { icon: FaTwitter, href: 'https://twitter.com', hoverColor: 'hover:text-blue-400' },
                { icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/ksy-group', hoverColor: 'hover:text-blue-400' },
                { icon: FaInstagram, href: 'https://instagram.com', hoverColor: 'hover:text-pink-400' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/70 ${social.hoverColor} transition-colors duration-300`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}