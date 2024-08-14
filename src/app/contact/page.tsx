import React from 'react';
import { Send, Mail, Phone, Building, Globe, Clock, FileText } from 'lucide-react';

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Fine Chemicals",
  "Specialty Chemicals",
  "Agro Chemicals",
  "Pharmaceutical Intermediates"
];

export default function ContactPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      {/* Contact Us Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl w-full mb-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-[#1E5C9B]">Contact Us</h1>
          <p className="mb-6 text-gray-600 text-center">Please feel free to send KSY Group any questions or comments you may have.</p>
          
          <form className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
            {/* Form fields */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                />
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
                    id="email"
                    type="email"
                    required
                    className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  />
                </div>
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
                    id="phone"
                    type="tel"
                    placeholder="+1 (702) 123-4567"
                    className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  />
                </div>
              </div>
            </div>

            {/* Add other form fields here (company, services, country, timezone, additional info) */}
            {/* Additional form fields */}
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
                    id="company"
                    type="text"
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
                    id="country"
                    className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    {/* Add more country options as needed */}
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
                    id="timezone"
                    className="shadow-sm appearance-none border rounded w-full py-2 pl-10 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
                  >
                    <option value="">Select Timezone</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    {/* Add more timezone options as needed */}
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="additionalInfo" className="block text-gray-700 text-sm font-bold mb-2">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                rows={4}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#1E5C9B]"
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                required
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I accept KSY Group's <a href="/terms-and-conditions" className="text-[#1E5C9B] hover:underline">Terms and Conditions</a>
              </label>
            </div>

            <div className="flex items-center justify-center">
              <button 
                type="submit" 
                className="bg-[#1E5C9B] hover:bg-[#164676] text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 flex items-center"
              >
                <Send className="mr-2 h-5 w-5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
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
              <li>Certificate of Analysis (COA): Details the product's composition and purity</li>
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
            <ul className="list-disc list-inside mt-2">
              <li>Visit our website and navigate to the product page</li>
              <li>Look for the "Download SDS" button or link</li>
              <li>If the SDS is not available for download, contact our customer support team</li>
              <li>Provide the product name and any specific details about your request</li>
            </ul>
            <p className="mt-2">Our team will process your request and send you the SDS via email within one business day.</p>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold text-lg mb-2">What's the best way to reach us?</h3>
            <p>We value clear and efficient communication with our customers. The most effective ways to reach us are:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Phone: For immediate assistance, call us at (669) 295-3313 during business hours</li>
              <li>Email: For detailed inquiries or documentation requests, email us at info@chemimport.com</li>
              <li>Contact Form: Use the form on this page for general inquiries or product-specific questions</li>
            </ul>
            <p className="mt-2">Our customer service team is committed to responding to all inquiries within one business day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}