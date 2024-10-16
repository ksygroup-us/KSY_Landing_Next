import React from 'react';
import { FaGlobeAmericas, FaChartLine, FaFlask, FaShieldAlt, FaTruck, FaUserTie } from 'react-icons/fa';
import { Button } from "@/components/ui/button"

const services = [
  {
    title: 'Global Chemical Sourcing',
    description: 'Leveraging our international network to source high-quality specialty chemicals from trusted manufacturers worldwide.',
    icon: <FaGlobeAmericas className="w-12 h-12 text-primary" />,
    details: 'With our extensive global connections, we provide access to a diverse range of chemicals, ensuring you always have the materials you need for your projects.'
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Streamlining your chemical supply chain for efficiency, cost-effectiveness, and reliability.',
    icon: <FaChartLine className="w-12 h-12 text-primary" />,
    details: 'Our experts analyze your supply chain, identifying bottlenecks and implementing solutions to reduce costs and improve delivery times.'
  },
  {
    title: 'Custom Formulations',
    description: 'Developing tailored chemical solutions to meet your specific industry requirements and challenges.',
    icon: <FaFlask className="w-12 h-12 text-primary" />,
    details: 'Our team of chemists works closely with you to create bespoke formulations, giving you a competitive edge in your market.'
  },
  {
    title: 'Regulatory Compliance Consulting',
    description: 'Navigating the complex landscape of chemical regulations to ensure your operations remain compliant.',
    icon: <FaShieldAlt className="w-12 h-12 text-primary" />,
    details: 'Stay ahead of changing regulations with our expert guidance, minimizing risks and avoiding costly compliance issues.'
  },
  {
    title: 'Logistics Management',
    description: 'Coordinating the transportation and storage of chemicals with utmost care for safety and efficiency.',
    icon: <FaTruck className="w-12 h-12 text-primary" />,
    details: 'We handle all aspects of chemical logistics, from warehousing to international shipping, ensuring your products arrive safely and on time.'
  },
  {
    title: 'Industry Consulting',
    description: 'Providing expert insights and strategies to help your business thrive in the ever-evolving chemical industry.',
    icon: <FaUserTie className="w-12 h-12 text-primary" />,
    details: 'Benefit from our years of industry experience as we help you navigate market trends, technological advancements, and growth opportunities.'
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Our Services</h1>
      
      <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
        At KSY Group LLC, we go beyond simple chemical distribution. Our comprehensive range of services is designed to provide you with end-to-end solutions, ensuring your success in the global chemical industry.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h2 className="text-2xl font-semibold mb-4 text-center">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-sm text-gray-500">{service.details}</p>
          </div>
        ))}
      </div>

      <section className="mt-20 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Why Choose KSY Group LLC?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Global Expertise, Local Touch</h3>
            <p className="text-gray-700">With our international network and local market knowledge, we bridge the gap between global chemical manufacturers and your specific needs.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Uncompromising Quality</h3>
            <p className="text-gray-700">We partner only with reputable manufacturers and implement rigorous quality control measures to ensure the highest standard of chemicals.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Innovative Solutions</h3>
            <p className="text-gray-700">Our team of experts is constantly exploring new technologies and methodologies to provide you with cutting-edge chemical solutions.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Commitment to Sustainability</h3>
            <p className="text-gray-700">We prioritize environmentally friendly practices and products, helping you meet your sustainability goals without compromising on quality.</p>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Ready to Elevate Your Chemical Sourcing?</h2>
        <p className="text-xl text-gray-700 mb-8">Let&apos;s discuss how KSY Group LLC can tailor our services to meet your unique needs.</p>
        <Button variant="default" size="lg">
          <a href="/contact">Contact Us Today</a>
        </Button>
      </section>
    </div>
  );
}