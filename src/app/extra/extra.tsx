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





// Sample enhanced report data (add this to your reportArticles)
// const sampleEnhancedReport = {
//     id: 1,
//     title: "Chemical Industry Market Analysis 2024",
//     excerpt: "Comprehensive analysis of global chemical industry trends...",
//     date: "2024-01-15",
//     author: {
//       id: "auth-001",
//       name: "Dr. Sarah Chen",
//       role: "Lead Market Analyst",
//       image: "/api/placeholder/40/40",
//       department: "Market Research"
//     },
//     image: "/api/placeholder/600/400",
//     tags: ["Market Analysis", "Industry Trends", "Global Markets"],
//     category: "Market Research",
//     downloadUrl: "/reports/chemical-industry-analysis-2024.pdf",
//     readTime: "15 min read",
//     stats: {
//       views: 1234,
//       downloads: 567,
//       likes: 89,
//       shares: 45
//     },
//     metadata: {
//       fileFormat: "PDF",
//       pageCount: 45,
//       lastUpdated: "2024-02-15",
//       version: "2.1",
//       language: "English",
//       fileSize: "4.2 MB"
//     },
//     status: "trending",
//     access: "public",
//     citations: {
//       apa: "Chen, S. (2024). Chemical Industry Market Analysis 2024...",
//       mla: "Chen, S. (2024). Chemical Industry Market Analysis 2024...",
//       chicago: "Chen, S. (2024). Chemical Industry Market Analysis 2024..."
//     }
//   };

  

