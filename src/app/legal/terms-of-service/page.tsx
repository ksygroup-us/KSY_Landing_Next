'use client';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="March 15, 2024">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the KSY Group LLC website, you accept and agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily access the materials on our website for personal, non-commercial use only.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Product Information</h2>
          <p>We strive to provide accurate product information but do not warrant that product descriptions or other content is accurate, complete, or current.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Contact Information</h2>
          <p>For any questions regarding these Terms of Service, please contact us:</p>
          <p className="mt-2">KSY Group LLC</p>
          <p>PO Box 76180</p>
          <p>Fort Worth, Texas</p>
          <p>Email: legal@ksygroup.us</p>
          <p>Phone: (669) 295-3313</p>
        </section>
      </div>
    </LegalLayout>
  );
} 