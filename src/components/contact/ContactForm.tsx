'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, Building, Globe, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/utils/supabaseClient';

interface Category {
  id: string;
  name: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    services: '',
    country: '',
    productCategory: '',
    additionalInfo: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [productCategories, setProductCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (data) {
        setProductCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            services: formData.services,
            country: formData.country,
            product_category: formData.productCategory,
            additional_info: formData.additionalInfo,
          },
        ]);

      if (insertError) throw insertError;

      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send email');

      setSubmitMessage('Thank you for your submission. We will contact you soon!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        services: '',
        country: '',
        productCategory: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 md:p-12"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="John"
              className="input input-bordered w-full"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div>
            <label className="label" htmlFor="lastName">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Doe"
              className="input input-bordered w-full"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="input input-bordered w-full pl-10"
                required
                onChange={handleChange}
                value={formData.email}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="phone">
              <span className="label-text">Phone Number</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                placeholder="+1 (702) 123-4567"
                className="input input-bordered w-full pl-10"
                pattern="^\+?[1-9]\d{1,14}$"
                onChange={handleChange}
                value={formData.phone}
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="company">
              <span className="label-text">Company/Organization</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="company"
                placeholder="KSY Group"
                className="input input-bordered w-full pl-10"
                onChange={handleChange}
                value={formData.company}
              />
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="services">
              <span className="label-text">Services Looking For</span>
            </label>
            <div className="relative">
              <select 
                id="services" 
                className="select select-bordered w-full pl-10" 
                onChange={handleChange} 
                value={formData.services}
                required
              >
                <option value="">Select Service</option>
                <option value="sourcing">Chemical Sourcing</option>
                <option value="consulting">Consulting Services</option>
                <option value="logistics">Logistics Support</option>
              </select>
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="country">
              <span className="label-text">Country</span>
            </label>
            <div className="relative">
              <select 
                id="country" 
                className="select select-bordered w-full pl-10" 
                onChange={handleChange} 
                value={formData.country}
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                {/* Add more country options as needed */}
              </select>
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="productCategory">
              <span className="label-text">Product Category</span>
            </label>
            <div className="relative">
              <select 
                id="productCategory" 
                className="select select-bordered w-full pl-10" 
                onChange={handleChange} 
                value={formData.productCategory}
                required
              >
                <option value="">Select Product Category</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="additionalInfo">
            <span className="label-text">Additional Information</span>
          </label>
          <textarea
            id="additionalInfo"
            className="textarea textarea-bordered w-full h-24"
            placeholder="Please provide any additional details or specific requirements..."
            onChange={handleChange}
            value={formData.additionalInfo}
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" required />
            <span className="label-text">
              I accept KSY Group's{' '}
              <a href="/legal/termsOfUse" className="text-primary hover:underline">
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto h-[60px] text-base font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out px-8 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>

        {submitMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-center ${
              submitMessage.includes('error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}
          >
            {submitMessage}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}; 