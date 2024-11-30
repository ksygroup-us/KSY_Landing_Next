'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '@/types/chemical';
import { Beaker } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onCategorySelect(category)}
            className={`
              relative group flex items-center gap-2 px-6 py-3 
              rounded-xl text-sm font-medium transition-all duration-300
              ${selectedCategory?.id === category.id
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
              }
            `}
          >
            <Beaker className={`w-4 h-4 ${
              selectedCategory?.id === category.id ? 'text-white' : 'text-primary'
            }`} />
            <span>{category.name}</span>
            {selectedCategory?.id === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}; 