'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DynamicProductsPage = dynamic(() => import('./ProductsPage'), {
  ssr: false,
});

export default function ProductsPage() {
  return <DynamicProductsPage />;
}