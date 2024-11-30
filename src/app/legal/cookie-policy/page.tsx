'use client';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="March 15, 2024">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p>This Cookie Policy explains how KSY Group LLC uses cookies and similar technologies when you visit our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. What Are Cookies</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with the best experience possible.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our website</li>
            <li>Improve your browsing experience</li>
            <li>Ensure our website's security and proper functioning</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Contact Information</h2>
          <p>If you have any questions about our Cookie Policy, please contact us:</p>
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