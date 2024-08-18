// app/products/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
// import { createClient } from '@/lib/utils/supabaseClient';


import { createClient } from '@supabase/supabase-js'



interface Product {
  id: number;
  name: string;
  cas: string;
  applications: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Our Products</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <ProductContent />
      </Suspense>
    </div>
  );
}

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const fetchCategories = async () => {
      const { supabase } = (await import('@/lib/utils/supabaseClient')).default();
      const { data, error } = await supabase.from('categories').select('*');
      if (data) {
        setCategories(data);
        setSelectedCategory(data[0]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', selectedCategory.name);
        if (data) {
          setProducts(data);
        }
      }
    };
    fetchProducts();
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

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.applications.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleProductClick = (productName: string) => {
    router.push(`/product/productDetails?name=${encodeURIComponent(productName)}&category=${encodeURIComponent(selectedCategory?.name || '')}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="bg-gray-100 rounded-md overflow-hidden">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 ${selectedCategory?.name === category.name ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{selectedCategory?.name}</h2>
          <div className="flex gap-2">
            <button onClick={() => setView('grid')} className={`px-3 py-1 rounded ${view === 'grid' ? 'bg-primary text-white' : 'bg-gray-200'}`}>Grid</button>
            <button onClick={() => setView('list')} className={`px-3 py-1 rounded ${view === 'list' ? 'bg-primary text-white' : 'bg-gray-200'}`}>List</button>
          </div>
        </div>
        
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => handleProductClick(product.name)}>
                <div className="w-full h-48 relative">
                  <Image
                    src={selectedCategory?.image || ''}
                    alt={selectedCategory?.name || ''}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">CAS: {product.cas}</p>
                  <p className="text-sm mb-4">{product.applications}</p>
                  <div className="flex justify-between">
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
                      Request Sample
                    </button>
                    <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300">
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer" onClick={() => handleProductClick(product.name)}>
                <div className="w-24 h-24 relative">
                  <Image
                    src={selectedCategory?.image || ''}
                    alt={selectedCategory?.name || ''}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">CAS: {product.cas}</p>
                  <p>{product.applications}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
                    Request Sample
                  </button>
                  <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition duration-300">
    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}






// import React, { useState, useEffect} from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Suspense } from 'react';

// const productCategories = [
//   {
//     name: "Organic Chemicals",
//     image: "/images/organic-chemicals.jpeg",
//     products: [
//       { name: "Acetone", cas: "67-64-1", applications: "Solvent, cleaning agent" },
//       { name: "Ethanol", cas: "64-17-5", applications: "Disinfectant, fuel" },
//       { name: "Methanol", cas: "67-56-1", applications: "Fuel, antifreeze" },
//       { name: "Isopropyl Alcohol", cas: "67-63-0", applications: "Cleaning agent, solvent" },
//       { name: "Toluene", cas: "108-88-3", applications: "Solvent, fuel additive" },
//     ]
//   },
//   {
//     name: "Inorganic Chemicals",
//     image: "/images/inorganic-chemicals.jpg",
//     products: [
//       { name: "Sodium Hydroxide", cas: "1310-73-2", applications: "pH control, cleaning agent" },
//       { name: "Hydrochloric Acid", cas: "7647-01-0", applications: "pH adjustment, metal cleaning" },
//       { name: "Sulfuric Acid", cas: "7664-93-9", applications: "Industrial processes, batteries" },
//       { name: "Ammonia", cas: "7664-41-7", applications: "Fertilizer production, refrigerant" },
//       { name: "Hydrogen Peroxide", cas: "7722-84-1", applications: "Bleaching agent, disinfectant" },
//     ]
//   },
//   {
//     name: "Agro Chemicals",
//     image: "/images/agro-chemicals.jpg",
//     products: [
//       { name: "Glyphosate", cas: "1071-83-6", applications: "Herbicide" },
//       { name: "Chlorpyrifos", cas: "2921-88-2", applications: "Insecticide" },
//       { name: "Atrazine", cas: "1912-24-9", applications: "Herbicide" },
//       { name: "Imidacloprid", cas: "138261-41-3", applications: "Insecticide" },
//       { name: "Malathion", cas: "121-75-5", applications: "Insecticide" },
//     ]
//   },
//   {
//     name: "Cosmetic Chemicals",
//     image: "/images/cosmetic-chemicals.jpg",
//     products: [
//       { name: "Glycerin", cas: "56-81-5", applications: "Moisturizer, solvent" },
//       { name: "Sodium Lauryl Sulfate", cas: "151-21-3", applications: "Surfactant, cleansing agent" },
//       { name: "Titanium Dioxide", cas: "13463-67-7", applications: "UV filter, whitening agent" },
//       { name: "Salicylic Acid", cas: "69-72-7", applications: "Exfoliant, anti-acne agent" },
//       { name: "Tocopherol", cas: "59-02-9", applications: "Antioxidant, preservative" },
//     ]
//   },
//   {
//     name: "Construction Chemicals",
//     image: "/images/construction-chemicals.jpg",
//     products: [
//       { name: "Calcium Chloride", cas: "10043-52-4", applications: "Accelerator, deicer" },
//       { name: "Polycarboxylate Ether", cas: "37251-67-5", applications: "Superplasticizer" },
//       { name: "Silica Fume", cas: "69012-64-2", applications: "Concrete strengthener" },
//       { name: "Sodium Gluconate", cas: "527-07-1", applications: "Retarder, water reducer" },
//       { name: "Triethanolamine", cas: "102-71-6", applications: "Grinding aid, plasticizer" },
//     ]
//   },
//   {
//     name: "Nutraceuticals",
//     image: "/images/nutraceuticals.jpg",
//     products: [
//       { name: "Coenzyme Q10", cas: "303-98-0", applications: "Antioxidant, energy production" },
//       { name: "L-Carnitine", cas: "541-15-1", applications: "Fat metabolism, energy production" },
//       { name: "Omega-3 Fatty Acids", cas: "10417-94-4", applications: "Heart health, brain function" },
//       { name: "Resveratrol", cas: "501-36-0", applications: "Antioxidant, anti-inflammatory" },
//       { name: "Glucosamine", cas: "3416-24-8", applications: "Joint health, anti-inflammatory" },
//     ]
//   },
// ];


// export default function ProductsPage() {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-primary mb-8">Our Products</h1>
      
//       <Suspense fallback={<div>Loading...</div>}>
//         <ProductContent />
//       </Suspense>
//     </div>
//   );
// }


// function ProductContent() {
//   const searchParams = useSearchParams();
//   const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);

//   useEffect(() => {
//     const category = searchParams.get('category');
//     if (category) {
//       const found = productCategories.find(cat => cat.name === category);
//       if (found) {
//         setSelectedCategory(found);
//       }
//     }
//   }, [searchParams]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="grid grid-cols-1 md:grid-cols-2 gap-8">Our Products</h1>
      
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4">
//           <ul className="menu bg-base-200 w-full rounded-box">
//             {productCategories.map((category, index) => (
//               <li key={index}>
//                 <a 
//                   onClick={() => setSelectedCategory(category)}
//                   className={selectedCategory.name === category.name ? "active" : ""}
//                 >
//                   {category.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="w-full md:w-3/4">
//           <h2 className="text-2xl font-semibold mb-4">{selectedCategory.name}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {selectedCategory.products.map((product, productIndex) => (
//               <div key={productIndex} className="h-[20rem] w-full border rounded-[6px]">
//                 <a href={`/product/${product.name}`}>
//                   <img
//                     src={selectedCategory.image}
//                     alt={selectedCategory.name}
//                     className="h-[48%] w-full object-cover"
//                   />
//                 </a>
//                 <div className="h-[52%] w-full flex flex-col justify-around px-3">
//                   <a href={`/product/${product.name}`}>
//                     <div>
//                       <p className="text-[0.9rem] font-medium mb-2 uppercase">
//                         {product.name}
//                       </p>
//                       <p className="text-[#777777] text-[0.85rem] hideLongTypography2">
//                         {product.applications}
//                       </p>
//                     </div>
//                   </a>
//                   <div className="flex justify-between">
//                     <button className="font-medium text-[0.72rem] border w-[48%] rounded-[2px] py-2 border-pink text-red hover:border-pink-600 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 focus:ring-offset-white">
//                       <div>Request A Sample</div>
//                     </button>
//                     <button className="font-medium text-[0.72rem] text-white bg-red w-[48%] rounded-[2px] py-2 bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white">
//                       <div>Get A Quote</div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

