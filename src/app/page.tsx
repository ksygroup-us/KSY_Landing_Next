'use client';

import React from 'react';
import Hero from '@/components/Hero';
import ProductSection from '@/components/Home_Products';
import ServicesPage from '@/components/Home_Services';
import NewsletterSignup from '@/components/newslettersignup';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductSection />
      <ServicesPage />
      <NewsletterSignup />
      </div>
  );
}