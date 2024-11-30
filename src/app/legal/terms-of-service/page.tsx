'use client';
import { LegalLayout } from '@/components/legal/LegalLayout';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="March 15, 2024">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service.</p>
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
          <h2 className="text-xl font-semibold mb-4">4. Pricing and Payment</h2>
          <p>All prices are subject to change without notice. We reserve the right to modify or discontinue products without liability.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
        </section>
      </div>
    </LegalLayout>
  );
} 