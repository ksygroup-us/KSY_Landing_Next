'use client';
import React from 'react';
import { motion } from 'framer-motion';

const coreValues = [
  {
    title: 'Trust',
    description: 'We build lasting partnerships through transparency and reliability.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Expertise',
    description: 'Our team delivers innovative solutions backed by industry knowledge.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Agility',
    description: 'We adapt swiftly to meet the evolving needs of our clients.',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Quality',
    description: 'We maintain high standards to exceed customer expectations.',
    gradient: 'from-green-500 to-emerald-500'
  }
];

export const CoreValues = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full p-6 hover:shadow-2xl transition-all duration-300 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 