import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="font-sans text-black-600 text-base leading-[26px] bg-white">
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-14 flex justify-center pt-5 md:pt-8">
          <ol className="flex items-center text-sm">
            <li className="flex items-center">
              <a href="/" className="text-black-6000 hover:underline">Home Page</a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span className="text-gray-500">Legal</span>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500">Terms and Conditions</li>
          </ol>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row pb-7 bg-white">
          <div className="col text-center">
            <h1 className="text-4xl font-bold mb-3">Terms and Conditions</h1>
            <p className="mb-0">Last updated: August 11, 2024</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/4 pr-8">
            <nav className="sticky top-20">
              <ul className="space-y-2 text-black">
                <li><a href="#introduction" className="hover:underline">1. Introduction</a></li>
                <li><a href="#use-of-website" className="hover:underline">2. Use of Website</a></li>
                <li><a href="#account-registration" className="hover:underline">3. Account Registration</a></li>
                <li><a href="#products-and-orders" className="hover:underline">4. Products and Orders</a></li>
                <li><a href="#pricing-and-payment" className="hover:underline">5. Pricing and Payment</a></li>
                <li><a href="#shipping-and-delivery" className="hover:underline">6. Shipping and Delivery</a></li>
                <li><a href="#returns-and-refunds" className="hover:underline">7. Returns and Refunds</a></li>
                <li><a href="#intellectual-property" className="hover:underline">8. Intellectual Property</a></li>
                <li><a href="#limitation-of-liability" className="hover:underline">9. Limitation of Liability</a></li>
                <li><a href="#governing-law" className="hover:underline">10. Governing Law</a></li>
                <li><a href="#changes-to-terms" className="hover:underline">11. Changes to Terms</a></li>
                <li><a href="#contact-us" className="hover:underline">12. Contact Us</a></li>
              </ul>
            </nav>
          </div>

          <section className="w-full md:w-3/4">
            <div className="max-w-3xl">
              <p className="mb-8">
                Welcome to ChemImport. These Terms and Conditions govern your use of our website and services. 
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with 
                any part of the terms, you may not access the website or use our services.
              </p>

              <h2 id="introduction" className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                These Terms and Conditions apply to all users of the ChemImport website and services, including 
                without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>

              <h2 id="use-of-website" className="text-2xl font-semibold mt-8 mb-4">2. Use of Website</h2>
              <p className="mb-4">
                You may use our website for lawful purposes only. You must not use our website in any way that 
                causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
              </p>

              <h2 id="account-registration" className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
              <p className="mb-4">
                To access certain features of our website, you may be required to register for an account. 
                You agree to provide accurate, current, and complete information during the registration process 
                and to update such information to keep it accurate, current, and complete.
              </p>

              <h2 id="products-and-orders" className="text-2xl font-semibold mt-8 mb-4">4. Products and Orders</h2>
              <p className="mb-4">
                All products displayed on our website are subject to availability. We reserve the right to 
                discontinue any product at any time. Prices for our products are subject to change without notice.
              </p>

              <h2 id="pricing-and-payment" className="text-2xl font-semibold mt-8 mb-4">5. Pricing and Payment</h2>
              <p className="mb-4">
                Prices for our products are quoted in U.S. dollars and are subject to change. We reserve the 
                right to refuse or cancel any orders placed for products listed at an incorrect price. Payment 
                must be made in full before the release of any products.
              </p>

              <h2 id="shipping-and-delivery" className="text-2xl font-semibold mt-8 mb-4">6. Shipping and Delivery</h2>
              <p className="mb-4">
                Shipping and delivery times may vary depending on the product and destination. We are not 
                responsible for delays outside our control. Risk of loss and title for all products pass to 
                you upon delivery to the carrier.
              </p>

              <h2 id="returns-and-refunds" className="text-2xl font-semibold mt-8 mb-4">7. Returns and Refunds</h2>
              <p className="mb-4">
                Our refund and returns policy applies to all purchases made through the website. Please 
                review our Returns Policy for more information.
              </p>

              <h2 id="intellectual-property" className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
              <p className="mb-4">
                The website and its original content, features, and functionality are owned by ChemImport 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property or proprietary rights laws.
              </p>

              <h2 id="limitation-of-liability" className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                ChemImport shall not be liable for any indirect, incidental, special, consequential or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
                other intangible losses, resulting from your access to or use of or inability to access or 
                use the website.
              </p>

              <h2 id="governing-law" className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws of Delaware, 
                United States, without regard to its conflict of law provisions.
              </p>

              <h2 id="changes-to-terms" className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 id="contact-us" className="text-2xl font-semibold mt-8 mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="mb-4 not-italic">
                ChemImport Inc.<br />
                1234 Chemical Trade Avenue<br />
                Wilmington, DE 19801<br />
                United States<br /><br />
                Email: <a href="mailto:legal@chemimport.com" className="text-black-6000 hover:underline">legal@chemimport.com</a><br />
                Phone: +1 (302) 555-7890<br />
                Website: <a href="https://www.chemimport.com" target="_blank" rel="noopener noreferrer" className="text-black-6000 hover:underline">www.chemimport.com</a>
              </address>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;