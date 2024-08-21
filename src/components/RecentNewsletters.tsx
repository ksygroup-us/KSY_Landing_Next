'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Newsletter {
  id: number;
  title: string;
  date: string;
  previewImage: string;
  link: string;
}

const RecentNewsletters: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    // Simulating an API call to fetch newsletters
    // Replace this with an actual API call in production
    const fetchNewsletters = async () => {
      const mockNewsletters: Newsletter[] = [
        {
          id: 1,
          title: "Innovations in Green Chemistry",
          date: "2023-05-15",
          previewImage: "/images/newsletter1.jpg",
          link: "/newsletters/innovations-in-green-chemistry"
        },
        {
          id: 2,
          title: "Global Supply Chain Updates",
          date: "2023-06-01",
          previewImage: "/images/newsletter2.jpg",
          link: "/newsletters/global-supply-chain-updates"
        },
        {
          id: 3,
          title: "Emerging Trends in Industrial Chemicals",
          date: "2023-06-15",
          previewImage: "/images/newsletter3.jpg",
          link: "/newsletters/emerging-trends-industrial-chemicals"
        }
      ];
      setNewsletters(mockNewsletters);
    };

    fetchNewsletters();
  }, []);

  return (
    <section className="bg-base-200 py-10 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Newsletters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <motion.div
              key={newsletter.id}
              className="card bg-base-100 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <figure>
                <Image
                  src={newsletter.previewImage}
                  alt={newsletter.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{newsletter.title}</h3>
                <p className="text-sm text-gray-500">{new Date(newsletter.date).toLocaleDateString()}</p>
                <div className="card-actions justify-end mt-4">
                  <Link href={newsletter.link} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentNewsletters;