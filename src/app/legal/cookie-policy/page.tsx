'use client';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="March 15, 2024">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. What Are Cookies</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Remember your preferences</li>
            <li>Understand how you use our website</li>
            <li>Improve your browsing experience</li>
            <li>Provide personalized content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6">
            <li>Essential cookies: Required for basic website functionality</li>
            <li>Analytics cookies: Help us understand how visitors use our site</li>
            <li>Preference cookies: Remember your settings and choices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Managing Cookies</h2>
          <p>You can control and manage cookies through your browser settings. Please note that removing or blocking cookies may impact your website experience.</p>
        </section>
      </div>
    </LegalLayout>
  );
} 