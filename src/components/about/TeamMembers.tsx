'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  twitter: string;
  github?: string;
  email: string;
}

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ size: number }>;
}

const teamMembers: TeamMember[] = [
  {
    name: "Kathan Patel",
    role: "Head of Business Development",
    image: "/images/kathan.jpeg",    
    linkedin: "https://www.linkedin.com/in/kkp244/",
    twitter: "https://twitter.com/patelkathan24",
    github: "https://github.com/kathanp",
    email: "kathan@ksygroup.us"
  },
  {
    name: "Shivam Patel",
    role: "Head of Marketing",
    image: "/images/Shivam Headshot.jpeg",
    linkedin: "https://www.linkedin.com/in/shivammpatel/",
    twitter: "https://twitter.com/shivam",
    email: "shivam@ksygroup.us"
  }
];

export const TeamMembers = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-12 text-center"
        >
          Meet Our Leadership Team
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full max-w-sm"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="p-8">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {member.role}
                  </p>
                  <div className="flex justify-center gap-4">
                    <SocialLink href={member.linkedin} icon={FaLinkedin} />
                    <SocialLink href={member.twitter} icon={FaTwitter} />
                    {member.github && <SocialLink href={member.github} icon={FaGithub} />}
                    <SocialLink href={`mailto:${member.email}`} icon={FaEnvelope} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
  >
    <Icon size={20} />
  </a>
); 