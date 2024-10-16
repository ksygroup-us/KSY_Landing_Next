import React from 'react';

const faqData = [
  {
    question: "What documents are required to understand the quality of the product?",
    answer: (
      <>
        <p>To ensure our customers have a comprehensive understanding of our product quality, we provide several key documents:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Certificate of Analysis (COA): Details the product's composition and purity</li>
          <li>Safety Data Sheet (SDS): Outlines safety precautions, handling procedures, and potential hazards</li>
          <li>Technical Data Sheet (TDS): Provides specifications and performance characteristics</li>
        </ul>
        <p className="mt-2">These documents are available upon request for all our products. For specific documentation needs, please contact our customer service team.</p>
      </>
    )
  },
  {
    question: "How can I order a sample?",
    answer: (
      <>
        <p>We understand the importance of product evaluation before making a purchase decision. To order a sample:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>Email your request to samples@chemimport.com</li>
          <li>Include the product name, desired quantity, and your shipping information</li>
          <li>Our team will process your request and provide a quote for the sample (if applicable)</li>
        </ol>
        <p className="mt-2">Please note that while we strive to provide samples for all products, some restrictions may apply based on product availability and regulations.</p>
      </>
    )
  },
  {
    question: "How can I obtain a Safety Data Sheet (SDS)?",
    answer: (
      <>
        <p>Safety Data Sheets are crucial for the proper handling and use of our products. To receive an SDS:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Visit our website and navigate to the product page</li>
          <li>Look for the "Download SDS" button or link</li>
          <li>If the SDS is not available for download, contact our customer support team</li>
          <li>Provide the product name and any specific details about your request</li>
        </ul>
        <p className="mt-2">Our team will process your request and send you the SDS via email within one business day.</p>
      </>
    )
  },
  {
    question: "What's the best way to reach us?",
    answer: (
      <>
        <p>We value clear and efficient communication with our customers. The most effective ways to reach us are:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Phone: For immediate assistance, call us at (669) 295-3313 during business hours</li>
          <li>Email: For detailed inquiries or documentation requests, email us at info@chemimport.com</li>
          <li>Contact Form: Use the form on this page for general inquiries or product-specific questions</li>
        </ul>
        <p className="mt-2">Our customer service team is committed to responding to all inquiries within one business day.</p>
      </>
    )
  }
];

export default function FAQSection() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-3xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" /> 
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}