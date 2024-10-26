// //from product page 

// // import React, { useState, useEffect, Suspense } from 'react';
// // import { useSearchParams } from 'next/navigation';
// // import Image from 'next/image';
// // import ProductCard from '@/components/productCard';

// // // ... keep the productCategories array as is ...

// // const productCategories = [
// //   {
// //     name: "Organic Chemicals",
// //     image: "/images/organic-chemicals.jpeg",
// //     products: [
// //       { name: "Acetone", cas: "67-64-1", applications: "Solvent, cleaning agent" },
// //       { name: "Ethanol", cas: "64-17-5", applications: "Disinfectant, fuel" },
// //       { name: "Methanol", cas: "67-56-1", applications: "Fuel, antifreeze" },
// //       { name: "Isopropyl Alcohol", cas: "67-63-0", applications: "Cleaning agent, solvent" },
// //       { name: "Toluene", cas: "108-88-3", applications: "Solvent, fuel additive" },
// //     ]
// //   },
// //   {
// //     name: "Inorganic Chemicals",
// //     image: "/images/inorganic-chemicals.jpg",
// //     products: [
// //       { name: "Sodium Hydroxide", cas: "1310-73-2", applications: "pH control, cleaning agent" },
// //       { name: "Hydrochloric Acid", cas: "7647-01-0", applications: "pH adjustment, metal cleaning" },
// //       { name: "Sulfuric Acid", cas: "7664-93-9", applications: "Industrial processes, batteries" },
// //       { name: "Ammonia", cas: "7664-41-7", applications: "Fertilizer production, refrigerant" },
// //       { name: "Hydrogen Peroxide", cas: "7722-84-1", applications: "Bleaching agent, disinfectant" },
// //     ]
// //   },
// //   {
// //     name: "Agro Chemicals",
// //     image: "/images/agro-chemicals.jpg",
// //     products: [
// //       { name: "Glyphosate", cas: "1071-83-6", applications: "Herbicide" },
// //       { name: "Chlorpyrifos", cas: "2921-88-2", applications: "Insecticide" },
// //       { name: "Atrazine", cas: "1912-24-9", applications: "Herbicide" },
// //       { name: "Imidacloprid", cas: "138261-41-3", applications: "Insecticide" },
// //       { name: "Malathion", cas: "121-75-5", applications: "Insecticide" },
// //     ]
// //   },
// //   {
// //     name: "Cosmetic Chemicals",
// //     image: "/images/cosmetic-chemicals.jpg",
// //     products: [
// //       { name: "Glycerin", cas: "56-81-5", applications: "Moisturizer, solvent" },
// //       { name: "Sodium Lauryl Sulfate", cas: "151-21-3", applications: "Surfactant, cleansing agent" },
// //       { name: "Titanium Dioxide", cas: "13463-67-7", applications: "UV filter, whitening agent" },
// //       { name: "Salicylic Acid", cas: "69-72-7", applications: "Exfoliant, anti-acne agent" },
// //       { name: "Tocopherol", cas: "59-02-9", applications: "Antioxidant, preservative" },
// //     ]
// //   },
// //   {
// //     name: "Construction Chemicals",
// //     image: "/images/construction-chemicals.jpg",
// //     products: [
// //       { name: "Calcium Chloride", cas: "10043-52-4", applications: "Accelerator, deicer" },
// //       { name: "Polycarboxylate Ether", cas: "37251-67-5", applications: "Superplasticizer" },
// //       { name: "Silica Fume", cas: "69012-64-2", applications: "Concrete strengthener" },
// //       { name: "Sodium Gluconate", cas: "527-07-1", applications: "Retarder, water reducer" },
// //       { name: "Triethanolamine", cas: "102-71-6", applications: "Grinding aid, plasticizer" },
// //     ]
// //   },
// //   {
// //     name: "Nutraceuticals",
// //     image: "/images/nutraceuticals.jpg",
// //     products: [
// //       { name: "Coenzyme Q10", cas: "303-98-0", applications: "Antioxidant, energy production" },
// //       { name: "L-Carnitine", cas: "541-15-1", applications: "Fat metabolism, energy production" },
// //       { name: "Omega-3 Fatty Acids", cas: "10417-94-4", applications: "Heart health, brain function" },
// //       { name: "Resveratrol", cas: "501-36-0", applications: "Antioxidant, anti-inflammatory" },
// //       { name: "Glucosamine", cas: "3416-24-8", applications: "Joint health, anti-inflammatory" },
// //     ]
// //   },
// // ];


