'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Send, Mail, Phone, Building, Globe, Clock, FileText } from 'lucide-react';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string;
  country?: string;
  timezone?: string;
  preferredDateTime?: string;
  additionalInfo?: string;
  terms: boolean;
}

interface ISDSFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string;
  country?: string;
  timezone?: string;
  preferredDateTime?: string;
  additionalInfo?: string;
}

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Fine Chemicals",
  "Specialty Chemicals",
  "Agro Chemicals",
  "Pharmaceutical Intermediates"
];

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();
  const { register: registerSDS, handleSubmit: handleSubmitSDS, formState: { errors: errorsSDS } } = useForm<ISDSFormInputs>();
  
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
    // Handle SDS request submission
    console.log('SDS Request Data:', data);
    // You might want to send this data to your backend or handle it appropriately
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      {/* Contact Us Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl w-full mb-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-[#1E5C9B]">Contact Us</h1>
          <p className="mb-6 text-gray-600 text-center">Please feel free to send KSY Group any questions or comments you may have.</p>
          {isSubmitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
              <h2 className="font-bold text-xl mb-2">Thank you for your message!</h2>
              <p>We've received your inquiry and appreciate you reaching out. Our team will review your message and get back to you as soon as possible, typically within 1-2 business days.</p>
              <p className="mt-2">Please check your email for a confirmation of your submission.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    id="firstName"
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    id="lastName"
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      id="email"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('phone')}
                      id="phone"
                      type="tel"
                      placeholder="+1 (702) 123-4567"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
                    Company/Organization
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('company')}
                      id="company"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="services" className="block text-gray-700 text-sm font-bold mb-2">
                    Services Looking For
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      {...register('services')}
                      id="services"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    >
                      <option value="">Select Service</option>
                      <option value="sourcing">Chemical Sourcing</option>
                      <option value="consulting">Consulting Services</option>
                      <option value="logistics">Logistics Support</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      {...register('country')}
                      id="country"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      {/* Add more options here */}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="timezone" className="block text-gray-700 text-sm font-bold mb-2">
                    Timezone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      {...register('timezone')}
                      id="timezone"
                      className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                    >
                      <option value="">Select Timezone</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                      {/* Add more options here */}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="additionalInfo" className="block text-gray-700 text-sm font-bold mb-2">
                  Additional Information
                </label>
                <textarea
                  {...register('additionalInfo')}
                  id="additionalInfo"
                  rows={4}
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                />
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  {...register('terms', { required: 'You must accept the terms and conditions' })}
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-gray-700 text-sm">
                  I accept KSY Group's <a href="/terms-and-conditions" className="text-[#1E5C9B] hover:underline">Terms and Conditions</a>
                </label>
                {errors.terms && <p className="text-red-500 text-xs italic">{errors.terms.message}</p>}
              </div>

              <div className="flex items-center justify-center">
                <button 
                  type="submit" 
                  className="bg-[#1E5C9B] hover:bg-[#164676] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="mr-2">Sending...</span>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
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
