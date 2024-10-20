'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/utils/supabaseClient'; // Import the supabase client


interface Chemical {
  id: number;
  name: string;
  cas_number: string;
  description: string;
  category: string;
  molecular_formula: string;
  molecular_weight: string;
  einecs_number: string;
  synonyms: string;
  purity: string;
  grade: string;
  specifications: string;
  applications: string;
  industries: string;
  packaging: string;
  image: string;
  safety_info: string;
  faqs: string;
  certifications: string;
}

interface Category {
  id: number;
  name: string;
}

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

  const toggleChemicalDetails = (id: number) => {
    setExpandedChemical(expandedChemical === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">Our Products</h1>
      
      {/* Product Categories Navigation */}
      <div className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn ${selectedCategory?.name === category.name ? 'btn-primary' : 'btn-outline btn-primary'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <h2 className="text-3xl font-semibold text-primary text-center mb-8">{selectedCategory?.name} Chemicals</h2>
        <div className="space-y-6">
          {chemicals.map((chemical) => (
            <div key={chemical.id} className="card bg-base-100 shadow-xl border border-primary/20">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  {chemical.name}
                </h3>
                <p className="text-sm text-primary/70 mb-2">CAS: {chemical.cas_number}</p>
                <p className="text-gray-600">{chemical.description}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-circle btn-sm btn-primary"
                    onClick={() => toggleChemicalDetails(chemical.id)}
                  >
                    {expandedChemical === chemical.id ? '-' : '+'}
                  </button>
                </div>
              </div>
              {expandedChemical === chemical.id && (
                <div className="card-body pt-0">
                  <div className="divider before:bg-primary/20 after:bg-primary/20"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                    <p><strong className="text-primary">Molecular Formula:</strong> {chemical.molecular_formula}</p>
                    <p><strong className="text-primary">Molecular Weight:</strong> {chemical.molecular_weight}</p>
                    <p><strong className="text-primary">EINECS Number:</strong> {chemical.einecs_number}</p>
                    <p><strong className="text-primary">Synonyms:</strong> {chemical.synonyms}</p>
                    <p><strong className="text-primary">Purity:</strong> {chemical.purity}</p>
                    <p><strong className="text-primary">Grade:</strong> {chemical.grade}</p>
                    <p><strong className="text-primary">Specifications:</strong> {chemical.specifications}</p>
                    <p><strong className="text-primary">Applications:</strong> {chemical.applications}</p>
                    <p><strong className="text-primary">Industries:</strong> {chemical.industries}</p>
                    <p><strong className="text-primary">Packaging:</strong> {chemical.packaging}</p>
                    <p><strong className="text-primary">Safety Info:</strong> {chemical.safety_info}</p>
                    <p><strong className="text-primary">FAQs:</strong> {chemical.faqs}</p>
                    <p><strong className="text-primary">Certifications:</strong> {chemical.certifications}</p>
                    {chemical.image && (
                      <div className="col-span-1 sm:col-span-2">
                        <Image
                          src={chemical.image}
                          alt={chemical.name}
                          width={200}
                          height={200}
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
