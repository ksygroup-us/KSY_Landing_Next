'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/utils/supabaseClient';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { Chemical, Category } from '@/types/chemical';

// Create a separate component for the search params functionality
function ProductsContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [chemicals, setChemicals] = useState<Chemical[]>([]);
  const [expandedChemical, setExpandedChemical] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (data) {
        setCategories(data);
        setSelectedCategory(data[0]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchChemicals = async () => {
      if (selectedCategory) {
        const { data, error } = await supabase
          .from('chemicals')
          .select('*')
          .eq('category', selectedCategory.name);
        if (data) {
          setChemicals(data);
        }
      }
    };
    fetchChemicals();
  }, [selectedCategory]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      const found = categories.find(cat => cat.name === category);
      if (found) {
        setSelectedCategory(found);
      }
    }
  }, [searchParams, categories]);

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chemicals.map((chemical) => (
          <ProductCard
            key={chemical.id}
            chemical={chemical}
            isExpanded={expandedChemical === chemical.id}
            onToggle={() => setExpandedChemical(
              expandedChemical === chemical.id ? null : chemical.id
            )}
          />
        ))}
      </div>
    </>
  );
}

// Main component with Suspense boundary
export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Our Products
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
          Explore our comprehensive range of high-quality chemical products
        </motion.p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
