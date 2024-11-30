'use client';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 15, 2024">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p>KSY Group LLC collects information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Company information</li>
            <li>Order and transaction information</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Process your orders and transactions</li>
            <li>Communicate with you about our products and services</li>
            <li>Improve our website and customer service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Information Security</h2>
          <p>KSY Group LLC implements appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <p className="mt-2">KSY Group LLC</p>
          <p>PO Box 76180</p>
          <p>Fort Worth, Texas</p>
          <p>Email: privacy@ksygroup.us</p>
          <p>Phone: (669) 295-3313</p>
        </section>
      </div>
    </LegalLayout>
  );
} 