'use client';
import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Global Expertise, Local Touch',
    description: 'With our international network and local market knowledge, we bridge the gap between global chemical manufacturers and your specific needs.'
  },
  {
    title: 'Uncompromising Quality',
    description: 'We partner only with reputable manufacturers and implement rigorous quality control measures to ensure the highest standard of chemicals.'
  },
  {
    title: 'Innovative Solutions',
    description: 'Our team of experts is constantly exploring new technologies and methodologies to provide you with cutting-edge chemical solutions.'
  },
  {
    title: 'Commitment to Sustainability',
    description: 'We prioritize environmentally friendly practices and products, helping you meet your sustainability goals without compromising on quality.'
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Why Choose KSY Group LLC?
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 