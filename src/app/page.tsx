'use client';

import React, { useState , useRef , useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeroComponent from '@/components/Hero'
import ProductSection from '@/components/Home_Products'
import ServicesPage from '@/components/Home_Services';
import NewsletterSignup from '@/components/newslettersignup';

const productCategories = [
  { name: "Organic Chemicals", subtext: "Carbon-based compounds Bulk & Fine Chemicals", image: "/images/organic-chemicals.jpeg" },
  { name: "Inorganic Chemicals", subtext: "Mineral-based chemicals for industrial use", image: "/images/inorganic-chemicals.jpg" },
  { name: "Agro Chemicals", subtext: "Enhancing agricultural productivity and crop protection", image: "/images/agro-chemicals.jpg" },
  { name: "Cosmetic Chemicals", subtext: "Innovative solutions for personal care products", image: "/images/cosmetic-chemicals.jpg" },
  { name: "Construction Chemicals", subtext: "Improving durability and performance in building materials", image: "/images/construction-chemicals.jpg" },
  { name: "Nutraceuticals", subtext: "Health-promoting compounds for dietary supplements", image: "/images/nutraceuticals.jpg" }
];

const coreValues = [
  {
    title: 'Trust',
    description: 'Built on a foundation of integrity, our partnerships are characterized by transparency, reliability, and a deep commitment to our clients’ success.'
  },
  {
    title: 'Expertise',
    description: 'Our team’s unparalleled knowledge and industry experience enable us to deliver innovative solutions tailored to the unique challenges of our clients.'
  },
  {
    title: 'Agility',
    description: 'In a rapidly evolving industry, we pride ourselves on our ability to adapt swiftly and efficiently, ensuring we meet the dynamic needs of our clients.'
  },
  {
    title: 'Quality',
    description: 'We adhere to the highest standards of excellence, ensuring that every product we deliver meets rigorous quality benchmarks and exceeds customer expectations.'
  }
];


export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsLoading(false);
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

  const handleProductClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };return (
    
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
                      <button 
                        onClick={() => handleProductClick(category.name)}
                        className="btn btn-primary btn-sm"
                      >
                        Explore
                      </button>
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
          {coreValues.map((value, index) => (
            <div key={index} className="bg-base-100 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">{value.title}</h3>
              <p className="text-sm">{value.description}</p>
            </div>
          ))}
    </div>
    <Link href="/about" className="btn btn-primary">Discover Our Story</Link>
  </div>
</section>

<NewsletterSignup
        handleSubscribe={handleSubscribe}
        email={email}
        setEmail={setEmail}
        subscriptionStatus={subscriptionStatus}
        isLoading={isLoading}
      />
      {/* Newsletter Signup */}
      {/* <section className="bg-primary text-white py-10 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Stay Informed</h2>
          <p className="text-xl mb-8 text-center">Subscribe to our newsletter for the latest chemical industry updates and exclusive offers.</p>
          {subscriptionStatus === 'success' ? (
            <div className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Thank you for subscribing! Check your email for a confirmation message.</span>
            </div>
          ) : subscriptionStatus === 'error' ? (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Oops! Something went wrong. Please try again later or contact us for assistance.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="input input-bordered w-full max-w-xs mb-2 sm:mb-0 sm:mr-2" 
                required
              />
              <button 
                type="submit" 
                className={`btn btn-secondary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </section> */}
    </div>
  );
}