// // function ProductList({ selectedCategory }) {
// //   return (
// //     <>
// //       <h2 className="text-2xl font-semibold mb-4">{selectedCategory.name}</h2>
// //       <div className="mb-6">
// //         <Image 
// //           src={selectedCategory.image} 
// //           alt={selectedCategory.name} 
// //           width={800} 
// //           height={400} 
// //           className="w-full h-64 object-cover rounded-lg"
// //         />
// //       </div>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {selectedCategory.products.map((product, productIndex) => (
// //           <ProductCard
// //             key={productIndex}
// //             name={product.name}
// //             cas={product.cas}
// //             applications={product.applications}
// //             image={selectedCategory.image}
// //           />
// //         ))}
// //       </div>
// //     </>
// //   );
// // }

// // function CategorySelector({ categories, onSelectCategory }) {
// //   return (
// //     <ul className="menu bg-base-200 w-full rounded-box">
// //       {categories.map((category, index) => (
// //         <li key={index}>
// //           <a 
// //             onClick={() => onSelectCategory(category)}
// //             className={category.selected ? "active" : ""}
// //           >
// //             {category.name}
// //           </a>
// //         </li>
// //       ))}
// //     </ul>
// //   );
// // }

// // function ProductContent() {
// //   const searchParams = useSearchParams();
// //   const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);

// //   useEffect(() => {
// //     const category = searchParams.get('category');
// //     if (category) {
// //       const found = productCategories.find(cat => cat.name === category);
// //       if (found) {
// //         setSelectedCategory(found);
// //       }
// //     }
// //   }, [searchParams]);

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-4xl font-bold text-primary mb-8">Our Products</h1>
      
// //       <div className="flex flex-col md:flex-row gap-8">
// //         {/* Sidebar */}
// //         <div className="w-full md:w-1/4">
// //           <Suspense fallback={<div>Loading categories...</div>}>
// //             <CategorySelector 
// //               categories={productCategories.map(cat => ({
// //                 ...cat,
// //                 selected: cat.name === selectedCategory.name
// //               }))}
// //               onSelectCategory={setSelectedCategory}
// //             />
// //           </Suspense>
// //         </div>

// //         {/* Main Content */}
// //         <div className="w-full md:w-3/4">
// //           <Suspense fallback={<div>Loading products...</div>}>
// //             <ProductList selectedCategory={selectedCategory} />
// //           </Suspense>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductContent;


// -- Create Categories table
// CREATE TABLE categories (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL UNIQUE,
//     image VARCHAR(255)
// );


// INSERT INTO categories (id, name, image) VALUES
// ('1', 'Organic Chemicals', '/images/organic-chemicals.jpg'),
// ('2', 'Inorganic Chemicals', '/images/inorganic-chemicals.jpg'),
// ('3', 'Agro Chemicals', '/images/agro-chemicals.jpg'),
// ('4', 'Cosmetic Chemicals', '/images/cosmetic-chemicals.jpg'),
// ('5', 'Construction Chemicals', '/images/construction-chemicals.jpg'),
// ('6', 'Nutraceuticals', '/images/nutraceuticals.jpg');

// -- Create Products table
// CREATE TABLE products (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     cas_number VARCHAR(20),
//     category VARCHAR(100) REFERENCES categories(name),
//     description TEXT,
//     molecular_formula VARCHAR(50),
//     molecular_weight VARCHAR(50),
//     einecs_number VARCHAR(20),
//     synonyms TEXT[],
//     purity VARCHAR(50),
//     grade VARCHAR(100),
//     specifications JSONB,
//     applications TEXT[],
//     industries TEXT[],
//     packaging JSONB,
//     image VARCHAR(255),
//     safety_info JSONB,
//     faqs JSONB,
//     certifications TEXT[]
// );



// -- INSERT INTO products (
// --     name, cas_number, category, description, molecular_formula, molecular_weight,
// --     einecs_number, synonyms, purity, grade, specifications, applications,
// --     industries, packaging, image, safety_info, faqs, certifications
// -- ) VALUES
// -- -- Organic Chemicals
// -- (
// --     'Acetone', '67-64-1', 'Organic Chemicals',
// --     'Acetone is a colorless, volatile, flammable liquid organic compound.',
// --     'C3H6O', '58.08 g/mol', '200-662-2',
// --     ARRAY['Propanone', 'Dimethyl ketone', '2-Propanone', 'β-Ketopropane'],
// --     '≥99.5%', 'ACS Reagent Grade',
// --     '{"Appearance": "Clear, colorless liquid", "Boiling Point": "56°C (133°F)"}',
// --     ARRAY['Solvent for paints', 'Cleaning agent in electronics'],
// --     ARRAY['Pharmaceuticals', 'Cosmetics', 'Electronics'],
// --     '{"type": "Steel Drums", "sizes": ["20 L", "200 L", "Bulk"]}',
// --     '/images/acetone.jpg',
// --     '{"hazards": ["Highly flammable", "Eye irritation"], "handling": "Use in a well-ventilated area"}',
// --     '[{"question": "Is acetone safe for skin contact?", "answer": "Brief contact is generally not harmful, but prolonged exposure can cause irritation."}]',
// --     ARRAY['ISO 9001:2015', 'REACH Registered']
// -- ),

