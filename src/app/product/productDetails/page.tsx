// pages/product/productDetails.tsx
// This page displays detailed information about a specific product, including its name, category, image, and various tabs with additional information such as overview, specifications, applications, safety, and FAQs. The data for this page is loaded dynamically based on the product name and category passed in the URL query parameters.
'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

interface Product {
  id: number;
  name: string;
  cas_number: string;
  category: string;
  description: string;
  molecular_formula: string;
  molecular_weight: string;
  einecs_number: string;
  synonyms: string[];
  purity: string;
  grade: string;
  specifications: {
    [key: string]: string | number;
  };
  applications: string[];
  industries: string[];
  packaging: {
    type: string;
    sizes: string[];
  };
  image: string;
  safety_info: {
    hazards: string[];
    handling: string;
    storage: string;
    ppe: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  certifications: string[];
}

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productName = searchParams.get('name');
      if (!productName) {
        setError('Product name is missing');
        setIsLoading(false);
        return;
      }

      try {
        const { supabase } = (await import('@/lib/utils/supabaseClient')).default();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('name', decodeURIComponent(productName))
          .single();

        if (error) throw error;

        if (data) {
          setProductData(data as Product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load product data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="src/app/product/products/page.tsx" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
          <p className="text-xl text-gray-600 mb-4">Category: {productData.category}</p>

          <div className="mb-6">
            <Image 
              src={productData.image}
              alt={productData.name}
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>

          <div className="mb-6">
            <div className="flex mb-4 border-b">
              {['overview', 'specifications', 'applications', 'safety', 'faqs'].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Product Overview</h2>
                  <p className="mb-4">{productData.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">Chemical Properties</h3>
                      <p><strong>Molecular Formula:</strong> {productData.molecularFormula}</p>
                      <p><strong>Molecular Weight:</strong> {productData.molecularWeight}</p>
                      <p><strong>CAS Number:</strong> {productData.casNumber}</p>
                      <p><strong>EINECS Number:</strong> {productData.einecsNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Other Information</h3>
                      <p><strong>Synonyms:</strong> {productData.synonyms.join(", ")}</p>
                      <p><strong>Purity:</strong> {productData.purity}</p>
                      <p><strong>Grade:</strong> {productData.grade}</p>
                    </div>
                  </div>
                </div>
              )}
  
              {activeTab === 'specifications' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Specifications</h2>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Property</th>
                        <th className="border border-gray-300 p-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(productData.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <td className="border border-gray-300 p-2"><strong>{key}</strong></td>
                          <td className="border border-gray-300 p-2">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
  
              {activeTab === 'applications' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Applications</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {productData.applications.map((app, index) => (
                      <li key={index}>{app}</li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData.industries.map((industry, index) => (
                      <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{industry}</span>
                    ))}
                  </div>
                </div>
              )}
  
              {activeTab === 'safety' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Safety Information</h2>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Hazards</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {productData.safety_info.hazards.map((hazard, index) => (
                      <li key={index}>{hazard}</li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Handling</h3>
                  <p>{productData.safety_info.handling}</p>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Storage</h3>
                  <p>{productData.safety_info.storage}</p>
                  <h3 className="text-xl font-semibold mt-4 mb-2">Personal Protective Equipment (PPE)</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {productData.safety_info.ppe.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
  
              {activeTab === 'faqs' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
                  {productData.faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl font-semibold">{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}

            {/* ... (other tab contents remain the same) ... */}

          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <p><strong>Category:</strong> {productData.category}</p>
            <p><strong>CAS Number:</strong> {productData.cas_number}</p>
            <p><strong>Industries:</strong> {productData.industries.join(", ")}</p>
            <p><strong>Packaging:</strong> {productData.packaging.type} ({productData.packaging.sizes.join(", ")})</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <ul className="list-disc pl-5">
              {productData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Request Information</h2>
            <p className="mb-4">Interested in this product? Get in touch with us for more details or to request a quote.</p>
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300">Request a Quote</button>
              <button className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition duration-300">Request a Sample</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


//version 2
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';

// // Mock product data (in a real application, this would be fetched from an API or database)
// const mockProductData = {
//     "Acetone": {
//       "name": "Acetone",
//       "casNumber": "67-64-1",
//       "category": "Organic Solvents",
//       "description": "Acetone is a colorless, volatile, flammable liquid organic compound. It is the simplest and smallest ketone compound, and is miscible with water. Known for its distinctive odor, acetone is widely used as a solvent and cleaning agent in various industries.",
//       "molecularFormula": "C3H6O",
//       "molecularWeight": "58.08 g/mol",
//       "einecsNumber": "200-662-2",
//       "synonyms": ["Propanone", "Dimethyl ketone", "2-Propanone", "β-Ketopropane"],
//       "purity": "≥99.5%",
//       "grade": "ACS Reagent Grade",
//       "specifications": {
//         "Appearance": "Clear, colorless liquid",
//         "Boiling Point": "56°C (133°F)",
//         "Melting Point": "-95°C (-139°F)",
//         "Density": "0.79 g/cm³ at 20°C",
//         "Refractive Index": "1.3588 at 20°C",
//         "Vapor Pressure": "184 mmHg at 20°C",
//         "Flash Point": "-20°C (-4°F)",
//         "Autoignition Temperature": "465°C (869°F)"
//       },
//       "applications": [
//         "Solvent for paints, varnishes, and lacquers",
//         "Cleaning agent in electronics and precision cleaning",
//         "Nail polish remover in cosmetics",
//         "Thin paint and varnish",
//         "Production of plastics and synthetic fibers",
//         "Chemical intermediate in pharmaceutical manufacturing"
//       ],
//       "industries": [
//         "Pharmaceuticals",
//         "Cosmetics",
//         "Electronics",
//         "Paints and Coatings",
//         "Plastics",
//         "Textiles"
//       ],
//       "packaging": {
//         "type": "Steel Drums",
//         "sizes": ["20 L", "200 L", "Bulk"]
//       },
//       "image": "/images/acetone.jpg",
//       "safetyInfo": {
//         "hazards": [
//           "Highly flammable liquid and vapor",
//           "Causes serious eye irritation",
//           "May cause drowsiness or dizziness",
//           "Repeated exposure may cause skin dryness or cracking"
//         ],
//         "handling": "Use in a well-ventilated area. Keep away from heat, hot surfaces, sparks, open flames, and other ignition sources. Use explosion-proof electrical equipment. Use non-sparking tools. Take precautionary measures against static discharge.",
//         "storage": "Store in a cool, dry, well-ventilated place. Keep container tightly closed. Store away from incompatible materials such as oxidizing agents, acids, and alkalis.",
//         "ppe": [
//           "Chemical safety goggles",
//           "Impervious gloves (e.g., butyl rubber, neoprene)",
//           "Protective clothing",
//           "Respiratory protection if ventilation is inadequate"
//         ]
//       },
//       "faqs": [
//         {
//           "question": "Is acetone safe for skin contact?",
//           "answer": "Brief, occasional skin contact with acetone is generally not harmful, but prolonged or repeated exposure can cause skin irritation and dryness. It's best to avoid skin contact and always use appropriate personal protective equipment when handling acetone."
//         },
//         {
//           "question": "Can acetone be shipped by air?",
//           "answer": "Acetone is classified as a dangerous good (hazardous material) for transportation. It can be shipped by air, but it's subject to strict regulations. Special packaging, labeling, and documentation are required, and there may be quantity limitations. Always consult current IATA regulations for specific requirements."
//         },
//         {
//           "question": "How should acetone waste be disposed of?",
//           "answer": "Acetone waste should be disposed of as hazardous waste in accordance with local, state, and federal regulations. It should not be poured down the drain or disposed of in regular trash. Typically, it should be collected and sent to a licensed hazardous waste disposal facility for proper treatment or incineration."
//         }
//       ],
//       "certifications": [
//         "ISO 9001:2015",
//         "REACH Registered",
//         "ACS Certified"
//       ]
//     },
//     "Ethanol": {
//       "name": "Ethanol",
//       "casNumber": "64-17-5",
//       "category": "Alcohols",
//       "description": "Ethanol, also known as ethyl alcohol or grain alcohol, is a clear, colorless liquid with a characteristic odor. It is the principal type of alcohol found in alcoholic beverages and is also widely used as a solvent and fuel.",
//       "molecularFormula": "C2H5OH",
//       "molecularWeight": "46.07 g/mol",
//       "einecsNumber": "200-578-6",
//       "synonyms": ["Ethyl alcohol", "Grain alcohol", "Alcohol", "Ethyl hydroxide"],
//       "purity": "≥99.5% (200 proof)",
//       "grade": "USP, ACS Reagent Grade",
//       "specifications": {
//         "Appearance": "Clear, colorless liquid",
//         "Boiling Point": "78.37°C (173.1°F)",
//         "Melting Point": "-114°C (-173.2°F)",
//         "Density": "0.789 g/cm³ at 20°C",
//         "Refractive Index": "1.361 at 20°C",
//         "Vapor Pressure": "44.6 mmHg at 20°C",
//         "Flash Point": "13°C (55°F)",
//         "Autoignition Temperature": "363°C (685°F)"
//       },
//       "applications": [
//         "Alcoholic beverage production",
//         "Disinfectant and antiseptic in medical settings",
//         "Solvent in various industries",
//         "Fuel and fuel additive",
//         "Chemical intermediate in organic synthesis",
//         "Personal care and cosmetic products"
//       ],
//       "industries": [
//         "Food and Beverage",
//         "Pharmaceuticals",
//         "Healthcare",
//         "Chemical Manufacturing",
//         "Automotive",
//         "Personal Care and Cosmetics",
//         "Energy"
//       ],
//       "packaging": {
//         "type": "HDPE Drums, IBC Tanks",
//         "sizes": ["20 L", "200 L", "1000 L", "Bulk"]
//       },
//       "image": "/images/ethanol.jpg",
//       "safetyInfo": {
//         "hazards": [
//           "Highly flammable liquid and vapor",
//           "Causes serious eye irritation",
//           "May cause central nervous system depression if inhaled in high concentrations",
//           "Prolonged or repeated exposure may cause liver and kidney damage"
//         ],
//         "handling": "Use in a well-ventilated area. Keep away from heat, sparks, open flames, and hot surfaces. Use explosion-proof electrical equipment. Take precautionary measures against static discharge. Avoid breathing vapors.",
//         "storage": "Store in a cool, dry, well-ventilated place. Keep container tightly closed. Store away from oxidizing agents and sources of ignition.",
//         "ppe": [
//           "Safety glasses with side shields",
//           "Chemical-resistant gloves",
//           "Protective clothing",
//           "Respiratory protection if exposure limits are exceeded"
//         ]
//       },
//       "faqs": [
//         {
//           "question": "Is ethanol the same as rubbing alcohol?",
//           "answer": "While both are alcohols, they are not the same. Rubbing alcohol typically contains isopropyl alcohol (isopropanol), not ethanol. However, some types of rubbing alcohol may contain ethanol. Always check the label for the specific composition."
//         },
//         {
//           "question": "Can ethanol be used as a fuel?",
//           "answer": "Yes, ethanol is commonly used as a biofuel. It's often blended with gasoline in various ratios, such as E10 (10% ethanol, 90% gasoline) or E85 (85% ethanol, 15% gasoline). Pure ethanol (E100) is also used as fuel in some countries, particularly Brazil."
//         },
//         {
//           "question": "How does the purity of ethanol affect its uses?",
//           "answer": "The purity of ethanol is crucial for its intended use. For instance, 200 proof (100%) ethanol is used in laboratory and industrial applications where water content must be minimized. For fuel purposes, 190 proof (95%) is often sufficient. Denatured ethanol, which contains additives to make it unfit for consumption, is used in many industrial applications."
//         }
//       ],
//       "certifications": [
//         "ISO 9001:2015",
//         "REACH Registered",
//         "Kosher Certified",
//         "Halal Certified"
//       ]
//     },
//     "Methanol": {
//       "name": "Methanol",
//       "casNumber": "67-56-1",
//       "category": "Alcohols",
//       "description": "Methanol, also known as methyl alcohol or wood alcohol, is the simplest alcohol. It's a light, volatile, colorless, flammable liquid with a distinctive odor similar to that of ethanol. Methanol is used as an antifreeze, solvent, fuel, and as a denaturant for ethanol.",
//       "molecularFormula": "CH3OH",
//       "molecularWeight": "32.04 g/mol",
//       "einecsNumber": "200-659-6",
//       "synonyms": ["Methyl alcohol", "Wood alcohol", "Carbinol", "Methylol"],
//       "purity": "≥99.8%",
//       "grade": "ACS Reagent Grade, HPLC Grade",
//       "specifications": {
//         "Appearance": "Clear, colorless liquid",
//         "Boiling Point": "64.7°C (148.5°F)",
//         "Melting Point": "-97.6°C (-143.7°F)",
//         "Density": "0.792 g/cm³ at 20°C",
//         "Refractive Index": "1.329 at 20°C",
//         "Vapor Pressure": "98 mmHg at 20°C",
//         "Flash Point": "11°C (52°F)",
//         "Autoignition Temperature": "464°C (867°F)"
//       },
//       "applications": [
//         "Antifreeze in vehicle radiators",
//         "Fuel for racing cars and model engines",
//         "Solvent in various industries",
//         "Feedstock for chemical synthesis",
//         "Wastewater denitrification",
//         "Biodiesel production"
//       ],
//       "industries": [
//         "Automotive",
//         "Energy",
//         "Chemical Manufacturing",
//         "Pharmaceuticals",
//         "Wastewater Treatment",
//         "Biodiesel Production"
//       ],
//       "packaging": {
//         "type": "Steel Drums, ISO Tanks",
//         "sizes": ["200 L", "1000 L", "Bulk"]
//       },
//       "image": "/images/methanol.jpg",
//       "safetyInfo": {
//         "hazards": [
//           "Highly flammable liquid and vapor",
//           "Toxic if swallowed, in contact with skin or if inhaled",
//           "Causes damage to organs, particularly the optic nerve and central nervous system",
//           "May cause blindness if ingested"
//         ],
//         "handling": "Use only in well-ventilated areas. Keep away from heat, sparks, open flames, and hot surfaces. Use explosion-proof electrical equipment. Avoid breathing vapors. Wash hands thoroughly after handling.",
//         "storage": "Store in a cool, dry, well-ventilated place. Keep container tightly closed. Store away from oxidizing agents and sources of ignition. Use appropriate containment to avoid environmental contamination.",
//         "ppe": [
//           "Chemical splash goggles",
//           "Face shield",
//           "Impervious gloves (e.g., butyl rubber, neoprene)",
//           "Chemical-resistant clothing",
//           "Respiratory protection if exposure limits are exceeded"
//         ]
//       },
//       "faqs": [
//         {
//           "question": "Is methanol safe to use in windshield washer fluid?",
//           "answer": "Methanol is commonly used in windshield washer fluid due to its antifreeze properties. However, it's important to handle it carefully and avoid skin contact or inhalation of vapors. Always follow the manufacturer's safety instructions and keep it out of reach of children and pets."
//         },
//         {
//           "question": "How is methanol different from ethanol?",
//           "answer": "While both are alcohols, methanol (CH3OH) has one carbon atom, while ethanol (C2H5OH) has two. Methanol is highly toxic and not suitable for consumption, unlike ethanol which is found in alcoholic beverages. Methanol is more commonly used in industrial applications and as a fuel."
//         },
//         {
//           "question": "What should I do in case of methanol exposure?",
//           "answer": "In case of skin contact, immediately wash with plenty of water. For eye contact, rinse cautiously with water for several minutes. If inhaled, remove person to fresh air. If ingested, do not induce vomiting. In all cases, seek immediate medical attention. Methanol exposure can be life-threatening."
//         }
//       ],
//       "certifications": [
//         "ISO 9001:2015",
//         "REACH Registered",
//         "IMPCA Certified"
//       ]
//     }
//   };

    
//   export default function ProductDetails() {
//     const searchParams = useSearchParams();
//     const [productData, setProductData] = useState(null);
//     const [activeTab, setActiveTab] = useState('overview');
  
//     useEffect(() => {
//       const productName = searchParams.get('name');
//       const category = searchParams.get('category');
  
//       if (productName) {
//         const product = mockProductData[decodeURIComponent(productName)];
//         if (product) {
//           setProductData({...product, category: category || product.category});
//         }
//       }
//     }, [searchParams]);
  
//     if (!productData) {
//       return <div>Loading...</div>;
//     }
  
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <Link href="/product/products" className="text-primary hover:underline mb-4 inline-block">
//           ← Back to Products
//         </Link>
  
//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="lg:w-2/3">
//             <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
//             <p className="text-xl text-gray-600 mb-4">Category: {productData.category}</p>
  
//             <div className="mb-6">
//               <Image 
//                 src={productData.image}
//                 alt={productData.name}
//                 width={600}
//                 height={400}
//                 className="rounded-lg"
//               />
//             </div>
  
//             <div className="mb-6">
//               <div className="flex mb-4 border-b">
//                 {['overview', 'specifications', 'applications', 'safety', 'faqs'].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
  
//               {activeTab === 'overview' && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-2">Product Overview</h2>
//                   <p className="mb-4">{productData.description}</p>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <h3 className="text-lg font-semibold">Chemical Properties</h3>
//                       <p><strong>Molecular Formula:</strong> {productData.molecularFormula}</p>
//                       <p><strong>Molecular Weight:</strong> {productData.molecularWeight}</p>
//                       <p><strong>CAS Number:</strong> {productData.casNumber}</p>
//                       <p><strong>EINECS Number:</strong> {productData.einecsNumber}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold">Other Information</h3>
//                       <p><strong>Synonyms:</strong> {productData.synonyms.join(", ")}</p>
//                       <p><strong>Purity:</strong> {productData.purity}</p>
//                       <p><strong>Grade:</strong> {productData.grade}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
  
//               {activeTab === 'specifications' && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-2">Specifications</h2>
//                   <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                       <tr className="bg-gray-100">
//                         <th className="border border-gray-300 p-2">Property</th>
//                         <th className="border border-gray-300 p-2">Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Object.entries(productData.specifications).map(([key, value]) => (
//                         <tr key={key}>
//                           <td className="border border-gray-300 p-2"><strong>{key}</strong></td>
//                           <td className="border border-gray-300 p-2">{value}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
  
//               {activeTab === 'applications' && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-2">Applications</h2>
//                   <ul className="list-disc pl-5 space-y-2">
//                     {productData.applications.map((app, index) => (
//                       <li key={index}>{app}</li>
//                     ))}
//                   </ul>
//                   <h3 className="text-xl font-semibold mt-4 mb-2">Industries</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {productData.industries.map((industry, index) => (
//                       <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{industry}</span>
//                     ))}
//                   </div>
//                 </div>
//               )}
  
//               {activeTab === 'safety' && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-2">Safety Information</h2>
//                   <h3 className="text-xl font-semibold mt-4 mb-2">Hazards</h3>
//                   <ul className="list-disc pl-5 space-y-2">
//                     {productData.safetyInfo.hazards.map((hazard, index) => (
//                       <li key={index}>{hazard}</li>
//                     ))}
//                   </ul>
//                   <h3 className="text-xl font-semibold mt-4 mb-2">Handling</h3>
//                   <p>{productData.safetyInfo.handling}</p>
//                   <h3 className="text-xl font-semibold mt-4 mb-2">Storage</h3>
//                   <p>{productData.safetyInfo.storage}</p>
//                   <h3 className="text-xl font-semibold mt-4 mb-2">Personal Protective Equipment (PPE)</h3>
//                   <ul className="list-disc pl-5 space-y-2">
//                     {productData.safetyInfo.ppe.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
  
//               {activeTab === 'faqs' && (
//                 <div>
//                   <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
//                   {productData.faqs.map((faq, index) => (
//                     <div key={index} className="mb-4">
//                       <h3 className="text-xl font-semibold">{faq.question}</h3>
//                       <p>{faq.answer}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
  
//           <div className="lg:w-1/3">
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
//               <h2 className="text-xl font-semibold mb-4">Product Information</h2>
//               <p><strong>Category:</strong> {productData.category}</p>
//               <p><strong>CAS Number:</strong> {productData.casNumber}</p>
//               <p><strong>Industries:</strong> {productData.industries.join(", ")}</p>
//               <p><strong>Packaging:</strong> {productData.packaging.type} ({productData.packaging.sizes.join(", ")})</p>
//             </div>
  
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
//               <h2 className="text-xl font-semibold mb-4">Certifications</h2>
//               <ul className="list-disc pl-5">
//                 {productData.certifications.map((cert, index) => (
//                   <li key={index}>{cert}</li>
//                 ))}
//               </ul>
//             </div>
  
//             <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Request Information</h2>
//               <p className="mb-4">Interested in this product? Get in touch with us for more details or to request a quote.</p>
//               <div className="space-y-2">
//                 <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300">Request a Quote</button>
//                 <button className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition duration-300">Request a Sample</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

// export default function ProductDetails() {











//version 3
//   const searchParams = useSearchParams();
//   const [productData, setProductData] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     const productName = searchParams.get('name');
//     const category = searchParams.get('category');

//     if (productName) {
//       const product = mockProductData[decodeURIComponent(productName)];
//       if (product) {
//         setProductData({...product, category: category || product.category});
//       }
//     }
//   }, [searchParams]);

//   if (!productData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link href="/product/products" className="text-primary hover:underline mb-4 inline-block">
//         ← Back to Products
//       </Link>

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3">
//           <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
//           <p className="text-xl text-gray-600 mb-4">Category: {productData.category}</p>

//           <div className="mb-6">
//             <Image 
//               src={productData.image}
//               alt={productData.name}
//               width={600}
//               height={400}
//               className="rounded-lg"
//             />
//           </div>

//           <div className="mb-6">
//             <div className="flex mb-4 border-b">
//               {['overview', 'specifications', 'applications', 'safety', 'faqs'].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {activeTab === 'overview' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Product Overview</h2>
//                 <p>{productData.description}</p>
//                 <div className="mt-4">
//                   <p><strong>Molecular Formula:</strong> {productData.molecularFormula}</p>
//                   <p><strong>Molecular Weight:</strong> {productData.molecularWeight}</p>
//                   <p><strong>Synonyms:</strong> {productData.synonyms.join(", ")}</p>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'specifications' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Specifications</h2>
//                 <ul>
//                   {Object.entries(productData.specifications).map(([key, value]) => (
//                     <li key={key}><strong>{key}:</strong> {value}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'applications' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Applications</h2>
//                 <ul>
//                   {productData.applications.map((app, index) => (
//                     <li key={index}>{app}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'safety' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Safety Information</h2>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Hazards</h3>
//                 <ul>
//                   {productData.safetyInfo.hazards.map((hazard, index) => (
//                     <li key={index}>{hazard}</li>
//                   ))}
//                 </ul>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Handling</h3>
//                 <p>{productData.safetyInfo.handling}</p>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Storage</h3>
//                 <p>{productData.safetyInfo.storage}</p>
//               </div>
//             )}

//             {activeTab === 'faqs' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
//                 {productData.faqs.map((faq, index) => (
//                   <div key={index} className="mb-4">
//                     <h3 className="text-xl font-semibold">{faq.question}</h3>
//                     <p>{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="lg:w-1/3">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
//             <h2 className="text-xl font-semibold mb-4">Product Information</h2>
//             <p><strong>Category:</strong> {productData.category}</p>
//             <p><strong>CAS Number:</strong> {productData.casNumber}</p>
//             <p><strong>Industries:</strong> {productData.industries.join(", ")}</p>
//             <p><strong>Packaging:</strong> {productData.packaging.type} ({productData.packaging.sizes.join(", ")})</p>
//           </div>

//           <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Request Information</h2>
//             <p className="mb-4">Interested in this product? Get in touch with us for more details or to request a quote.</p>
//             <div className="space-y-2">
//               <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300">Request a Quote</button>
//               <button className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition duration-300">Request a Sample</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//version 2 
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// This will be replaced with actual data fetching
// const getProductData = (productName) => {
//   // Placeholder for API call or database query
//   return {
//     name: productName,
//     casNumber: "11138-66-2",
//     category: "Food Additives",
//     description: "A description of the product...",
//     molecularFormula: "C35H49O29",
//     molecularWeight: "933.74 g/mol",
//     synonyms: ["Corn sugar gum", "E415"],
//     applications: [
//       "Thickening agent in food products",
//       "Stabilizer in cosmetics",
//       "Drilling fluid in oil industry"
//     ],
//     specifications: {
//       appearance: "White to cream-colored powder",
//       solubility: "Soluble in water",
//       pH: "6.0 - 8.0 (1% solution)",
//       viscosity: "1200 - 1600 cP (1% solution)"
//     },
//     packaging: {
//       type: "Bags",
//       sizes: ["25 kg", "500 kg"]
//     },
//     industries: ["Food and Beverage", "Cosmetics", "Oil and Gas"],
//     image: "/images/product-image.jpg",
//     safetyInfo: {
//       hazards: ["May form combustible dust concentrations in air"],
//       handling: "Handle in accordance with good industrial hygiene and safety practice.",
//       storage: "Store in a cool, dry place in tightly closed containers."
//     },
//     faqs: [
//       {
//         question: "Is this product vegan?",
//         answer: "Yes, this product is vegan and does not contain any animal-derived ingredients."
//       },
//       {
//         question: "What is the shelf life of this product?",
//         answer: "The typical shelf life is 2 years when stored properly in original unopened packaging."
//       }
//     ]
//   };
// };
// const mockProductData = {
//     "Acetone": {
//       name: "Acetone",
//       casNumber: "67-64-1",
//       category: "Organic Solvents",
//       description: "Acetone is a colorless, volatile, flammable liquid organic compound. It is the simplest and smallest ketone, and is miscible with water.",
//       molecularFormula: "C3H6O",
//       molecularWeight: "58.08 g/mol",
//       synonyms: ["Propanone", "Dimethyl ketone", "2-Propanone"],
//       applications: [
//         "Solvent in various industries",
//         "Cleaning agent in laboratories and electronics",
//         "Nail polish remover",
//         "Paint thinner"
//       ],
//       specifications: {
//         appearance: "Clear, colorless liquid",
//         boilingPoint: "56°C (133°F)",
//         meltingPoint: "-95°C (-139°F)",
//         density: "0.79 g/cm³ at 20°C"
//       },
//       packaging: {
//         type: "Drums",
//         sizes: ["20 L", "200 L"]
//       },
//       industries: ["Pharmaceuticals", "Cosmetics", "Electronics", "Paints and Coatings"],
//       image: "/images/acetone.jpg",
//       safetyInfo: {
//         hazards: ["Highly flammable", "Eye irritant", "May cause drowsiness or dizziness"],
//         handling: "Use in well-ventilated area. Keep away from heat and ignition sources.",
//         storage: "Store in a cool, dry place. Keep container tightly closed."
//       },
//       faqs: [
//         {
//           question: "Is acetone safe for skin contact?",
//           answer: "Brief, occasional contact with acetone is generally not harmful, but prolonged exposure can cause skin irritation and dryness."
//         },
//         {
//           question: "Can acetone be shipped by air?",
//           answer: "Acetone is classified as a dangerous good and is subject to strict regulations for air transport. Special packaging and documentation are required."
//         }
//       ]
//     },
//     "Ethanol": {
//       name: "Ethanol",
//       casNumber: "64-17-5",
//       category: "Alcohols",
//       description: "Ethanol, also called ethyl alcohol, is a clear, colorless liquid. It's the principal type of alcohol found in alcoholic beverages.",
//       molecularFormula: "C2H5OH",
//       molecularWeight: "46.07 g/mol",
//       synonyms: ["Ethyl alcohol", "Grain alcohol", "Drinking alcohol"],
//       applications: [
//         "Disinfectant and antiseptic",
//         "Fuel additive",
//         "Solvent in various industries",
//         "Beverage production"
//       ],
//       specifications: {
//         appearance: "Clear, colorless liquid",
//         boilingPoint: "78.37°C (173.1°F)",
//         meltingPoint: "-114°C (-173.2°F)",
//         density: "0.789 g/cm³ at 20°C"
//       },
//       packaging: {
//         type: "Drums or Tankers",
//         sizes: ["200 L", "Bulk"]
//       },
//       industries: ["Pharmaceuticals", "Food and Beverage", "Automotive", "Chemical Manufacturing"],
//       image: "/images/ethanol.jpg",
//       safetyInfo: {
//         hazards: ["Highly flammable", "May cause eye irritation", "Harmful if swallowed"],
//         handling: "Use in well-ventilated area. Avoid ingestion and prolonged exposure.",
//         storage: "Store in a cool, dry place away from sources of ignition."
//       },
//       faqs: [
//         {
//           question: "Is ethanol the same as rubbing alcohol?",
//           answer: "No, rubbing alcohol typically contains isopropyl alcohol, not ethanol. However, some rubbing alcohols may contain ethanol."
//         },
//         {
//           question: "Can ethanol be used as a fuel?",
//           answer: "Yes, ethanol is commonly used as a biofuel, often blended with gasoline in various ratios."
//         }
//       ]
//     },
//     "Methanol": {
//       name: "Methanol",
//       casNumber: "67-56-1",
//       category: "Alcohols",
//       description: "Methanol, also known as methyl alcohol, is the simplest alcohol. It's a light, volatile, colorless, flammable liquid with a distinctive odor.",
//       molecularFormula: "CH3OH",
//       molecularWeight: "32.04 g/mol",
//       synonyms: ["Methyl alcohol", "Wood alcohol", "Carbinol"],
//       applications: [
//         "Antifreeze in vehicle radiators",
//         "Fuel for racing cars and model engines",
//         "Solvent in various industries",
//         "Feedstock for chemical synthesis"
//       ],
//       specifications: {
//         appearance: "Clear, colorless liquid",
//         boilingPoint: "64.7°C (148.5°F)",
//         meltingPoint: "-97.6°C (-143.7°F)",
//         density: "0.792 g/cm³ at 20°C"
//       },
//       packaging: {
//         type: "Drums or Tankers",
//         sizes: ["200 L", "Bulk"]
//       },
//       industries: ["Automotive", "Energy", "Chemical Manufacturing", "Pharmaceuticals"],
//       image: "/images/methanol.jpg",
//       safetyInfo: {
//         hazards: ["Highly flammable", "Toxic if swallowed, inhaled, or absorbed through skin", "May cause blindness if ingested"],
//         handling: "Use in well-ventilated area. Avoid all contact. Wear protective equipment.",
//         storage: "Store in a cool, dry place. Keep container tightly closed and away from sources of ignition."
//       },
//       faqs: [
//         {
//           question: "Is methanol safe to use in windshield washer fluid?",
//           answer: "Methanol is commonly used in windshield washer fluid, but it's important to handle it carefully and avoid skin contact or inhalation of vapors."
//         },
//         {
//           question: "How is methanol different from ethanol?",
//           answer: "While both are alcohols, methanol is highly toxic and not suitable for consumption, unlike ethanol which is found in alcoholic beverages."
//         }
//       ]
//     },
//     "Isopropyl Alcohol": {
//       name: "Isopropyl Alcohol",
//       casNumber: "67-63-0",
//       category: "Alcohols",
//       description: "Isopropyl alcohol, also known as isopropanol or IPA, is a colorless, flammable chemical compound with a strong odor.",
//       molecularFormula: "C3H8O",
//       molecularWeight: "60.10 g/mol",
//       synonyms: ["Isopropanol", "2-Propanol", "Rubbing alcohol"],
//       applications: [
//         "Cleaning agent for electronics",
//         "Disinfectant in medical settings",
//         "Solvent in various industries",
//         "Automotive applications (fuel additives, de-icers)"
//       ],
//       specifications: {
//         appearance: "Clear, colorless liquid",
//         boilingPoint: "82.6°C (180.7°F)",
//         meltingPoint: "-89°C (-128.2°F)",
//         density: "0.786 g/cm³ at 20°C"
//       },
//       packaging: {
//         type: "Bottles or Drums",
//         sizes: ["1 L", "20 L", "200 L"]
//       },
//       industries: ["Electronics", "Healthcare", "Automotive", "Personal Care"],
//       image: "/images/isopropyl-alcohol.jpg",
//       safetyInfo: {
//         hazards: ["Highly flammable", "Eye irritant", "May cause drowsiness or dizziness"],
//         handling: "Use in well-ventilated area. Avoid contact with eyes and prolonged skin contact.",
//         storage: "Store in a cool, dry place. Keep container tightly closed and away from heat sources."
//       },
//       faqs: [
//         {
//           question: "Is isopropyl alcohol the same as rubbing alcohol?",
//           answer: "Yes, isopropyl alcohol is commonly referred to as rubbing alcohol, although the concentration may vary in commercial products."
//         },
//         {
//           question: "Can isopropyl alcohol be used to clean wounds?",
//           answer: "While it can be used as a disinfectant, it's generally not recommended for wound cleaning as it can damage tissue and delay healing."
//         }
//       ]
//     },
//     "Toluene": {
//       name: "Toluene",
//       casNumber: "108-88-3",
//       category: "Aromatic Hydrocarbons",
//       description: "Toluene is a clear, water-insoluble liquid with a characteristic sweet, pungent benzene-like odor. It's an aromatic hydrocarbon widely used as an industrial feedstock and solvent.",
//       molecularFormula: "C7H8",
//       molecularWeight: "92.14 g/mol",
//       synonyms: ["Methylbenzene", "Phenylmethane", "Toluol"],
//       applications: [
//         "Solvent in paints, paint thinners, and adhesives",
//         "Fuel additive to increase octane ratings",
//         "Raw material in the production of benzene and urethane",
//         "Solvent for rubber, printing ink, adhesives, lacquers, and leather tanners"
//       ],
//       specifications: {
//         appearance: "Clear, colorless liquid",
//         boilingPoint: "110.6°C (231.1°F)",
//         meltingPoint: "-95°C (-139°F)",
//         density: "0.87 g/cm³ at 20°C"
//       },
//       packaging: {
//         type: "Drums or Tankers",
//         sizes: ["200 L", "Bulk"]
//       },
//       industries: ["Paints and Coatings", "Chemical Manufacturing", "Automotive", "Printing"],
//       image: "/images/toluene.jpg",
//       safetyInfo: {
//         hazards: ["Highly flammable", "May be fatal if swallowed and enters airways", "May cause damage to organs through prolonged or repeated exposure"],
//         handling: "Use only in well-ventilated areas. Avoid breathing vapors. Wear protective gloves and eye protection.",
//         storage: "Store in a cool, well-ventilated place. Keep container tightly closed."
//       },
//       faqs: [
//         {
//           question: "Is toluene carcinogenic?",
//           answer: "Toluene is not classified as a carcinogen, but prolonged exposure can have other health effects. Always use proper safety precautions."
//         },
//         {
//           question: "Can toluene be used as a cleaning solvent?",
//           answer: "While toluene is an effective solvent, its use for general cleaning is not recommended due to its toxicity and flammability. Safer alternatives are available for most cleaning applications."
//         }
//       ]
//     }
//   };

// export default function ProductDetailPage({ params }) {
//   const [productData, setProductData] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     const data = getProductData(params.productName);
//     setProductData(data);
//   }, [params.productName]);

//   if (!productData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-2/3">
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
//             <p className="text-xl text-gray-600 mb-4">CAS Number: {productData.casNumber}</p>
//             <Image 
//               src={productData.image}
//               alt={productData.name}
//               width={600}
//               height={400}
//               className="rounded-lg"
//             />
//           </div>

//           <div className="mb-6">
//             <div className="flex mb-4 border-b">
//               {['overview', 'specifications', 'applications', 'safety', 'faqs'].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {activeTab === 'overview' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Product Overview</h2>
//                 <p>{productData.description}</p>
//                 <div className="mt-4">
//                   <p><strong>Molecular Formula:</strong> {productData.molecularFormula}</p>
//                   <p><strong>Molecular Weight:</strong> {productData.molecularWeight}</p>
//                   <p><strong>Synonyms:</strong> {productData.synonyms.join(", ")}</p>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'specifications' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Specifications</h2>
//                 <ul>
//                   {Object.entries(productData.specifications).map(([key, value]) => (
//                     <li key={key}><strong>{key}:</strong> {value}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'applications' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Applications</h2>
//                 <ul>
//                   {productData.applications.map((app, index) => (
//                     <li key={index}>{app}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {activeTab === 'safety' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Safety Information</h2>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Hazards</h3>
//                 <ul>
//                   {productData.safetyInfo.hazards.map((hazard, index) => (
//                     <li key={index}>{hazard}</li>
//                   ))}
//                 </ul>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Handling</h3>
//                 <p>{productData.safetyInfo.handling}</p>
//                 <h3 className="text-xl font-semibold mt-4 mb-2">Storage</h3>
//                 <p>{productData.safetyInfo.storage}</p>
//               </div>
//             )}

//             {activeTab === 'faqs' && (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
//                 {productData.faqs.map((faq, index) => (
//                   <div key={index} className="mb-4">
//                     <h3 className="text-xl font-semibold">{faq.question}</h3>
//                     <p>{faq.answer}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="lg:w-1/3">
//           <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
//             <h2 className="text-xl font-semibold mb-4">Product Information</h2>
//             <p><strong>Category:</strong> {productData.category}</p>
//             <p><strong>Industries:</strong> {productData.industries.join(", ")}</p>
//             <p><strong>Packaging:</strong> {productData.packaging.type} ({productData.packaging.sizes.join(", ")})</p>
//           </div>

//           <div className="bg-gray-100 p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-4">Request Information</h2>
//             <p className="mb-4">Interested in this product? Get in touch with us for more details or to request a quote.</p>
//             <div className="space-y-2">
//               <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition duration-300">Request a Quote</button>
//               <button className="w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition duration-300">Request a Sample</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }