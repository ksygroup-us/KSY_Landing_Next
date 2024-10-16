import React from 'react';
import ContactForm from '../../components/ContactForm';
import FAQSection from '../../components/FAQSection';

const productCategories = [
  "Organic Chemicals",
  "Inorganic Chemicals",
  "Fine Chemicals",
  "Specialty Chemicals",
  "Agro Chemicals",
  "Pharmaceutical Intermediates"
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Contact Us Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6 text-primary">Contact Us</h1>
            <p className="mb-6 text-center">Please feel free to send KSY Group any questions or comments you may have.</p>
            <ContactForm />
          </div>
        </div>
        
        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}