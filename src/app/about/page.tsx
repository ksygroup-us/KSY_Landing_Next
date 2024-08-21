'use client'
import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const coreValues = [
  {
    title: 'Trust',
    description: 'We build lasting partnerships through transparency and reliability.'
  },
  {
    title: 'Expertise',
    description: 'Our team delivers innovative solutions backed by industry knowledge.'
  },
  {
    title: 'Agility',
    description: 'We adapt swiftly to meet the evolving needs of our clients.'
  },
  {
    title: 'Quality',
    description: 'We maintain high standards to exceed customer expectations.'
  }
];

const teamMembers = [
  {
    name: "Kathan Patel",
    role: "Head of Business Development",
    image: "/images/kathan.jpeg",    
    linkedin: "https://www.linkedin.com/in/kkp244/",
    twitter: "https://twitter.com/kathan",
    email: "kathan@ksygroup.com"
  },
  {
    name: "Shivam Patel",
    role: "Head of Marketing",
    image: "/images/shivam.jpeg",
    linkedin: "https://www.linkedin.com/in/shivammpatel/",
    twitter: "https://twitter.com/shivam",
    email: "shivam@ksygroup.com"
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">About KSY Group LLC</h1>
        <p className="text-xl">Bridging the gap in global chemical distribution</p>
      </div>
      
      <div className="card bg-base-100 shadow-xl mb-16">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2020, KSY Group LLC emerged as a response to the global supply chain challenges in the chemical distribution sector. We saw an opportunity to redefine the industry and create more resilient solutions.
          </p>
          <p className="mb-4">
            Today, we focus on sourcing from India and importing to the United States, but our vision extends far beyond. We're committed to expanding our product range and global reach, always adapting to meet the needs of our international clients.
          </p>
          <p>
            As we grow, we're excited to bring innovative solutions and a fresh perspective to the chemical distribution landscape. Join us on this journey of growth and innovation!
          </p>
        </div>
      </div>
      
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {coreValues.map((value, index) => (
          <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body">
              <h3 className="card-title">{value.title}</h3>
              <p>{value.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Leadership Team</h2>
      <div className="flex flex-wrap justify-center gap-12 mb-16">
        {teamMembers.map((member, index) => (
          <div key={index} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <Image 
                src={member.image} 
                alt={member.name} 
                width={128}
                height={128}
                className="rounded-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">{member.name}</h3>
              <p>{member.role}</p>
              <div className="card-actions justify-center mt-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                  <FaLinkedin size={20} />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline">
                  <FaTwitter size={20} />
                </a>
                <a href={`mailto:${member.email}`} className="btn btn-circle btn-outline">
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-200 shadow-xl mb-16">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-4">Our Commitment to Excellence</h2>
          <p className="mb-4">
            At KSY Group LLC, we prioritize precision and reliability in chemical distribution. Our commitment includes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Thorough documentation and record-keeping</li>
            <li>Rigorous quality control</li>
            <li>Customer-centric problem-solving</li>
            <li>Continuous learning and improvement</li>
          </ul>
          <p>
            We combine industry experience with fresh perspectives to meet your evolving needs.
          </p>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Join Us on Our Journey</h2>
        <p className="text-xl mb-8">
          Experience the KSY Group LLC difference - where your chemical sourcing needs are our top priority.
        </p>
        <a href="/contact" className="btn btn-primary btn-lg">Connect With Us Today</a>
      </div>
    </div>
  );
};

export default AboutPage;
