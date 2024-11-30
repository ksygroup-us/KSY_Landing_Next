'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    category: "Product Information",
    questions: [
      {
        question: "What documents are required for product quality verification?",
        answer: (
          <div className="space-y-3">
            <p>We provide comprehensive documentation for all our products:</p>
            <ul className="space-y-2 list-disc pl-4">
              <li><span className="font-medium">Certificate of Analysis (COA):</span> Detailed composition and purity specifications</li>
              <li><span className="font-medium">Safety Data Sheet (SDS):</span> Safety guidelines and handling procedures</li>
              <li><span className="font-medium">Technical Data Sheet (TDS):</span> Product specifications and performance data</li>
            </ul>
          </div>
        )
      },
      {
        question: "What types of chemicals do you import?",
        answer: (
          <div className="space-y-3">
            <p>Our diverse chemical portfolio includes:</p>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 list-disc pl-4">
                <li>Organic Chemicals</li>
                <li>Inorganic Chemicals</li>
                <li>Specialty Chemicals</li>
              </ul>
              <ul className="space-y-2 list-disc pl-4">
                <li>Fine Chemicals</li>
                <li>Industrial Chemicals</li>
                <li>Agricultural Chemicals</li>
              </ul>
            </div>
          </div>
        )
      }
    ]
  },
  {
    category: "Orders & Samples",
    questions: [
      {
        question: "How can I request a sample?",
        answer: (
          <div className="space-y-3">
            <p>To request a sample, follow these steps:</p>
            <ol className="space-y-2 list-decimal pl-4">
              <li>Email your request to <span className="text-primary">samples@ksygroup.us</span></li>
              <li>Include product details and required quantity</li>
              <li>Provide shipping information</li>
              <li>We'll respond with availability and pricing</li>
            </ol>
          </div>
        )
      },
      {
        question: "How do you ensure product quality?",
        answer: (
          <div className="space-y-3">
            <p>Our quality control process includes:</p>
            <ul className="space-y-2 list-disc pl-4">
              <li>Sourcing from certified manufacturers</li>
              <li>Regular supplier audits</li>
              <li>Batch-specific COA verification</li>
              <li>Quality checks at receipt</li>
              <li>Proper storage and handling protocols</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    category: "Contact & Support",
    questions: [
      {
        question: "What's the best way to reach us?",
        answer: (
          <div className="space-y-3">
            <p>Contact us through any of these channels:</p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="font-medium">📞 Phone:</span>
                <span>(669) 295-3313</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-medium">📧 Email:</span>
                <span>info@ksygroup.us</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="font-medium">🌐 Web:</span>
                <span>Contact form on this page</span>
              </li>
            </ul>
          </div>
        )
      }
    ]
  }
];

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={false}
    className="border border-gray-200 rounded-lg overflow-hidden bg-white/70 hover:bg-white/90 transition-colors duration-300"
  >
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
    >
      <span className="text-lg font-medium text-gray-900">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-5 h-5 text-gray-500" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-6 pb-4 text-gray-600">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(current =>
      current.includes(itemId)
        ? current.filter(id => id !== itemId)
        : [...current, itemId]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Frequently Asked Questions
      </h2>
      
      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {category.category}
          </h3>
          <div className="space-y-3">
            {category.questions.map((faq, faqIndex) => (
              <FAQItem
                key={`${categoryIndex}-${faqIndex}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openItems.includes(`${categoryIndex}-${faqIndex}`)}
                onClick={() => toggleItem(`${categoryIndex}-${faqIndex}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}; 