// // Sample reports data (keeping your existing reports)
// const reportArticles: Record<string, Report> = {
//     'report-1': {
//       id: "market-analysis-2024",
//       title: "Chemical Industry Market Analysis 2024-2025: Post-Pandemic Recovery & Regional Growth Patterns",
//       excerpt: "Comprehensive analysis of the $4.7 trillion global chemical industry, including detailed regional forecasts, supply chain resilience strategies, and emerging market opportunities in specialty chemicals. Features insights from 200+ industry leaders and econometric modeling of key growth sectors.",
//       date: "2024-01-15",
//       author: {
//         id: "auth-001",
//         name: "Dr. Sarah Chen, Ph.D.",
//         role: "Principal Market Analyst",
//         image: "/api/placeholder/40/40",
//         department: "Market Research",
//         credentials: ["Ph.D. Chemical Engineering, MIT", "MBA, INSEAD"],
//         expertise: ["Market Analysis", "Strategic Planning", "Asian Markets"],
//         publications: 34
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Market Analysis",
//         "Industry Trends",
//         "Global Markets",
//         "Supply Chain",
//         "Specialty Chemicals",
//         "Regional Analysis"
//       ],
//       category: "Market Research",
//       downloadUrl: "/reports/chemical-industry-analysis-2024-2025.pdf",
//       readTime: "2.5 hours",
//       highlights: [
//         "Analysis of 17 key chemical segments across 6 regions",
//         "5-year growth projections with quarterly milestones",
//         "Impact assessment of new environmental regulations",
//         "Specialty chemicals market opportunity analysis",
//         "Competitive landscape analysis of top 50 global players"
//       ],
//       stats: {
//         views: 23567,
//         downloads: 4892,
//         likes: 1245,
//         shares: 892,
//         citations: 127,
//         comments: 234
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 267,
//         lastUpdated: "2024-02-15",
//         version: "3.2",
//         language: "English",
//         fileSize: "24.7 MB",
//         tables: 45,
//         figures: 68,
//         references: 189
//       },
//       status: "trending",
//       access: "premium",
//       pricing: {
//         standard: 4999,
//         enterprise: 12999,
//         academic: 1499
//       }
//     },
//     'report-2': {
//       id: "green-chemistry-2024",
//       title: "Sustainable Chemical Manufacturing 2024: ESG Implementation & Carbon Reduction Strategies",
//       excerpt: "In-depth analysis of sustainable practices in chemical manufacturing, featuring case studies from 75 leading companies achieving significant emissions reductions. Includes detailed ROI analysis of green technologies and regulatory compliance roadmaps.",
//       date: "2024-02-01",
//       author: {
//         id: "auth-002",
//         name: "Dr. John Smith",
//         role: "Head of Sustainability Research",
//         image: "/api/placeholder/40/40",
//         department: "Environmental",
//         credentials: [
//           "Ph.D. Environmental Engineering, Stanford",
//           "Certified Sustainability Professional"
//         ],
//         expertise: ["Green Chemistry", "Carbon Reduction", "ESG Integration"],
//         publications: 28
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Sustainability",
//         "ESG",
//         "Green Chemistry",
//         "Carbon Reduction",
//         "Clean Technology"
//       ],
//       category: "Environmental",
//       downloadUrl: "/reports/sustainability-report-2024.pdf",
//       readTime: "3 hours",
//       highlights: [
//         "Analysis of 75 successful sustainability implementations",
//         "Carbon reduction strategies with cost-benefit analysis",
//         "ESG compliance frameworks and metrics",
//         "Green technology ROI case studies",
//         "Regulatory compliance roadmap 2024-2030"
//       ],
//       stats: {
//         views: 18934,
//         downloads: 3567,
//         likes: 892,
//         shares: 445,
//         citations: 89,
//         comments: 156
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 312,
//         lastUpdated: "2024-02-10",
//         version: "2.3",
//         language: "English",
//         fileSize: "28.5 MB",
//         tables: 52,
//         figures: 87,
//         references: 234
//       },
//       status: "featured",
//       access: "premium",
//       methodology: {
//         researchPeriod: "2023-Q2 to 2024-Q1",
//         companiesAnalyzed: 75,
//         expertInterviews: 45,
//         casestudies: 12,
//         dataPoints: "50,000+"
//       }
//     },
//     'report-3': {
//       id: "tech-innovation-2024",
//       title: "Digital Transformation in Chemical Processing: AI, IoT & Industry 4.0 Implementation Guide",
//       excerpt: "Comprehensive analysis of emerging technologies in chemical processing, featuring practical implementation guides, ROI analysis, and real-world case studies from early adopters. Includes detailed technical specifications and integration frameworks.",
//       date: "2024-02-15",
//       author: {
//         id: "auth-003",
//         name: "Dr. Emily Johnson",
//         role: "Director of Technology Research",
//         image: "/api/placeholder/40/40",
//         department: "Technology",
//         credentials: [
//           "Ph.D. Process Engineering, UC Berkeley",
//           "MS Computer Science, Georgia Tech"
//         ],
//         expertise: ["AI/ML", "Process Optimization", "Industry 4.0"],
//         patents: 5,
//         publications: 41
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Digital Transformation",
//         "Industry 4.0",
//         "AI/ML",
//         "IoT",
//         "Process Optimization"
//       ],
//       category: "Technology",
//       downloadUrl: "/reports/emerging-tech-2024.pdf",
//       readTime: "4 hours",
//       highlights: [
//         "Comprehensive AI/ML implementation frameworks",
//         "IoT integration strategies for chemical plants",
//         "Real-time process optimization case studies",
//         "Cost-benefit analysis of digital transformations",
//         "Security and data governance frameworks"
//       ],
//       stats: {
//         views: 15678,
//         downloads: 2893,
//         likes: 678,
//         shares: 445,
//         citations: 156,
//         comments: 234
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 423,
//         lastUpdated: "2024-02-20",
//         version: "2.1",
//         language: "English",
//         fileSize: "35.8 MB",
//         tables: 67,
//         figures: 92,
//         references: 278,
//         technicalDiagrams: 45
//       },
//       status: "trending",
//       access: "enterprise",
//       pricing: {
//         standard: 5999,
//         enterprise: 14999,
//         academic: 1999
//       }
//     },
//       'report-4': {
//         id: "regulatory-compliance-2024",
//         title: "Global Chemical Regulatory Compliance Guide 2024: REACH, TSCA & International Standards",
//         excerpt: "Authoritative guide to chemical industry regulations across major markets, featuring compliance frameworks, registration procedures, and risk mitigation strategies. Includes detailed analysis of recent regulatory changes and their impact on global trade.",
//         date: "2024-03-01",
//         author: {
//           id: "auth-004",
//           name: "Dr. Michael Brown, J.D.",
//           role: "Chief Regulatory Affairs Officer",
//           image: "/api/placeholder/40/40",
//           department: "Regulatory",
//           credentials: [
//             "Ph.D. Chemistry, Harvard University",
//             "J.D. Environmental Law, Yale",
//             "Certified Regulatory Affairs Professional"
//           ],
//           expertise: ["Chemical Regulation", "International Trade", "Risk Assessment"],
//           publications: 23,
//           committees: ["EPA Advisory Board", "REACH Expert Panel"]
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Regulatory Compliance",
//           "REACH",
//           "TSCA",
//           "Risk Assessment",
//           "International Trade"
//         ],
//         category: "Regulatory",
//         downloadUrl: "/reports/regulatory-guide-2024.pdf",
//         readTime: "5 hours",
//         highlights: [
//           "Complete REACH 2024 compliance framework",
//           "TSCA registration procedures and updates",
//           "Comparative analysis of global regulations",
//           "Risk assessment methodologies",
//           "Cost of compliance analysis across regions"
//         ],
//         stats: {
//           views: 25678,
//           downloads: 6234,
//           likes: 1567,
//           shares: 892,
//           citations: 234,
//           comments: 345
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 478,
//           lastUpdated: "2024-03-05",
//           version: "4.1",
//           language: "English",
//           fileSize: "42.5 MB",
//           tables: 78,
//           figures: 56,
//           references: 312,
//           legalCitations: 145
//         },
//         status: "featured",
//         access: "enterprise",
//         pricing: {
//           standard: 6999,
//           enterprise: 15999,
//           academic: 2499
//         }
//       },
//       'report-5': {
//         id: "specialty-chemicals-2024",
//         title: "Specialty Chemicals Market Analysis 2024-2030: High-Growth Segments & Regional Opportunities",
//         excerpt: "Strategic analysis of the $800+ billion specialty chemicals market, featuring segment-wise growth projections, competitive landscape analysis, and emerging application opportunities. Includes detailed porter's five forces analysis for key segments.",
//         date: "2024-03-10",
//         author: {
//           id: "auth-005",
//           name: "Dr. Olivia Wilson",
//           role: "Principal Market Analyst",
//           image: "/api/placeholder/40/40",
//           department: "Market Research",
//           credentials: [
//             "Ph.D. Industrial Chemistry, ETH Zurich",
//             "MBA, London Business School"
//           ],
//           expertise: ["Specialty Chemicals", "Market Analysis", "Product Strategy"],
//           publications: 31,
//           industryExperience: 15
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Specialty Chemicals",
//           "Market Analysis",
//           "Growth Opportunities",
//           "Product Strategy"
//         ],
//         category: "Market Research",
//         downloadUrl: "/reports/specialty-chemicals-2024.pdf",
//         readTime: "3.5 hours",
//         highlights: [
//           "Analysis of 25 high-growth segments",
//           "Regional market opportunity assessment",
//           "Competitive landscape analysis",
//           "Technology adoption trends",
//           "End-user industry demand analysis"
//         ],
//         stats: {
//           views: 19567,
//           downloads: 4123,
//           likes: 934,
//           shares: 567,
//           citations: 178,
//           comments: 245
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 356,
//           lastUpdated: "2024-03-15",
//           version: "2.3",
//           language: "English",
//           fileSize: "31.2 MB",
//           tables: 62,
//           figures: 84,
//           references: 245
//         },
//         status: "trending",
//         access: "premium"
//       },
//       'report-6': {
//         id: "green-chemistry-innovation",
//         title: "Innovations in Green Chemistry 2024: Sustainable Solutions & Circular Economy",
//         excerpt: "Comprehensive analysis of breakthrough innovations in green chemistry, featuring novel synthesis routes, bio-based alternatives, and circular economy implementations. Includes technology readiness assessments and commercialization roadmaps.",
//         date: "2024-03-20",
//         author: {
//           id: "auth-006",
//           name: "Dr. David Lee",
//           role: "Head of Green Chemistry Research",
//           image: "/api/placeholder/40/40",
//           department: "Environmental",
//           credentials: [
//             "Ph.D. Green Chemistry, Yale University",
//             "Green Chemistry Design Award Winner"
//           ],
//           expertise: ["Sustainable Synthesis", "Circular Economy", "Bio-based Materials"],
//           publications: 45,
//           patents: 8
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Green Chemistry",
//           "Sustainability",
//           "Circular Economy",
//           "Bio-based Materials"
//         ],
//         category: "Environmental",
//         downloadUrl: "/reports/green-chemistry-innovation-2024.pdf",
//         readTime: "4 hours",
//         highlights: [
//           "50+ innovative green chemistry solutions",
//           "Circular economy implementation cases",
//           "Bio-based materials development",
//           "Commercial viability assessment",
//           "Patent landscape analysis"
//         ],
//         stats: {
//           views: 16789,
//           downloads: 3567,
//           likes: 878,
//           shares: 445,
//           citations: 189,
//           comments: 167
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 389,
//           lastUpdated: "2024-03-25",
//           version: "2.2",
//           language: "English",
//           fileSize: "33.5 MB",
//           tables: 58,
//           figures: 92,
//           references: 267,
//           patentCitations: 145
//         },
//         status: "featured",
//         access: "premium"
//       },
//       'report-7': {
//         id: "advanced-materials-2024",
//         title: "Advanced Materials & Nanotechnology in Chemical Industry 2024-2030",
//         excerpt: "Strategic analysis of advanced materials market opportunities, featuring emerging applications in nanomaterials, smart polymers, and composites. Includes technical feasibility studies, commercialization pathways, and patent analysis of 1,200+ innovations.",
//         date: "2024-04-01",
//         author: {
//           id: "auth-007",
//           name: "Dr. Elena Rodriguez",
//           role: "Principal Materials Scientist",
//           image: "/api/placeholder/40/40",
//           department: "Advanced Materials",
//           credentials: [
//             "Ph.D. Materials Science, University of Cambridge",
//             "MSc Nanotechnology, Imperial College London"
//           ],
//           expertise: ["Nanomaterials", "Smart Polymers", "Material Characterization"],
//           publications: 52,
//           patents: 11,
//           researchGrants: "$8.5M+"
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Advanced Materials",
//           "Nanotechnology",
//           "Smart Polymers",
//           "Composites"
//         ],
//         category: "R&D",
//         downloadUrl: "/reports/advanced-materials-2024.pdf",
//         readTime: "4.5 hours",
//         highlights: [
//           "Analysis of 200+ emerging materials",
//           "Patent landscape analysis",
//           "Application-specific market sizing",
//           "Technical feasibility studies",
//           "Commercialization roadmaps"
//         ],
//         stats: {
//           views: 17845,
//           downloads: 3892,
//           likes: 945,
//           shares: 534,
//           citations: 223,
//           comments: 178
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 412,
//           lastUpdated: "2024-04-05",
//           version: "2.4",
//           language: "English",
//           fileSize: "38.7 MB",
//           tables: 73,
//           figures: 98,
//           references: 289,
//           patentCitations: 167
//         },
//         status: "trending",
//         access: "enterprise",
//         pricing: {
//           standard: 5499,
//           enterprise: 13999,
//           academic: 1899
//         }
//       },
//       'report-8': {
//         id: "supply-chain-optimization",
//         title: "Chemical Industry Supply Chain Optimization 2024: Digital Integration & Resilience",
//         excerpt: "Comprehensive guide to modern chemical supply chain management, featuring digital twin implementations, blockchain integration, and resilience strategies. Includes 25 detailed case studies from leading chemical companies.",
//         date: "2024-04-15",
//         author: {
//           id: "auth-008",
//           name: "Dr. Marcus Chen",
//           role: "Global Supply Chain Director",
//           image: "/api/placeholder/40/40",
//           department: "Supply Chain",
//           credentials: [
//             "Ph.D. Operations Research, Georgia Tech",
//             "Six Sigma Black Belt",
//             "CSCP Certified"
//           ],
//           expertise: ["Supply Chain Optimization", "Digital Integration", "Risk Management"],
//           implementations: 15,
//           industryAwards: 3
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Supply Chain",
//           "Digital Integration",
//           "Risk Management",
//           "Blockchain"
//         ],
//         category: "Operations",
//         downloadUrl: "/reports/supply-chain-optimization-2024.pdf",
//         readTime: "3.5 hours",
//         highlights: [
//           "Digital twin implementation frameworks",
//           "Blockchain integration strategies",
//           "Risk mitigation methodologies",
//           "Real-time optimization tools",
//           "Cost reduction case studies"
//         ],
//         stats: {
//           views: 16234,
//           downloads: 3567,
//           likes: 856,
//           shares: 478,
//           citations: 167,
//           comments: 198
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 345,
//           lastUpdated: "2024-04-20",
//           version: "2.1",
//           language: "English",
//           fileSize: "29.5 MB",
//           tables: 56,
//           figures: 82,
//           references: 234,
//           caseStudies: 25
//         },
//         status: "featured",
//         access: "premium"
//       },
//       'report-9': {
//         id: "plant-safety-2024",
//         title: "Chemical Plant Safety & Risk Management 2024: Best Practices & Digital Solutions",
//         excerpt: "Essential guide to chemical plant safety featuring AI-powered risk prediction, IoT safety monitoring systems, and emergency response protocols. Includes analysis of 150 incident case studies and preventive strategies.",
//         date: "2024-04-20",
//         author: {
//           id: "auth-009",
//           name: "Dr. Robert Williams",
//           role: "Head of Process Safety",
//           image: "/api/placeholder/40/40",
//           department: "Safety",
//           credentials: [
//             "Ph.D. Process Safety, Texas A&M",
//             "CSP Certified",
//             "NEBOSH International Diploma"
//           ],
//           expertise: ["Process Safety", "Risk Assessment", "Emergency Response"],
//           investigations: 75,
//           safetyPrograms: 30
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Plant Safety",
//           "Risk Management",
//           "Emergency Response",
//           "Digital Safety"
//         ],
//         category: "Safety",
//         downloadUrl: "/reports/plant-safety-2024.pdf",
//         readTime: "5 hours",
//         highlights: [
//           "AI-based risk prediction models",
//           "IoT safety monitoring systems",
//           "Emergency response protocols",
//           "Incident investigation methodologies",
//           "Safety culture development"
//         ],
//         stats: {
//           views: 22456,
//           downloads: 5678,
//           likes: 1234,
//           shares: 789,
//           citations: 234,
//           comments: 345
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 467,
//           lastUpdated: "2024-04-25",
//           version: "3.2",
//           language: "English",
//           fileSize: "41.2 MB",
//           tables: 85,
//           figures: 112,
//           references: 278,
//           caseStudies: 150
//         },
//         status: "trending",
//         access: "enterprise"
//       },
//       'report-10': {
//         id: "pharma-chemicals-2024",
//         title: "Pharmaceutical Chemicals Market Analysis 2024-2030: Innovation & Growth Opportunities",
//         excerpt: "Strategic analysis of the $180+ billion pharmaceutical chemicals market, featuring segment-wise projections, regulatory compliance frameworks, and emerging therapy areas. Includes analysis of 300+ APIs and intermediates.",
//         date: "2024-05-01",
//         author: {
//           id: "auth-010",
//           name: "Dr. Sarah Anderson",
//           role: "Pharmaceutical Industry Analyst",
//           image: "/api/placeholder/40/40",
//           department: "Market Research",
//           credentials: [
//             "Ph.D. Medicinal Chemistry, Stanford",
//             "MBA, INSEAD",
//             "RAC-Global Certified"
//           ],
//           expertise: ["Pharma Markets", "Drug Development", "Regulatory Strategy"],
//           publications: 38,
//           marketReports: 45
//         },
//         image: "/api/placeholder/600/400",
//         tags: [
//           "Pharmaceutical",
//           "APIs",
//           "Drug Development",
//           "Market Analysis"
//         ],
//         category: "Market Research",
//         downloadUrl: "/reports/pharma-chemicals-2024.pdf",
//         readTime: "4.5 hours",
//         highlights: [
//           "Analysis of 300+ APIs & intermediates",
//           "Regulatory compliance frameworks",
//           "Emerging therapy areas analysis",
//           "Cost optimization strategies",
//           "Supply chain security measures"
//         ],
//         stats: {
//           views: 19876,
//           downloads: 4567,
//           likes: 1123,
//           shares: 678,
//           citations: 245,
//           comments: 189
//         },
//         metadata: {
//           fileFormat: "PDF",
//           pageCount: 434,
//           lastUpdated: "2024-05-05",
//           version: "2.3",
//           language: "English",
//           fileSize: "37.8 MB",
//           tables: 78,
//           figures: 95,
//           references: 267,
//           marketModels: 45
//         },
//         status: "featured",
//         access: "premium"
//       },
//     'report-11': {
//       id: "battery-materials-2024",
//       title: "Battery Materials Market 2024-2030: Next-Generation Chemistry & Manufacturing Innovation",
//       excerpt: "Strategic analysis of the $45B+ battery materials market, featuring detailed assessments of advanced cathode/anode materials, solid-state electrolytes, and manufacturing innovations. Includes technical evaluations of emerging battery chemistries and supply chain analysis.",
//       date: "2024-05-10",
//       author: {
//         id: "auth-011",
//         name: "Dr. James Park",
//         role: "Senior Battery Technology Analyst",
//         image: "/api/placeholder/40/40",
//         department: "Energy Materials",
//         credentials: [
//           "Ph.D. Materials Science, MIT",
//           "MS Electrochemistry, Seoul National University"
//         ],
//         expertise: ["Battery Materials", "Energy Storage", "Manufacturing Processes"],
//         publications: 43,
//         patents: 7,
//         industryCollaborations: 12
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Battery Materials",
//         "Energy Storage",
//         "Manufacturing",
//         "Supply Chain"
//       ],
//       category: "Energy",
//       downloadUrl: "/reports/battery-materials-2024.pdf",
//       readTime: "4 hours",
//       highlights: [
//         "Analysis of next-gen battery chemistries",
//         "Manufacturing cost optimization",
//         "Supply chain resilience strategies",
//         "Performance benchmarking studies",
//         "Sustainability assessments"
//       ],
//       stats: {
//         views: 18934,
//         downloads: 4123,
//         likes: 967,
//         shares: 534,
//         citations: 189,
//         comments: 156
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 389,
//         lastUpdated: "2024-05-15",
//         version: "2.4",
//         language: "English",
//         fileSize: "35.6 MB",
//         tables: 64,
//         figures: 92,
//         references: 245,
//         technicalDiagrams: 38
//       },
//       status: "trending",
//       access: "enterprise",
//       pricing: {
//         standard: 5999,
//         enterprise: 14999,
//         academic: 1999
//       }
//     },
//     'report-12': {
//       id: "water-treatment-2024",
//       title: "Industrial Water Treatment Chemicals 2024: Innovation in Sustainability & Efficiency",
//       excerpt: "Comprehensive analysis of the $35B water treatment chemicals market, featuring emerging treatment technologies, regulatory compliance strategies, and sustainability initiatives. Includes case studies from 50 major industrial installations.",
//       date: "2024-05-15",
//       author: {
//         id: "auth-012",
//         name: "Dr. Lisa Martinez",
//         role: "Water Technology Specialist",
//         image: "/api/placeholder/40/40",
//         department: "Environmental Solutions",
//         credentials: [
//           "Ph.D. Environmental Engineering, UC Berkeley",
//           "Professional Environmental Engineer",
//           "Water Treatment Specialist Certification"
//         ],
//         expertise: ["Water Treatment", "Process Optimization", "Environmental Compliance"],
//         implementations: 25,
//         publications: 31
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Water Treatment",
//         "Sustainability",
//         "Process Optimization",
//         "Environmental"
//       ],
//       category: "Environmental",
//       downloadUrl: "/reports/water-treatment-2024.pdf",
//       readTime: "3.5 hours",
//       highlights: [
//         "Advanced treatment technology analysis",
//         "Regulatory compliance frameworks",
//         "Sustainability metrics & benchmarks",
//         "Cost optimization strategies",
//         "Implementation case studies"
//       ],
//       stats: {
//         views: 15678,
//         downloads: 3456,
//         likes: 789,
//         shares: 445,
//         citations: 167,
//         comments: 198
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 356,
//         lastUpdated: "2024-05-20",
//         version: "2.2",
//         language: "English",
//         fileSize: "31.2 MB",
//         tables: 58,
//         figures: 75,
//         references: 223,
//         caseStudies: 50
//       },
//       status: "featured",
//       access: "premium"
//     },
//     'report-13': {
//       id: "electronic-chemicals-2024",
//       title: "Electronic Chemicals & Semiconductor Materials 2024-2030: Next-Gen Manufacturing & Supply Chain Security",
//       excerpt: "Strategic analysis of the $65B electronic chemicals market, featuring ultra-high purity materials, advanced manufacturing processes, and supply chain security measures. Includes detailed analysis of emerging semiconductor technologies.",
//       date: "2024-06-01",
//       author: {
//         id: "auth-013",
//         name: "Dr. Kevin Zhang",
//         role: "Principal Semiconductor Analyst",
//         image: "/api/placeholder/40/40",
//         department: "Electronic Materials",
//         credentials: [
//           "Ph.D. Chemical Engineering, Stanford",
//           "MS Semiconductor Physics, Tsinghua University"
//         ],
//         expertise: ["Semiconductor Materials", "High-Purity Chemistry", "Process Integration"],
//         publications: 47,
//         patents: 9,
//         industryAwards: 3
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Electronic Chemicals",
//         "Semiconductors",
//         "High-Purity Materials",
//         "Manufacturing"
//       ],
//       category: "Electronics",
//       downloadUrl: "/reports/electronic-chemicals-2024.pdf",
//       readTime: "4.5 hours",
//       highlights: [
//         "Ultra-high purity material analysis",
//         "Advanced process technologies",
//         "Supply chain security strategies",
//         "Contamination control methods",
//         "Cost optimization frameworks"
//       ],
//       stats: {
//         views: 17845,
//         downloads: 3987,
//         likes: 876,
//         shares: 534,
//         citations: 198,
//         comments: 167
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 412,
//         lastUpdated: "2024-06-05",
//         version: "2.3",
//         language: "English",
//         fileSize: "36.8 MB",
//         tables: 67,
//         figures: 89,
//         references: 256,
//         technicalDiagrams: 45
//       },
//       status: "trending",
//       access: "enterprise"
//     },
//     'report-14': {
//       id: "agrochem-2024",
//       title: "Agricultural Chemicals & Food Security 2024: Sustainable Solutions & Market Dynamics",
//       excerpt: "Comprehensive analysis of the $250B agricultural chemicals market, featuring sustainable crop protection solutions, precision agriculture technologies, and food security strategies. Includes regional market analysis and regulatory frameworks.",
//       date: "2024-06-10",
//       author: {
//         id: "auth-014",
//         name: "Dr. Thomas Anderson",
//         role: "Head of Agrochemical Research",
//         image: "/api/placeholder/40/40",
//         department: "Agricultural Solutions",
//         credentials: [
//           "Ph.D. Agricultural Chemistry, Wageningen University",
//           "MS Crop Science, Cornell University"
//         ],
//         expertise: ["Crop Protection", "Sustainable Agriculture", "Food Security"],
//         publications: 35,
//         fieldTrials: 200,
//         patents: 5
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Agricultural Chemicals",
//         "Food Security",
//         "Sustainability",
//         "Crop Protection"
//       ],
//       category: "Agriculture",
//       downloadUrl: "/reports/agricultural-chemicals-2024.pdf",
//       readTime: "4 hours",
//       highlights: [
//         "Sustainable agriculture solutions",
//         "Precision farming technologies",
//         "Regional market analysis",
//         "Regulatory compliance frameworks",
//         "Environmental impact assessments"
//       ],
//       stats: {
//         views: 16789,
//         downloads: 3678,
//         likes: 845,
//         shares: 467,
//         citations: 178,
//         comments: 156
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 378,
//         lastUpdated: "2024-06-15",
//         version: "2.2",
//         language: "English",
//         fileSize: "33.5 MB",
//         tables: 62,
//         figures: 85,
//         references: 234,
//         caseStudies: 40
//       },
//       status: "featured",
//       access: "premium"
//     },
//     'report-15': {
//       id: "ma-chemicals-2024",
//       title: "Chemical Industry M&A Landscape 2024: Strategic Analysis & Deal-Making Trends",
//       excerpt: "Strategic analysis of global chemical industry M&A activities, featuring deal valuations, integration strategies, and market consolidation trends. Includes detailed analysis of 100+ major transactions and future outlook.",
//       date: "2024-06-15",
//       author: {
//         id: "auth-015",
//         name: "Dr. Michael Thompson",
//         role: "Chief Industry Strategist",
//         image: "/api/placeholder/40/40",
//         department: "Strategic Research",
//         credentials: [
//           "Ph.D. Economics, London School of Economics",
//           "MBA, Harvard Business School",
//           "CFA Charterholder"
//         ],
//         expertise: ["M&A Strategy", "Industry Consolidation", "Value Creation"],
//         transactions: "$50B+",
//         publications: 28
//       },
//       image: "/api/placeholder/600/400",
//       tags: [
//         "Mergers & Acquisitions",
//         "Industry Strategy",
//         "Deal Analysis",
//         "Market Consolidation"
//       ],
//       category: "Strategy",
//       downloadUrl: "/reports/chemical-ma-2024.pdf",
//       readTime: "3.5 hours",
//       highlights: [
//         "Global M&A trend analysis",
//         "Deal valuation frameworks",
//         "Integration strategy assessment",
//         "Synergy realization cases",
//         "Regional market dynamics"
//       ],
//       stats: {
//         views: 15678,
//         downloads: 3456,
//         likes: 767,
//         shares: 423,
//         citations: 156,
//         comments: 189
//       },
//       metadata: {
//         fileFormat: "PDF",
//         pageCount: 345,
//         lastUpdated: "2024-06-20",
//         version: "2.1",
//         language: "English",
//         fileSize: "29.8 MB",
//         tables: 54,
//         figures: 78,
//         references: 212,
//         dealAnalyses: 100
//       },
//       status: "new",
//       access: "enterprise",
//       pricing: {
//         standard: 4999,
//         enterprise: 12999,
//         academic: 1499
//       }
//     }
//   };