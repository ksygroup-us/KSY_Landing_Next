'use client'
import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, Building, Globe, FileText } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Category {
  id: string;
  name: string;
}

const ContactForm: React.FC = () => {
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
      const { data, error } = await supabase.from('categories').select('id, name')
      if (data) {
        setProductCategories(data)
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Insert form data into the contact_submissions table
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

      // Call the new API route to send email
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          services: formData.services,
          country: formData.country,
          productCategory: formData.productCategory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(`Failed to send email: ${errorData.error || 'Unknown error'}`);
      }

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
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        setSubmitMessage(`An error occurred: ${error.message}`);
      } else {
        setSubmitMessage('An unknown error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form-control space-y-6 w-full" onSubmit={handleSubmit}>
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
        <label className="label cursor-pointer">
          <input type="checkbox" className="checkbox" required />
          <span className="label-text ml-2">
            I accept KSY Group's{' '}
            <a href="/terms-and-conditions" className="link link-primary">
              Terms and Conditions
            </a>
          </span>
        </label>
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </button>
      </div>

      {submitMessage && (
        <div className={`alert ${submitMessage.includes('error') ? 'alert-error' : 'alert-success'}`}>
          {submitMessage}
        </div>
      )}
    </form>
  );
};

export default ContactForm;