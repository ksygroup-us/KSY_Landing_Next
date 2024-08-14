//from product page 

// import React, { useState, useEffect, Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import ProductCard from '@/components/productCard';

// // ... keep the productCategories array as is ...

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


// function ProductList({ selectedCategory }) {
//   return (
//     <>
//       <h2 className="text-2xl font-semibold mb-4">{selectedCategory.name}</h2>
//       <div className="mb-6">
//         <Image 
//           src={selectedCategory.image} 
//           alt={selectedCategory.name} 
//           width={800} 
//           height={400} 
//           className="w-full h-64 object-cover rounded-lg"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {selectedCategory.products.map((product, productIndex) => (
//           <ProductCard
//             key={productIndex}
//             name={product.name}
//             cas={product.cas}
//             applications={product.applications}
//             image={selectedCategory.image}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// function CategorySelector({ categories, onSelectCategory }) {
//   return (
//     <ul className="menu bg-base-200 w-full rounded-box">
//       {categories.map((category, index) => (
//         <li key={index}>
//           <a 
//             onClick={() => onSelectCategory(category)}
//             className={category.selected ? "active" : ""}
//           >
//             {category.name}
//           </a>
//         </li>
//       ))}
//     </ul>
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
//       <h1 className="text-4xl font-bold text-primary mb-8">Our Products</h1>
      
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4">
//           <Suspense fallback={<div>Loading categories...</div>}>
//             <CategorySelector 
//               categories={productCategories.map(cat => ({
//                 ...cat,
//                 selected: cat.name === selectedCategory.name
//               }))}
//               onSelectCategory={setSelectedCategory}
//             />
//           </Suspense>
//         </div>

//         {/* Main Content */}
//         <div className="w-full md:w-3/4">
//           <Suspense fallback={<div>Loading products...</div>}>
//             <ProductList selectedCategory={selectedCategory} />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductContent;