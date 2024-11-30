'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Chemical } from '@/types/chemical';
import { 
  ChevronDown, 
  Beaker, 
  TestTube, 
  Scale, 
  Activity, 
  Package, 
  Building2 
} from 'lucide-react';

interface ProductCardProps {
  chemical: Chemical;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ chemical, isExpanded, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group h-full"
    >
      <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div 
          onClick={onToggle}
          className="cursor-pointer p-6 flex-1"
        >
          <div className="flex items-start justify-between h-full">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Beaker className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {chemical.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary/70 mb-3">
                <TestTube className="w-4 h-4" />
                <span>CAS: {chemical.cas_number}</span>
              </div>
              <p className="text-gray-600 line-clamp-3">
                {chemical.description}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4 mt-2"
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <DetailItem 
                  icon={<TestTube className="w-4 h-4" />}
                  label="Molecular Formula" 
                  value={chemical.molecular_formula}
                />
                <DetailItem 
                  icon={<Scale className="w-4 h-4" />}
                  label="Molecular Weight" 
                  value={chemical.molecular_weight}
                />
                <DetailItem 
                  icon={<Activity className="w-4 h-4" />}
                  label="Purity" 
                  value={chemical.purity}
                />
                <DetailItem 
                  icon={<Building2 className="w-4 h-4" />}
                  label="Grade" 
                  value={chemical.grade}
                />
              </div>
              
              <div className="space-y-3">
                <DetailItem 
                  icon={<Beaker className="w-4 h-4" />}
                  label="Applications" 
                  value={chemical.applications}
                />
                <DetailItem 
                  icon={<Building2 className="w-4 h-4" />}
                  label="Industries" 
                  value={chemical.industries}
                />
                <DetailItem 
                  icon={<Package className="w-4 h-4" />}
                  label="Packaging" 
                  value={chemical.packaging}
                />
              </div>
            </div>

            {chemical.image && (
              <div className="mt-6">
                <Image
                  src={chemical.image}
                  alt={chemical.name}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover mx-auto"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2">
    <div className="text-primary mt-1">{icon}</div>
    <div>
      <span className="text-sm font-medium text-gray-700 block">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  </div>
);

export default ProductCard; 