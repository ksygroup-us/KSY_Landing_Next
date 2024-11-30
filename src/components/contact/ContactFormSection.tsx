'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/ContactForm';

export const ContactFormSection = () => {
  return (
    <section className="py-2">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12">
            {/* <p className="text-lg text-gray-600 text-center mb-8"> */}
              {/* Please feel free to send KSY Group any questions or comments you may have. */}
            {/* </p> */}
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 