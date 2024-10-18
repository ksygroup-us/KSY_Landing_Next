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
  },

  {
    question: "What types of chemicals do you import?",
    answer: (
      <>
        <p>We import a wide range of chemicals to meet diverse industry needs:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Organic and inorganic chemicals</li>
          <li>Specialty chemicals</li>
          <li>Fine chemicals</li>
          <li>Industrial chemicals</li>
          <li>Pharmaceutical intermediates</li>
          <li>Agricultural chemicals</li>
        </ul>
        <p className="mt-2">If you're looking for a specific chemical, please contact our sales team for more information.</p>
      </>
    )
  },
  {
    question: "Do you offer custom chemical sourcing?",
    answer: (
      <>
        <p>Yes, we offer custom chemical sourcing services. Our process includes:</p>
        <ol className="list-decimal list-inside mt-2">
          <li>Understanding your specific chemical requirements</li>
          <li>Leveraging our global network to find suitable suppliers</li>
          <li>Verifying the quality and reliability of potential sources</li>
          <li>Negotiating terms and pricing on your behalf</li>
          <li>Managing the import process from order to delivery</li>
        </ol>
        <p className="mt-2">Contact our team to discuss your custom sourcing needs.</p>
      </>
    )
  },
  {
    question: "What are your minimum order quantities?",
    answer: (
      <>
        <p>Our minimum order quantities (MOQs) vary depending on the product:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Bulk chemicals: Typically 1 metric ton or more</li>
          <li>Specialty chemicals: Often available in smaller quantities, starting from 25kg</li>
          <li>Custom-sourced chemicals: MOQs are determined on a case-by-case basis</li>
        </ul>
        <p className="mt-2">For specific MOQ information on a product, please contact our sales team.</p>
      </>
    )
  },
  {
    question: "How do you ensure the quality of imported chemicals?",
    answer: (
      <>
        <p>We maintain strict quality control measures throughout our import process:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Sourcing only from reputable, certified manufacturers</li>
          <li>Conducting regular supplier audits</li>
          <li>Verifying Certificates of Analysis (COA) for each batch</li>
          <li>Performing random quality checks upon receipt</li>
          <li>Ensuring proper storage and handling during transportation</li>
        </ul>
        <p className="mt-2">Our commitment to quality ensures that you receive products meeting the highest industry standards.</p>
      </>
    )
  },
  {
    question: "What are your payment terms?",
    answer: (
      <>
        <p>We offer flexible payment terms to suit various business needs:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Net 30 days for established customers</li>
          <li>Letter of Credit (LC) for large international orders</li>
          <li>Advance payment for new customers or special orders</li>
          <li>Partial advance payment options available for select cases</li>
        </ul>
        <p className="mt-2">Specific payment terms are discussed during the quotation process and may vary based on order value and history.</p>
      </>
    )
  },
  {
    question: "How do you handle shipping and logistics?",
    answer: (
      <>
        <p>Our comprehensive shipping and logistics services include:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Air, sea, and land freight options</li>
          <li>Customs clearance assistance</li>
          <li>Proper documentation for smooth import processes</li>
          <li>Handling of hazardous materials and temperature-sensitive products</li>
          <li>Real-time shipment tracking</li>
          <li>Door-to-door delivery options</li>
        </ul>
        <p className="mt-2">We work with reliable logistics partners to ensure safe and timely delivery of your orders.</p>
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