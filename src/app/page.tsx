'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroComponent from '@/components/Hero'
import ProductSection from '@/components/Home_Products'
import ServicesPage from '@/components/Home_Services';
import NewsletterSignup from '@/components/newslettersignup';

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
      {/* <HeroComponent /> */}
      {/* Hero Section */}
      <HeroComponent/>
    {/* <section className="hero bg-base-200 py-10 md:py-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image src="/images/hero-image.jpg" alt="Chemical lab" width={600} height={400} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Your Global Partner in Chemical Distribution</h1>
          <p className="text-xl mb-12 text-left">
            At KSY Group, we are committed to providing unparalleled access to a comprehensive range of chemicals that cater to the diverse needs of industries worldwide. Explore our extensive portfolio, where innovation meets excellence.
          </p>
          <Link href="/products" className="btn bg-primary text-white hover:bg-primary-dark">Explore Our Products</Link>
        </div>
      </div>
    </section> */}


      {/* Updated Product Categories Section */}
      <ProductSection />
      {/* <section className="bg-gray-200 py-10 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Chemical Portfolio</h2>
          <div 
            ref={carouselRef}
            className="carousel carousel-center w-full p-4 space-x-4 bg-neutral rounded-box mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {productCategories.map((category, index) => (
              <div key={index} className="carousel-item">
                <div className="card w-64 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <figure className="px-4 pt-4">
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      width={300} 
                      height={200} 
                      className="rounded-xl object-cover w-full h-48" 
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">{category.name}</h2>
                    <p className="text-sm">{category.subtext}</p>
                    <div className="card-actions justify-end mt-2">
                      <Link 
                        to={`/products?category=${encodeURIComponent(category.name)}`}
                        className="btn btn-primary btn-sm"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
{/* Services Section */}
<ServicesPage />
{/* <section className="bg-base-200 py-10 md:py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Our Comprehensive Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: 'Global Chemical Sourcing',
          description: 'Leveraging our international network to source high-quality specialty chemicals from trusted manufacturers worldwide.',
          icon: '🌍'
        },
        {
          title: 'Supply Chain Optimization',
          description: 'Streamlining your chemical supply chain for efficiency, cost-effectiveness, and reliability.',
          icon: '⚙️'
        },
        {
          title: 'Custom Formulations',
          description: 'Developing tailored chemical solutions to meet your specific industry requirements and challenges.',
          icon: '🧪'
        },
        {
          title: 'Regulatory Compliance Consulting',
          description: 'Navigating the complex landscape of chemical regulations to ensure your operations remain compliant.',
          icon: '📋'
        },
        {
          title: 'Logistics Management',
          description: 'Coordinating the transportation and storage of chemicals with utmost care for safety and efficiency.',
          icon: '🚚'
        },
        {
          title: 'Industry Consulting',
          description: 'Providing expert insights and strategies to help your business thrive in the ever-evolving chemical industry.',
          icon: '💼'
        }
      ].map((service, index) => (
        <div key={index} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="card-title">{service.title}</h3>
            <p>{service.description}</p>
            <div className="card-actions justify-end">
              <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="btn btn-primary btn-sm">Learn More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section> */}



{/* About Us Preview */}
<section className="py-10 md:py-20">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">About KSY Group LLC</h2>
    <p className="text-xl mb-8">
      Founded amidst the challenges of the 2020 global pandemic, KSY Group LLC has swiftly emerged as a leader in the world of chemical distribution. Our journey is rooted in a visionary approach, driven by a steadfast commitment to delivering quality, fostering innovation, and achieving unparalleled customer satisfaction. As a trusted partner to industries worldwide, we pride ourselves on offering a comprehensive portfolio of chemicals that meet the highest standards of excellence.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {coreValues.map((value: CoreValue, index: number) => (
            <div key={index} className="bg-base-100 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-sm">{value.description}</p>
            </div>
          ))}
    </div>
    <Link href="/about" className="btn btn-primary">Discover Our Story</Link>
  </div>
</section>

<NewsletterSignup handleSubscribe={handleSubscribe} />
    </div>
  );
}