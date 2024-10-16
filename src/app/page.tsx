'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroComponent from '@/components/Hero'
import ProductSection from '@/components/Home_Products'
import ServicesPage from '@/components/Home_Services';
import NewsletterSignup from '@/components/newslettersignup';
import RecentNewsletters from '@/components/RecentNewsletters';

// Add this interface for the core values
interface CoreValue {
  title: string;
  description: string;
}

// Define the coreValues array
const coreValues: CoreValue[] = [
  {
    title: "Quality",
    description: "We are committed to providing the highest quality chemicals and services."
  },
  {
    title: "Innovation",
    description: "We continuously seek innovative solutions to meet our customers' needs."
  },
  {
    title: "Integrity",
    description: "We conduct our business with the utmost integrity and transparency."
  },
  {
    title: "Customer Focus",
    description: "Our customers' success is at the heart of everything we do."
  }
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (email: string) => {
    try {
      const response = await fetch('/api/send-newsletter-welcome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send welcome email');
      }

      const data = await response.json();
      console.log('Welcome email sent successfully:', data);
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
    }
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused && carouselRef.current) {
        const firstItem = carouselRef.current.querySelector('.carousel-item') as HTMLDivElement;
        carouselRef.current.appendChild(firstItem.cloneNode(true));
        carouselRef.current.removeChild(firstItem);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroComponent/>
      <ProductSection />
      <ServicesPage />
      <RecentNewsletters />
      <NewsletterSignup handleSubscribe={handleSubscribe} />
    </div>
  );
}