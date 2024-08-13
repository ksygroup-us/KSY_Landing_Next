'use client';
import React from 'react';

const PrivacyPolicy = () => {
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
            <li className="text-gray-500">Privacy Policy</li>
          </ol>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row pb-7 bg-white">
          <div className="col text-center">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="mb-0">Last updated: August 6, 2024</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/4 pr-8">
            <nav className="sticky top-20">
              <ul className="space-y-2 text-black">
                <li><a href="#introduction" className="hover:underline">1. Introduction</a></li>
                <li><a href="#information-we-collect" className="hover:underline">2. Information We Collect</a></li>
                <li><a href="#how-we-use-information" className="hover:underline">3. How We Use Your Information</a></li>
                <li><a href="#how-we-share-information" className="hover:underline">4. How We Share Your Information</a></li>
                <li><a href="#your-choices" className="hover:underline">5. Your Choices</a></li>
                <li><a href="#data-security" className="hover:underline">6. Data Security</a></li>
                <li><a href="#international-transfers" className="hover:underline">7. International Data Transfers</a></li>
                <li><a href="#childrens-privacy" className="hover:underline">8. Childrens Privacy</a></li>
                <li><a href="#changes-to-policy" className="hover:underline">9. Changes to This Privacy Policy</a></li>
                <li><a href="#contact-us" className="hover:underline">10. Contact Us</a></li>
              </ul>
            </nav>
          </div>

          <section className="w-full md:w-3/4">
            <div className="max-w-3xl">
              <p className="mb-8">
                ChemImport (we, our, or us) is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services. By using our services, you agree to the terms of this Privacy Policy.
              </p>

              <h2 id="introduction" className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Privacy Policy applies to all information collected through our website, and/or any related services, sales, marketing or events (collectively, the Services).
              </p>

              <h2 id="information-we-collect" className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect personal information that you provide to us such as name, address, contact information, passwords and security data, and payment information.</p>
              <p className="mb-4">We also automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information.</p>

              <h2 id="how-we-use-information" className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

              <h2 id="how-we-share-information" className="text-2xl font-semibold mt-8 mb-4">4. How We Share Your Information</h2>
              <p className="mb-4">We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

              <h2 id="your-choices" className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
              <p className="mb-4">You can choose not to provide certain information, but then you might not be able to take advantage of many of our features. You can add or update certain information on pages such as those referenced in the Contact Us section. When you update information, we usually keep a copy of the prior version for our records.</p>

              <h2 id="data-security" className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
              <p className="mb-4">We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>

              <h2 id="international-transfers" className="text-2xl font-semibold mt-8 mb-4">7. International Data Transfers</h2>
              <p className="mb-4">Our servers are located in the United States. If you are accessing our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information, in the United States and other countries.</p>

              <h2 id="childrens-privacy" className="text-2xl font-semibold mt-8 mb-4">8. Childrens Privacy</h2>
              <p className="mb-4">Our Services are not directed to children under 13 (or other age as required by local law), and we do not knowingly collect personal information from children.</p>

              <h2 id="changes-to-policy" className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="mb-4">We may update this privacy policy from time to time. The updated version will be indicated by an updated Revised date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>

              <h2 id="contact-us" className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <address className="mb-4 not-italic">
                ChemImport Inc.<br />
                1234 Chemical Trade Avenue<br />
                Wilmington, DE 19801<br />
                United States<br /><br />
                Email: <a href="mailto:privacy@chemimport.com" className="text-black-6000 hover:underline">privacy@chemimport.com</a><br />
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

export default PrivacyPolicy;

// // import React from 'react';

// // const PrivacyPolicy: React.FC = () => {
// //   return (
// //     <div className="bg-[#F5F7FA] min-h-screen">
// //       <div className="container mx-auto px-4 py-12">
// //         <h1 className="text-4xl font-bold text-[#1E5C9B] mb-8 font-roboto-slab">ChemImport Privacy Policy</h1>
// //         <p className="text-lg text-gray-600 mb-8">Last updated: August 6, 2024</p>

// //         <div className="bg-white rounded-lg shadow-md p-8">
// //           <Section title="1. Introduction">
// //             <p>
// //               ChemImport ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
// //               explains how we collect, use, disclose, and safeguard your information when you visit our 
// //               website or use our services.
// //             </p>
// //           </Section>

// //           <Section title="2. Information We Collect">
// //             <p>We collect information that you provide directly to us, such as when you create an account, 
// //             place an order, sign up for our newsletter, or contact us. This may include:</p>
// //             <ul className="list-disc pl-6 mt-2">
// //               <li>Name</li>
// //               <li>Email address</li>
// //               <li>Phone number</li>
// //               <li>Company name</li>
// //               <li>Shipping and billing address</li>
// //               <li>Payment information</li>
// //             </ul>
// //             <p className="mt-4">We also automatically collect certain information about your device and how you interact with our website, including:</p>
// //             <ul className="list-disc pl-6 mt-2">
// //               <li>IP address</li>
// //               <li>Browser type</li>
// //               <li>Device type</li>
// //               <li>Pages visited</li>
// //               <li>Time spent on pages</li>
// //             </ul>
// //           </Section>

// //           <Section title="3. How We Use Your Information">
// //             <p>We use the information we collect to:</p>
// //             <ul className="list-disc pl-6 mt-2">
// //               <li>Process and fulfill your orders</li>
// //               <li>Communicate with you about your orders, account, or requests</li>
// //               <li>Send you marketing communications (if you've opted in)</li>
// //               <li>Improve our website and services</li>
// //               <li>Comply with legal obligations</li>
// //             </ul>
// //           </Section>

// //           <Section title="4. How We Share Your Information">
// //             <p>We may share your information with:</p>
// //             <ul className="list-disc pl-6 mt-2">
// //               <li>Service providers who perform services on our behalf</li>
// //               <li>Business partners, with your consent</li>
// //               <li>Legal authorities, when required by law or to protect our rights</li>
// //             </ul>
// //           </Section>

// //           <Section title="5. Your Choices">
// //             <p>
// //               You can opt out of receiving marketing communications from us at any time. You may also 
// //               request to access, correct, or delete your personal information.
// //             </p>
// //           </Section>

// //           <Section title="6. Data Security">
// //             <p>
// //               We implement appropriate technical and organizational measures to protect your personal 
// //               information from unauthorized access, disclosure, alteration, and destruction.
// //             </p>
// //           </Section>

// //           <Section title="7. International Data Transfers">
// //             <p>
// //               Your information may be transferred to and processed in countries other than your own. 
// //               We will take appropriate measures to protect your personal information in accordance 
// //               with this Privacy Policy.
// //             </p>
// //           </Section>

// //           <Section title="8. Children's Privacy">
// //             <p>
// //               Our website is not intended for children under 13 years of age. We do not knowingly 
// //               collect personal information from children under 13.
// //             </p>
// //           </Section>

// //           <Section title="9. Changes to This Privacy Policy">
// //             <p>
// //               We may update this Privacy Policy from time to time. We will notify you of any changes 
// //               by posting the new Privacy Policy on this page and updating the "Last updated" date.
// //             </p>
// //           </Section>

// //           <Section title="10. Contact Us">
// //             <p>
// //               If you have any questions about this Privacy Policy, please contact us at 
// //               <a href="mailto:privacy@chemimport.com" className="text-[#1E5C9B] hover:underline"> privacy@chemimport.com</a>.
// //             </p>
// //           </Section>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
// //   <section className="mb-8">
// //     <h2 className="text-2xl font-semibold text-[#1E5C9B] mb-4 font-roboto-slab">{title}</h2>
// //     <div className="text-gray-700 leading-relaxed">{children}</div>
// //   </section>
// // );

// // export default PrivacyPolicy;