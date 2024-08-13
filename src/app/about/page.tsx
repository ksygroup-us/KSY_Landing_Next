import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const coreValues = [
  {
    title: 'Trust',
    description: 'Built on a foundation of integrity, our partnerships are characterized by transparency, reliability, and a deep commitment to our clients’ success.'
  },
  {
    title: 'Expertise',
    description: 'Our team’s unparalleled knowledge and industry experience enable us to deliver innovative solutions tailored to the unique challenges of our clients.'
  },
  {
    title: 'Agility',
    description: 'In a rapidly evolving industry, we pride ourselves on our ability to adapt swiftly and efficiently, ensuring we meet the dynamic needs of our clients.'
  },
  {
    title: 'Quality',
    description: 'We adhere to the highest standards of excellence, ensuring that every product we deliver meets rigorous quality benchmarks and exceeds customer expectations.'
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
  // {
  //   name: "Yash Patel",
  //   role: "Head of Analytics",
  //   image: "/images/yash.jpeg",
  //   linkedin: "https://www.linkedin.com/in/yash-patel-0b561b138/",
  //   twitter: "https://twitter.com/yash",
  //   email: "yash@ksygroup.com"
  // }
];

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">About KSY Group LLC</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
        <p className="mb-4 text-lg">
        KSY Group LLC was established amid the global disruptions of the 2020 pandemic, emerging as a pivotal player in the chemical distribution sector. As the world faced unprecedented supply chain challenges, our founders recognized not merely obstacles but opportunities to redefine the landscape of chemical distribution on a global scale.
        </p>
        <p className="mb-4 text-lg">
        The Suez Canal blockage in 2021 further underscored the necessity for a more resilient, adaptable, and innovative approach to chemical sourcing and distribution. In response, KSY Group LLC positioned itself as a forward-thinking leader equipped to address the evolving demands of the industry.
        </p>
        <p className="mb-4 text-lg">
          The subsequent Suez Canal blockage further underscored the necessity for a more resilient, adaptable, and innovative approach to chemical sourcing and distribution. KSY Group LLC responded to this imperative, positioning itself as a forward-thinking leader equipped to address the evolving demands of the industry.
        </p> 
        <p className="text-lg">
          At present, we stand as a testament to resilience, expertise, and unwavering dedication to quality. Our operations are concentrated on sourcing from India and importing to the United States. However, our ambitions are far-reaching. We are committed to expanding our product portfolio and extending our geographic reach, with the goal of establishing a truly global presence in the chemical distribution arena.
        </p>
        <p className="text-lg">
          Looking forward, we anticipate enhancing our offerings by incorporating a broader array of products and extending our operations to additional countries. Our commitment to adaptation and innovation remains steadfast, ensuring we continue to meet the dynamic needs of our international clientele.
        </p>
        </div>
        {/* <div className="relative h-96 md:h-auto">
          <Image 
            src="/images/global-chemical-distribution.jpg" 
            alt="Global Chemical Distribution" 
            layout="fill" 
            objectFit="cover" 
            className="rounded-lg shadow-xl"
          />
        </div> */}
      </div>
      
      <h2 className="text-3xl font-semibold mb-8 text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {
            coreValues.map((value, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center">Meet Our Leadership Team</h2>
      <div className="flex flex-wrap justify-center gap-12 mb-16">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full sm:w-80 md:w-64 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image 
                src={member.image} 
                alt={member.name} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-full border-4 border-primary"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-4">{member.role}</p>
            <div className="flex justify-center space-x-4">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <FaLinkedin size={24} />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </a>
              <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gray-800">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gray-100 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Commitment to Excellence</h2>
        <p className="text-lg mb-4">
          At KSY Group LLC, we understand that in the world of chemical distribution, precision and reliability are paramount. That&apos;s why we&apos;ve built our reputation on:
        </p>
        <ul className="list-disc list-inside mb-4 text-lg">
          <li>Meticulous documentation and record-keeping</li>
          <li>Stringent quality control measures</li>
          <li>A customer-first approach to problem-solving</li>
          <li>Continuous learning and adaptation to industry best practices</li>
        </ul>
        <p className="text-lg">
          Our founders bring a wealth of experience and a fresh perspective to the industry, combining time-tested wisdom with innovative approaches to meet the evolving needs of our clients.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Join Us on Our Journey</h2>
        <p className="text-xl mb-8">
          As we expand our global footprint, we invite you to be part of our story. Experience the KSY Group LLC difference - where trust meets expertise, and where your chemical sourcing needs are not just met, but exceeded.
        </p>
        <a href="/contact" className="btn btn-primary btn-lg">Connect With Us Today</a>
      </section>
    </div>
  );
};

export default AboutPage;
