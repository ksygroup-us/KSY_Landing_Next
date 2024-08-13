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
    <div className="relative h-[calc(100vh-80px)] overflow-hidden bg-black">
      <div className="carousel w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className={`carousel-item relative w-full h-full transition-opacity duration-1000 ${
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
              className="object-cover w-full h-full"
            />
          </div>
        ))}
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
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products..."
                  className="input input-bordered w-full max-w-md text-black"
                />
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
