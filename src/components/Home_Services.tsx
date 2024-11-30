'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Settings, ClipboardList, Truck, Briefcase, FileCheck } from 'lucide-react';

const services = [
  {
    title: 'Global Chemical Sourcing',
    description: 'Access top-quality chemicals from trusted manufacturers worldwide. Our extensive network ensures competitive pricing and reliable supply chains.',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Improve your operations with our expert analysis and implementation of best practices. Reduce costs and enhance supply chain resilience.',
    icon: Settings,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Custom Formulations',
    description: 'Our team of experienced chemists creates bespoke formulations to meet your exact specifications and overcome unique challenges.',
    icon: ClipboardList,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Regulatory Compliance',
    description: 'Stay compliant with ever-changing regulations. We provide up-to-date guidance and support for all relevant industry standards.',
    icon: FileCheck,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Logistics Management',
    description: 'Ensure your chemicals are handled with care from warehouse to delivery. Our logistics experts manage every aspect for maximum safety.',
    icon: Truck,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Industry Consulting',
    description: 'Benefit from our years of industry experience. Get valuable insights on market trends, technological advancements, and strategic opportunities.',
    icon: Briefcase,
    gradient: 'from-indigo-500 to-purple-500'
  }
];

const ServicesPage: React.FC = () => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Services
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive chemical solutions tailored to meet your industry needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full p-6 hover:shadow-2xl transition-all duration-300 relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;