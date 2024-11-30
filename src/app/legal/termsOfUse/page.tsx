'use client';
import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

const termsNavItems = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'use-of-website', title: '2. Use of Website' },
  { id: 'account-registration', title: '3. Account Registration' },
  { id: 'products-and-orders', title: '4. Products and Orders' },
  { id: 'pricing-and-payment', title: '5. Pricing and Payment' },
  { id: 'shipping-and-delivery', title: '6. Shipping and Delivery' },
  { id: 'returns-and-refunds', title: '7. Returns and Refunds' },
  { id: 'intellectual-property', title: '8. Intellectual Property' },
  { id: 'limitation-of-liability', title: '9. Limitation of Liability' },
  { id: 'governing-law', title: '10. Governing Law' },
  { id: 'changes-to-terms', title: '11. Changes to Terms' },
  { id: 'contact-us', title: '12. Contact Us' }
];

const TermsAndConditions = () => {
  return (
    <LegalLayout
      title="Terms and Conditions"
      lastUpdated="August 11, 2024"
      navItems={termsNavItems}
    >
      <div className="prose prose-lg max-w-none">
        <p className="lead">
          Welcome to KSY Group LLC. These Terms and Conditions govern your use of our website and services. 
          By accessing or using our website, you agree to be bound by these Terms.
        </p>

        <section id="introduction">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            These Terms and Conditions apply to all users of the KSY Group LLC website and services, 
            including browsers, vendors, customers, merchants, and contributors of content.
          </p>
        </section>

        {/* Add other sections similarly */}

        <section id="contact-us">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="font-medium">KSY Group LLC</p>
            <p>PO Box 76180</p>
            <p>Fort Worth, Texas</p>
            <p>United States</p>
            <p className="mt-4">
              Email: <a href="mailto:legal@ksygroup.us" className="text-primary hover:underline">legal@ksygroup.us</a>
            </p>
            <p>
              Phone: <a href="tel:+16692953313" className="text-primary hover:underline">(669) 295-3313</a>
            </p>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default TermsAndConditions;