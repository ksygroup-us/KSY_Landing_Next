'use client';
import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

const cookieNavItems = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'what-are-cookies', title: '2. What Are Cookies' },
  { id: 'how-we-use-cookies', title: '3. How We Use Cookies' },
  { id: 'types-of-cookies', title: '4. Types of Cookies' },
  { id: 'your-choices', title: '5. Your Choices' },
  { id: 'third-party-cookies', title: '6. Third-Party Cookies' },
  { id: 'data-collection', title: '7. Data Collection' },
  { id: 'updates', title: '8. Policy Updates' },
  { id: 'governing-law', title: '9. Governing Law' },
  { id: 'contact-us', title: '10. Contact Us' }
];

const CookiePolicy = () => {
  return (
    <LegalLayout
      title="Cookie Policy"
      lastUpdated="August 6, 2024"
      navItems={cookieNavItems}
    >
      <div className="prose prose-lg max-w-none">
        <p className="lead">
          This Cookie Policy explains how KSY Group LLC uses cookies and similar technologies 
          to recognize you when you visit our website.
        </p>

        <section id="introduction">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            This Cookie Policy is an integral part of our website, which is owned and operated 
            exclusively by KSY Group LLC. By accessing or using our website, you consent to 
            the use of cookies in accordance with this policy.
          </p>
        </section>

        {/* Add other sections similarly */}

        <section id="contact-us">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about our use of cookies, please contact us at:</p>
          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <p className="font-medium">KSY Group LLC</p>
            <p>PO Box 76180</p>
            <p>Fort Worth, Texas</p>
            <p>United States</p>
            <p className="mt-4">
              Email: <a href="mailto:privacy@ksygroup.us" className="text-primary hover:underline">privacy@ksygroup.us</a>
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

export default CookiePolicy;