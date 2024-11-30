import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const gradientOverlay = `
  linear-gradient(
    60deg,
    rgba(106, 27, 154, 0.95),
    rgba(106, 27, 154, 0.85)
  )
`;

export default function PageHeader({ title, description, buttonText, onButtonClick }: PageHeaderProps) {
  return (
    <div className="relative h-[250px] font-['Inter'] antialiased">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `${gradientOverlay}, url('/images/header-bg.jpg')` }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto pt-8">
        <motion.div
          className="w-12 h-0.5 bg-white mx-auto mb-4"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="text-center px-4">
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          
          <motion.p
            className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
          
          {buttonText && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button 
                onClick={onButtonClick}
                className="group bg-white text-purple-800 px-5 py-2 rounded-full text-sm font-medium 
                  transition-all duration-300 hover:bg-purple-50 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-800"
              >
                <span className="flex items-center space-x-2">
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 