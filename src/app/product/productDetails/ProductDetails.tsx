 //src/app/product/productDetails/ProductDetails.tsx
 'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/lib/utils/supabaseClient';

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
  faqs: string[];
  certifications: string[];
}

export default function ProductDetail() {
  const params = useParams();
  const [chemical, setChemical] = useState<Chemical | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchChemical = async () => {
      if (!params.id) return;
      
      const { data, error } = await supabase
        .from('chemicals')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (data) {
        // Parse JSON strings if needed
        const parsedData = {
          ...data,
          faqs: typeof data.faqs === 'string' ? JSON.parse(data.faqs) : data.faqs,
          certifications: typeof data.certifications === 'string' ? 
            JSON.parse(data.certifications) : data.certifications
        };
        setChemical(parsedData);
      }
      setLoading(false);
    };

    fetchChemical();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!chemical) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Product not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
        <Link href="/products">
          <Button variant="link" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>

      {/* Product Header */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-4">{chemical.name}</h1>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-semibold">CAS Number:</span> {chemical.cas_number}</p>
            <p><span className="font-semibold">Category:</span> {chemical.category}</p>
            <p>{chemical.description}</p>
          </div>
          <div className="flex gap-4 mt-6">
            <Button>
              Request Quote
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download SDS
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
          {chemical.image ? (
            <Image
              src={chemical.image}
              alt={chemical.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image available
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {['overview', 'specifications', 'applications', 'safety', 'faqs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Chemical Properties</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Molecular Formula:</span> {chemical.molecular_formula}</p>
                <p><span className="font-medium">Molecular Weight:</span> {chemical.molecular_weight}</p>
                <p><span className="font-medium">EINECS Number:</span> {chemical.einecs_number}</p>
                <p><span className="font-medium">Synonyms:</span> {chemical.synonyms}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Quality</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Purity:</span> {chemical.purity}</p>
                <p><span className="font-medium">Grade:</span> {chemical.grade}</p>
                <p><span className="font-medium">Packaging:</span> {chemical.packaging}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: chemical.specifications }} />
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: chemical.applications }} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Industries</h2>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: chemical.industries }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Safety Information</h2>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please review all safety information carefully and consult the Safety Data Sheet (SDS) before handling this chemical.
              </AlertDescription>
            </Alert>
            <div className="mt-4 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: chemical.safety_info }} />
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {chemical.certifications.map((cert, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {chemical.faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">{faq.question}</p>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';

// interface ProductDetails {
//   // Define your product details interface here
//   // For example:
//   name: string;
//   description: string;
//   // ... other properties
// }

// const ProductDetails: React.FC = () => {
//   const searchParams = useSearchParams();
//   const [productData, setProductData] = useState<ProductDetails | null>(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     // Your data fetching logic here
//     // For example:
//     // const fetchProductData = async () => {
//     //   const productName = searchParams.get('name');
//     //   // Fetch data from API or database
//     //   // setProductData(fetchedData);
//     // };
//     // fetchProductData();
//   }, [searchParams]);

//   if (!productData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {/* Your product details JSX here */}
//       <h1>{productData.name}</h1>
//       <p>{productData.description}</p>
//       {/* ... rest of your component JSX ... */}
//     </div>
//   );
// };

// export default ProductDetails;