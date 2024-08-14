'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/images/Hero-image-1.jpg',
  '/images/Hero-image-2.jpg',
  '/images/Hero-image-3.jpg',
];

const Hero: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Chemical Distribution ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white p-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Global Partner in Chemical Distribution
          </h1>
          <p className="text-xl mb-8">
            At KSY Group, we are committed to providing unparalleled access to a comprehensive
            range of chemicals that cater to the diverse needs of industries worldwide.
          </p>
          <form onSubmit={handleSearch} className="flex justify-center">
          <div className="relative w-full max-w-lg"> {/* Kept max-w-lg for the same length */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-6 py-4 rounded-full text-black bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary shadow-md transition-all duration-300 pr-14 text-xl" // Increased padding, font size, and right padding
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-primary rounded-full text-white hover:bg-primary-focus transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7" // Increased icon size
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Hero;