'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCategory {
  name: string;
  subtext: string;
  image: string;
}

const productCategories: ProductCategory[] = [
  { 
    name: "Organic Chemicals",
    subtext: "Carbon-based compounds Bulk & Fine Chemicals",
    image: "/images/organic-chemicals.jpeg",
  },
  { 
    name: "Inorganic Chemicals",
    subtext: "Mineral-based chemicals for industrial use",
    image: "/images/inorganic-chemicals.jpg",
  },
  { 
    name: "Agro Chemicals",
    subtext: "Enhancing agricultural productivity and crop protection",
    image: "/images/agro-chemicals.jpg",
  },
  { 
    name: "Cosmetic Chemicals",
    subtext: "Innovative solutions for personal care products",
    image: "/images/cosmetic-chemicals.jpg",
  },
  { 
    name: "Construction Chemicals",
    subtext: "Improving durability and performance in building materials",
    image: "/images/construction-chemicals.jpg",
  },
  { 
    name: "Nutraceuticals",
    subtext: "Health-promoting compounds for dietary supplements",
    image: "/images/nutraceuticals.jpg",
  }
];

const ProductSection: React.FC = () => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Industries We Serve
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Delivering excellence across diverse industrial sectors with our comprehensive chemical solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/product/products?category=${encodeURIComponent(category.name)}`}>
                <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                  <div className="relative h-64">
                    <Image 
                      src={category.image} 
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="relative p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">
                      {category.subtext}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;