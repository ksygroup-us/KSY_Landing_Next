// pages/product/productDetails.tsx
// This page displays detailed information about a specific product, including its name, category, image, and various tabs with additional information such as overview, specifications, applications, safety, and FAQs. The data for this page is loaded dynamically based on the product name and category passed in the URL query parameters.

//   kathan patel;
'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicProductDetails = dynamic(() => import('./ProductDetails'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicProductDetails />
    </Suspense>
  );
}