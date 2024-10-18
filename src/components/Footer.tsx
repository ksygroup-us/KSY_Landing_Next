'use client';
import React from 'react';
import Link from 'next/link';
// import PrivacyPolicy from '@/components/PrivacyPolicy';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

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
    <footer className="bg-primary text-primary-content p-10">
      <div className="footer container mx-auto flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <span className="footer-title">KSY Group LLC</span>
          <p className="max-w-xs mt-2">Your trusted partner in chemical distribution, providing innovative solutions and quality products to meet your industry needs.</p>
        </div>
        <div className="flex-1">
          <span className="footer-title">Products</span>
          <ul className="mt-2">
            {productCategories.map((category, index) => (
              <li key={index} className="mb-2">
                <Link href={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`} className="link link-hover">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <span className="footer-title">Company</span>
          <Link href="/" className="link link-hover">Home</Link>
          <Link href="/about" className="link link-hover">About us</Link>
          <Link href="/services" className="link link-hover">Services</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
          <Link href="/newsletter" className="link link-hover">Newsletter</Link>
        </div>
        <div className="flex-1">
          <span className="footer-title">Legal</span>
          <Link href="/legal/termsOfUse" className="link link-hover" target="_blank" rel="noopener noreferrer">
            Terms of use
          </Link>
          <Link href="/legal/privacyPolicy" className="link link-hover" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>
          <Link href="/legal/cookiePolicy" className="link link-hover" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </Link>
        </div>
      </div>
      <div className="footer container mx-auto mt-10 pt-10 border-t border-primary-content flex flex-col md:flex-row justify-between items-center">
        <div className="text-left">
          <p className="mb-1">PO Box 76180, Fort Worth, Texas</p>
          <p className="mb-1">Email: <a href="mailto:info@ksygroup.com" className="hover:text-primary">info@ksygroup.com</a> | Phone: <a href="tel:+16692437152" className="hover:text-primary">(669) 295-3313</a></p>
          <p className="text-sm">&copy; 2024 KSY Group LLC. All rights reserved.</p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition-colors duration-400">
            <FaFacebookF size={46} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-400">
            <FaTwitter size={46} />
          </a>
          <a href="https://www.linkedin.com/company/ksy-group" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 transition-colors duration-400">
            <FaLinkedinIn size={46} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-colors duration-400">
            <FaInstagram size={50} />
          </a>
        </div>
      </div>
    </footer>
  );
}