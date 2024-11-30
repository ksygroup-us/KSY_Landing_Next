'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const OurStory = () => {
  return (
    <section className="py-2">
      <div className="container mx-auto px-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
          <div className="space-y-6 text-gray-600">
            <p className="text-lg">
              Ideated in 2020, KSY Group LLC emerged as a response to the global supply chain challenges in the chemical distribution sector. We saw an opportunity to redefine the industry and create more resilient solutions.
            </p>
            <p className="text-lg">
              Today, we focus on sourcing from India and importing to the United States, but our vision extends far beyond. We're committed to expanding our product range and global reach, always adapting to meet the needs of our international clients.
            </p>
            <p className="text-lg">
              As we grow, we're excited to bring innovative solutions and a fresh perspective to the chemical distribution landscape. Join us on this journey of growth and innovation!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 