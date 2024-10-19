
// Copy code
'use client';
import React from 'react';

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-8">Coming Soon</h1>
    </div>
  );
}




// 'use client';
// import React from 'react';
// import ArticleList from '@/components/ArticleList';
// import NewsletterSignup from '@/components/newslettersignup';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";

// export default function NewsletterPage() {
//   const handleSubscribe = async (email: string) => {
//     try {
//       const response = await fetch('/api/send-newsletter-welcome', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send welcome email');
//       }

//       const data = await response.json();
//       console.log('Welcome email sent successfully:', data);
//     } catch (error) {
//       console.error('Error in handleSubscribe:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-primary mb-8">Chemical Industry Insights</h1>
      
//       {/* <div className="mb-12">
//         <Image
//           src="/images/newsletter-hero.jpg"
//           alt="Chemical Industry Newsletter"
//           width={1200}
//           height={400}
//           className="rounded-lg shadow-lg"
//         />
//       </div> */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         <div className="md:col-span-2">
//           <ArticleList />
//         </div>
//         <div className="md:col-span-1">
//           <div className="bg-base-200 p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Featured Content</h2>
//             <ul className="space-y-4">
//               <li>
//                 <h3 className="font-semibold">Industry Trends 2023</h3>
//                 <p className="text-sm text-gray-600">Explore the latest trends shaping the chemical industry.</p>
//                 <Button variant="link" size="sm" className="mt-2">Read More</Button>
//               </li>
//               <li>
//                 <h3 className="font-semibold">Sustainability Report</h3>
//                 <p className="text-sm text-gray-600">Our commitment to sustainable practices and green chemistry.</p>
//                 <Button variant="link" size="sm" className="mt-2">Read More</Button>
//               </li>
//               <li>
//                 <h3 className="font-semibold">Market Analysis</h3>
//                 <p className="text-sm text-gray-600">In-depth analysis of global chemical markets and forecasts.</p>
//                 <Button variant="link" size="sm" className="mt-2">Read More</Button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <NewsletterSignup handleSubscribe={handleSubscribe} />

//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-4">About Our Newsletter</h2>
//         <p className="mb-4">
//           The KSY Group Chemical Industry Insights newsletter is your premier source for staying up-to-date with the latest developments in the global chemical sector. Our team of expert analysts and industry veterans curate content that matters most to chemical professionals, business leaders, and decision-makers.
//         </p>
//         <p className="mb-4">
//           Each issue delivers a comprehensive overview of market trends, technological advancements, regulatory updates, and strategic insights that can help shape your business decisions and keep you ahead of the curve.
//         </p>
//         {/* <div className="bg-base-200 p-6 rounded-lg">
//           <h3 className="text-xl font-semibold mb-2">Editorial Team</h3>
//           <p><strong>Editor-in-Chief:</strong> Dr. Emily Chen, Ph.D. in Chemical Engineering</p>
//           <p><strong>Senior Analyst:</strong> Michael Rodriguez, M.Sc. in Industrial Chemistry</p>
//           <p><strong>Market Specialist:</strong> Sarah Thompson, MBA in International Business</p>
//         </div> */}
//       </div>

//       {/* <div className="mt-12 text-center">
//         <Button variant="default" size="lg">
//           Subscribe Now
//         </Button>
//       </div> */}

//       <div className="mt-8 text-sm text-gray-600">
//         <h3 className="font-semibold mb-2">References and Sources:</h3>
//         <ul className="list-disc list-inside">
//           <li>American Chemical Society (ACS) Publications</li>
//           <li>Chemical & Engineering News (C&EN)</li>
//           <li>International Journal of Chemical Engineering</li>
//           <li>World Chemical Outlook Reports</li>
//           <li>Global Market Insights</li>
//         </ul>
//       </div>
//     </div>
//   );
// }