'use client';
import React from 'react';
import { LegalLayout } from '@/components/legal/LegalLayout';

const privacyNavItems = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use-information', title: '3. How We Use Information' },
  { id: 'how-we-share-information', title: '4. Information Sharing' },
  { id: 'your-choices', title: '5. Your Choices' },
  { id: 'data-security', title: '6. Data Security' },
  { id: 'international-transfers', title: '7. International Transfers' },
  { id: 'childrens-privacy', title: '8. Childrens Privacy' },
  { id: 'changes-to-policy', title: '9. Policy Updates' },
  { id: 'contact-us', title: '10. Contact Us' }
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="August 6, 2024"
      navItems={privacyNavItems}
    >
      <div className="prose prose-lg max-w-none">
        <p className="lead">
          KSY Group LLC is committed to protecting your privacy. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <section id="introduction">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p>
            This Privacy Policy applies to all information collected through our website, and/or any 
            related services, sales, marketing or events.
          </p>
        </section>

        {/* Add other sections similarly */}

        <section id="contact-us">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
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

export default PrivacyPolicy;