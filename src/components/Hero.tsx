'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="relative min-h-[calc(100vh-144px)] flex flex-col lg:flex-row overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
      {/* Left Content Section */}
      <div className="w-full lg:w-1/2 flex items-center px-6 lg:px-16 relative z-10 py-20 lg:py-0">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-center lg:text-left">
              <span className="text-white">Your Global Partner in</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mt-4">
                Chemical Distribution
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-300 mb-12 leading-relaxed font-light text-center lg:text-left"
          >
            At KSY Group, we are committed to providing unparalleled access to a comprehensive
            range of chemicals that cater to the diverse needs of industries worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full"
          >
            <Link href="/product/products" className="w-full sm:w-auto flex-1 sm:flex-initial">
              <Button 
                variant="default" 
                size="lg" 
                className="w-full h-[60px] text-base font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Explore Our Products
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto flex-1 sm:flex-initial">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full h-[60px] text-base font-medium rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto order-first lg:order-last">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent z-10" />
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
              fill
              className="object-cover object-center"
              quality={100}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Dot Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;