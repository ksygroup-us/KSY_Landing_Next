'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Settings, FlaskConical, Shield, Truck, Users } from 'lucide-react';
import { ServiceCard } from '@/components/services/ServiceCard';
import { WhyChooseUs } from '@/components/services/WhyChooseUs';
import { ServicesCTA } from '@/components/services/ServicesCTA';

const services = [
  {
    title: 'Global Chemical Sourcing',
    description: 'Leveraging our international network to source high-quality specialty chemicals from trusted manufacturers worldwide.',
    details: 'With our extensive global connections, we provide access to a diverse range of chemicals, ensuring you always have the materials you need for your projects.',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Streamlining your chemical supply chain for efficiency, cost-effectiveness, and reliability.',
    details: 'Our experts analyze your supply chain, identifying bottlenecks and implementing solutions to reduce costs and improve delivery times.',
    icon: Settings,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Custom Formulations',
    description: 'Developing tailored chemical solutions to meet your specific industry requirements and challenges.',
    details: 'Our team of chemists works closely with you to create bespoke formulations, giving you a competitive edge in your market.',
    icon: FlaskConical,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Regulatory Compliance',
    description: 'Navigating the complex landscape of chemical regulations to ensure your operations remain compliant.',
    details: 'Stay ahead of changing regulations with our expert guidance, minimizing risks and avoiding costly compliance issues.',
    icon: Shield,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Logistics Management',
    description: 'Coordinating the transportation and storage of chemicals with utmost care for safety and efficiency.',
    details: 'We handle all aspects of chemical logistics, from warehousing to international shipping, ensuring your products arrive safely and on time.',
    icon: Truck,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Industry Consulting',
    description: 'Providing expert insights and strategies to help your business thrive in the ever-evolving chemical industry.',
    details: 'Benefit from our years of industry experience as we help you navigate market trends, technological advancements, and growth opportunities.',
    icon: Users,
    gradient: 'from-indigo-500 to-purple-500'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Our Services
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-1 bg-primary mx-auto mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              At KSY Group LLC, we go beyond simple chemical distribution. Our comprehensive range of services is designed to provide you with end-to-end solutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ServicesCTA />
    </div>
  );
}