// -- -- Inorganic Chemicals
// -- (
// --     'Sodium Hydroxide', '1310-73-2', 'Inorganic Chemicals',
// --     'Sodium hydroxide is a highly caustic base and alkali.',
// --     'NaOH', '40.00 g/mol', '215-185-5',
// --     ARRAY['Caustic soda', 'Lye', 'Soda lye'],
// --     '≥98%', 'Technical Grade',
// --     '{"Appearance": "White solid", "Melting Point": "318°C (604°F)"}',
// --     ARRAY['pH regulation', 'Soap manufacturing', 'Water treatment'],
// --     ARRAY['Chemical Industry', 'Textile Industry', 'Paper Industry'],
// --     '{"type": "HDPE Drums", "sizes": ["25 kg", "50 kg", "1000 kg"]}',
// --     '/images/sodium-hydroxide.jpg',
// --     '{"hazards": ["Corrosive", "Causes severe skin burns"], "handling": "Use proper protective equipment"}',
// --     '[{"question": "How should sodium hydroxide be stored?", "answer": "Store in a cool, dry place in tightly closed containers."}]',
// --     ARRAY['ISO 9001:2015', 'FDA Approved']
// -- ),

// -- -- Agro Chemicals
// -- (
// --     'Glyphosate', '1071-83-6', 'Agro Chemicals',
// --     'Glyphosate is a broad-spectrum systemic herbicide and crop desiccant.',
// --     'C3H8NO5P', '169.07 g/mol', '213-997-4',
// --     ARRAY['N-(phosphonomethyl)glycine'],
// --     '≥95%', 'Technical Grade',
// --     '{"Appearance": "White crystalline solid", "Solubility in water": "12 g/L at 25°C"}',
// --     ARRAY['Weed control', 'Crop desiccation'],
// --     ARRAY['Agriculture', 'Forestry'],
// --     '{"type": "HDPE Containers", "sizes": ["1 L", "5 L", "20 L"]}',
// --     '/images/glyphosate.jpg',
// --     '{"hazards": ["Toxic to aquatic life"], "handling": "Avoid release to the environment"}',
// --     '[{"question": "Is glyphosate safe for use around pets?", "answer": "Keep pets away from treated areas until the product has dried completely."}]',
// --     ARRAY['ISO 9001:2015', 'EPA Registered']
// -- ),

// -- -- Cosmetic Chemicals
// -- (
// --     'Sodium Laureth Sulfate', '68891-38-3', 'Cosmetic Chemicals',
// --     'Sodium Laureth Sulfate is a widely used anionic surfactant and detergent.',
// --     'CH3(CH2)11(OCH2CH2)nOSO3Na', 'Variable', '500-234-8',
// --     ARRAY['SLES', 'Sodium lauryl ether sulfate'],
// --     '≥70%', 'Cosmetic Grade',
// --     '{"Appearance": "Clear to slightly hazy liquid", "pH": "7.0-8.5"}',
// --     ARRAY['Foaming agent', 'Cleansing agent'],
// --     ARRAY['Personal Care', 'Household Products'],
// --     '{"type": "HDPE Drums", "sizes": ["25 kg", "200 kg"]}',
// --     '/images/sodium-laureth-sulfate.jpg',
// --     '{"hazards": ["May cause eye irritation"], "handling": "Avoid contact with eyes"}',
// --     '[{"question": "Is SLES safe for sensitive skin?", "answer": "It may cause irritation in some individuals with sensitive skin. Always perform a patch test."}]',
// --     ARRAY['ISO 9001:2015', 'REACH Registered', 'EcoCert Approved']
// -- ),

