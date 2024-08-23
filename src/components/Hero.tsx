'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const images = [
  '/images/Hero-image-1.jpg',
  '/images/Hero-image-2.jpg',
  '/images/Hero-image-3.jpg',
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

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
          <Link href="/product/products" passHref>
            <div className="flex justify-center">
              <Button 
                variant="default" 
                size="lg" 
                className="text-xl rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <span className="inline-block text-center">Explore Our Products</span>
              </Button>
            </div>
          </Link>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-200'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;