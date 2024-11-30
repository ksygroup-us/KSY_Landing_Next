'use client';

import React from 'react';
import Hero from '@/components/Hero';
import ProductSection from '@/components/Home_Products';
import ServicesPage from '@/components/Home_Services';
import NewsletterSignup from '@/components/newslettersignup';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductSection />
      <ServicesPage />
      <NewsletterSignup handleSubscribe={async (email: string) => {
        // Newsletter subscription logic will be handled by the component itself
      }} />
    </div>
  );
}