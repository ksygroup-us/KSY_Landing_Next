'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const ServicesCTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-6"
        >
          Ready to Elevate Your Chemical Sourcing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          Let's discuss how KSY Group can tailor our services to meet your unique needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Link href="/contact" className="inline-block">
            <Button 
              variant="default" 
              size="lg"
              className="h-[60px] text-base font-medium rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out px-8 flex items-center justify-center min-w-[200px]"
            >
              Contact Us Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}; 