'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Globe, Settings, ClipboardList, Truck, Briefcase } from 'lucide-react';

const services = [
  {
    title: 'Global Chemical Sourcing',
    description: 'Leveraging our international network to source high-quality specialty chemicals.',
    details: 'Access top-quality chemicals from trusted manufacturers worldwide. Our extensive network ensures competitive pricing and reliable supply chains.',
    icon: Globe
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Streamlining your chemical supply chain for efficiency and reliability.',
    details: 'Improve your operations with our expert analysis and implementation of best practices. Reduce costs and enhance supply chain resilience.',
    icon: Settings
  },
  {
    title: 'Custom Formulations',
    description: 'Developing tailored chemical solutions for your specific needs.',
    details: 'Our team of experienced chemists creates bespoke formulations to meet your exact specifications and overcome unique challenges.',
    icon: ClipboardList
  },
  {
    title: 'Regulatory Compliance',
    description: 'Navigating the complex landscape of chemical regulations.',
    details: 'Stay compliant with ever-changing regulations. We provide up-to-date guidance and support for all relevant industry standards.',
    icon: ClipboardList
  },
  {
    title: 'Logistics Management',
    description: 'Coordinating the transportation and storage of chemicals safely.',
    details: 'Ensure your chemicals are handled with care from warehouse to delivery. Our logistics experts manage every aspect for maximum safety and efficiency.',
    icon: Truck
  },
  {
    title: 'Industry Consulting',
    description: 'Providing expert insights to help your business thrive.',
    details: 'Benefit from our years of industry experience. Get valuable insights on market trends, technological advancements, and strategic opportunities.',
    icon: Briefcase
  }
];

const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
      <p className="text-xl text-center text-gray-600 mb-8">
        Comprehensive chemical solutions tailored to meet your industry needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full overflow-hidden">
              <motion.div
                className="p-6 h-full flex flex-col"
                initial={{ height: "auto" }}
                whileHover={{ height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-gray-500 mt-2"
                >
                  {service.details}
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;