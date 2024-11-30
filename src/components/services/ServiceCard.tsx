'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  details: string;
  icon: LucideIcon;
  gradient: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  details,
  icon: Icon,
  gradient
}) => {
  return (
    <div className="group cursor-pointer h-full">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full p-6 hover:shadow-2xl transition-all duration-300 relative flex flex-col">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        <div className="relative z-10 flex flex-col flex-1">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} p-3 mb-6`}>
            <Icon className="w-full h-full text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 flex-grow">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
}; 