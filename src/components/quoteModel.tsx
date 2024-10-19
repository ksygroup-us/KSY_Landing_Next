'use client'
import React, { useRef, useEffect } from 'react';
import { Mail, Phone, Building, Globe, FileText, Package, Send } from 'lucide-react';
import { X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-600">Get a Quote</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {/* Add your quote form here */}
        <form className="space-y-6 w-full max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                First Name
            </label>
            <input
                type="text"
                id="firstName"
                placeholder="John"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                Last Name
            </label>
            <input
                type="text"
                id="lastName"
                placeholder="Doe"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                type="email"
                id="email"
                placeholder="john.doe@example.com"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                type="tel"
                id="phone"
                placeholder="+1 (702) 123-4567"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="company">
            Company/Organization
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
            <input
                type="text"
                id="company"
                placeholder="KSY Group"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="productCategory">
                Product Category
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <select 
                id="productCategory" 
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                <option value="">Select Product Category</option>
                <option value="organic">Organic Chemicals</option>
                <option value="inorganic">Inorganic Chemicals</option>
                {/* Add more options as needed */}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="specificProduct">
                Specific Product
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                type="text"
                id="specificProduct"
                placeholder="e.g., Acetone"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
                Quantity
            </label>
            <input
                type="number"
                id="quantity"
                placeholder="e.g., 1000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="unit">
                Unit
            </label>
            <select 
                id="unit" 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value="">Select Unit</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="l">Liters (L)</option>
                <option value="mt">Metric Tons (MT)</option>
            </select>
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="deliveryLocation">
                Delivery Location
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                type="text"
                id="deliveryLocation"
                placeholder="e.g., New York, USA"
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="additionalInfo">
            Additional Information
            </label>
            <textarea
            id="additionalInfo"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Please provide any additional details or specific requirements for your quote..."
            ></textarea>
        </div>

        <div className="flex items-center">
            <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
            I accept KSY Group's{' '}
            <a href="/legal/termsOfUse" className="text-indigo-600 hover:text-indigo-500">
                Terms and Conditions
            </a>
            </label>
        </div>

        <div className="flex justify-center">
            <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            <Send className="mr-2 h-5 w-5" />
            Request Quote
            </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;

