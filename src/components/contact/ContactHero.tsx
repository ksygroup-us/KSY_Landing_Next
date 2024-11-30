'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero = () => {
  return (
    <section className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Have questions? We're here to help. Reach out to us for any inquiries about our chemical solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}; 