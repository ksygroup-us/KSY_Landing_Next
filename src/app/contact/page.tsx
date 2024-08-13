'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

interface IFormInputs {
  name: string;
  email: string;
  product: string;
  message: string;
}

interface ISDSFormInputs {
  email: string;
  product: string;
}

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Agro Chemicals",
  "Cosmetic Chemicals",
  "Construction Chemicals",
  "Nutraceuticals"
];

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = {
  lat: 37.7749, // Replace with your latitude
  lng: -122.4194 // Replace with your longitude
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
  const { register: registerSDS, handleSubmit: handleSubmitSDS } = useForm<ISDSFormInputs>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSDSForm, setShowSDSForm] = useState(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Message sending failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Message sending failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSDS: SubmitHandler<ISDSFormInputs> = async (data) => {
    console.log('SDS form submitted:', data);
    // You can add the actual submission logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <h2 className="font-bold text-xl mb-2">Thank you for your message!</h2>
              <p>We&apos;ve received your inquiry and appreciate you reaching out. Our team will review your message and get back to you as soon as possible, typically within 1-2 business days.</p>
              <p className="mt-2">Please check your email for a confirmation of your submission.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="product" className="block text-gray-700 text-sm font-bold mb-2">Product Category</label>
                <select
                  {...register('product', { required: 'Product category is required' })}
                  id="product"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a product category</option>
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                {errors.product && <p className="text-red-500 text-xs italic">{errors.product.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs italic">{errors.message.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-2"><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
          <p className="mb-2"><strong>Phone:</strong> (669) 295-3313 </p> 
          <p className="mb-2"><strong>Email:</strong> info@ksygroup.com</p>
          <p className="mb-4"><strong>Business Hours:</strong> Monday - Friday: 9am - 5pm</p>
        </div>
        </div>
      
      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">What documents are required to understand the quality of the product?</h3>
            <p>To ensure our customers have a comprehensive understanding of our product quality, we provide several key documents:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Certificate of Analysis (COA): Details the products composition and purity</li>
              <li>Safety Data Sheet (SDS): Outlines safety precautions, handling procedures, and potential hazards</li>
              <li>Technical Data Sheet (TDS): Provides specifications and performance characteristics</li>
            </ul>
            <p className="mt-2">These documents are available upon request for all our products. For specific documentation needs, please contact our customer service team.</p>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">How can I order a sample?</h3>
            <p>We understand the importance of product evaluation before making a purchase decision. To order a sample:</p>
            <ol className="list-decimal list-inside mt-2">
              <li>Email your request to samples@chemimport.com</li>
              <li>Include the product name, desired quantity, and your shipping information</li>
              <li>Our team will process your request and provide a quote for the sample (if applicable)</li>
            </ol>
            <p className="mt-2">Please note that while we strive to provide samples for all products, some restrictions may apply based on product availability and regulations.</p>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">How can I obtain a Safety Data Sheet (SDS)?</h3>
            <p>Safety Data Sheets are crucial for the proper handling and use of our products. To receive an SDS:</p>
            <button 
              onClick={() => setShowSDSForm(!showSDSForm)} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Request SDS
            </button>
            {showSDSForm && (
              <form onSubmit={handleSubmitSDS(onSubmitSDS)} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="sds-email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <input
                    {...registerSDS('email', { required: true, pattern: /^\S+@\S+$/i })}
                    id="sds-email"
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="sds-product" className="block text-gray-700 text-sm font-bold mb-2">Product</label>
                  <select
                    {...registerSDS('product', { required: true })}
                    id="sds-product"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a product category</option>
                    {productCategories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit SDS Request
                </button>
              </form>
            )}
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">Whats the best way to reach us?</h3>
            <p>We value clear and efficient communication with our customers. The most effective ways to reach us are:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Phone: For immediate assistance, call us at (669) 295-3313 during business hours</li>
              <li>Email: For detailed inquiries or documentation requests, email us at info@chemimport.com</li>
              <li>Contact Form: Use the form on this page for general inquiries or product-specific questions</li>
            </ul>
            <p className="mt-2">Our customer service team is committed to responding to all inquiries within one business day.</p>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">Where can I find resources on market trends and industry outlook?</h3>
            <p>Staying informed about market trends and industry outlooks is crucial in the chemical industry. Here are some valuable resources:</p>
            <ul className="list-disc list-inside mt-2">
              <li>American Chemistry Council (www.americanchemistry.com): Provides industry analysis and economic reports</li>
              <li>Chemical & Engineering News (cen.acs.org): Offers the latest news and in-depth articles on the chemical industry</li>
              <li>ICIS (www.icis.com): Provides market intelligence for the global chemical, energy and fertilizer industries</li>
              <li>Our Monthly Newsletter: Subscribe to receive curated insights and trends specific to our product categories</li>
            </ul>
            <p className="mt-2">We also recommend following industry-specific journals and attending trade shows for the most up-to-date information in your field.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Google Map
//           <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={center}
//               zoom={10}
//             >
//               {/* You can add markers or other components here */}
//             </GoogleMap>
//           </LoadScript>