// -- -- Construction Chemicals
// -- (
// --     'Calcium Chloride', '10043-52-4', 'Construction Chemicals',
// --     'Calcium chloride is an inorganic compound, a salt with various applications in construction.',
// --     'CaCl2', '110.98 g/mol', '233-140-8',
// --     ARRAY['Calcium dichloride', 'E509'],
// --     '≥94%', 'Technical Grade',
// --     '{"Appearance": "White, deliquescent solid", "Melting Point": "772°C (1422°F)"}',
// --     ARRAY['Concrete accelerator', 'Dust control', 'Deicing agent'],
// --     ARRAY['Construction', 'Road Maintenance'],
// --     '{"type": "Polypropylene Bags", "sizes": ["25 kg", "1000 kg"]}',
// --     '/images/calcium-chloride.jpg',
// --     '{"hazards": ["Eye irritation", "May be harmful if swallowed"], "handling": "Wear protective gloves and eye protection"}',
// --     '[{"question": "How does calcium chloride affect concrete setting time?", "answer": "It accelerates the hydration process, reducing setting time and increasing early strength."}]',
// --     ARRAY['ISO 9001:2015', 'CE Certified']
// -- ),

// -- -- Nutraceuticals
// -- (
// --     'Ascorbic Acid', '50-81-7', 'Nutraceuticals',
// --     'Ascorbic acid, also known as Vitamin C, is an essential nutrient involved in the repair of tissue.',
// --     'C6H8O6', '176.12 g/mol', '200-066-2',
// --     ARRAY['Vitamin C', 'L-ascorbic acid'],
// --     '≥99%', 'Food Grade',
// --     '{"Appearance": "White to light-yellow crystalline powder", "Melting Point": "190-192°C"}',
// --     ARRAY['Dietary supplement', 'Food preservative'],
// --     ARRAY['Food & Beverage', 'Pharmaceuticals'],
// --     '{"type": "HDPE Bottles", "sizes": ["100 g", "500 g", "1 kg"]}',
// --     '/images/ascorbic-acid.jpg',
// --     '{"hazards": ["May cause gastrointestinal disturbances in high doses"], "handling": "Store in a cool, dry place"}',
// --     '[{"question": "What is the recommended daily intake of Vitamin C?", "answer": "The recommended daily intake varies by age and gender, generally ranging from 65-90 mg for adults."}]',
// --     ARRAY['ISO 9001:2015', 'USP', 'FDA Approved']
// -- );


// If you're looking for npm packages or plugins to help you manage and import images in your project, here are some popular options:
// If you're looking for npm packages or plugins to help you manage and import images in your project, here are some popular options:

// ### 1. **React Image Gallery**
// A flexible image gallery component for React that allows you to display images in a gallery format.

// ```bash
// npm install react-image-gallery
// ```

// **Usage Example:**
// ```javascript
// import React from 'react';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';

// const images = [
//   {
//     original: 'path/to/image1.jpg',
//     thumbnail: 'path/to/thumb1.jpg',
//   },
//   {
//     original: 'path/to/image2.jpg',
//     thumbnail: 'path/to/thumb2.jpg',
//   },
//   // ... more images
// ];

// const MyGallery = () => (
//   <ImageGallery items={images} />
// );
// ```

// ### 2. **Cloudinary**
// Cloudinary is a cloud-based service that provides an easy way to manage images and videos. You can upload images to Cloudinary and then use their URLs in your application.

// **Installation:**
// ```bash
// npm install cloudinary-react
// ```

// **Usage Example:**
// ```javascript
// import { CloudinaryContext, Image } from 'cloudinary-react';

// const MyImage = () => (
//   <CloudinaryContext cloudName="your-cloud-name">
//     <Image publicId="sample" />
//   </CloudinaryContext>
// );
// ```

// ### 3. **Next.js Image Component**
// If you're using Next.js, it has a built-in `<Image>` component that optimizes images automatically.

// **Usage Example:**
// ```javascript
// import Image from 'next/image';

// const MyImage = () => (
//   <Image
//     src="/path/to/image.jpg"
//     alt="Description"
//     width={500}
//     height={300}
//   />
// );
// ```

// ### 4. **React Lazy Load Image Component**
// This package helps you lazy load images, which can improve performance by loading images only when they are in the viewport.

// ```bash
// npm install react-lazy-load-image-component
// ```

// **Usage Example:**
// ```javascript
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// const MyImage = () => (
//   <LazyLoadImage
//     alt={'Description'}
//     height={200}
//     src={'path/to/image.jpg'} // use normal <img> attributes as props
//     width={300}
//   />
// );
// ```

// ### 5. **Image Upload Libraries**
// If you need to allow users to upload images, consider using libraries like:

// - **react-dropzone**: A simple React component for creating a dropzone for file uploads.
  
//   ```bash
//   npm install react-dropzone
//   ```

// - **react-uploady**: A powerful file upload library for React.

//   ```bash
//   npm install @rpldy/uploady
//   ```

// ### Conclusion
// Choose the package that best fits your needs based on whether you want to display images, manage uploads, or optimize images in your application. Each of these libraries has its own documentation to help you get started.