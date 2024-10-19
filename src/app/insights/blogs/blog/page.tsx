'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Mock data for a single blog post
const blogPost = [
  {
    id: 1,
    title: "The Future of Green Chemistry",
    excerpt: "Exploring sustainable practices in the chemical industry...",
    content: `
      <p>The chemical industry is at a pivotal point in its history. As global awareness of environmental issues grows, so does the pressure on chemical manufacturers to adopt more sustainable practices. This shift towards "green chemistry" is not just about compliance with regulations; it's about reimagining the entire lifecycle of chemical products, from design to disposal.</p>
      
      <h2>What is Green Chemistry?</h2>
      <p>Green chemistry, also known as sustainable chemistry, is the design of chemical products and processes that reduce or eliminate the use and generation of hazardous substances. It applies across the life cycle of a chemical product, including its design, manufacture, use, and ultimate disposal.</p>
      
      <h2>Key Principles of Green Chemistry</h2>
      <ul>
        <li>Prevention of waste</li>
        <li>Atom economy</li>
        <li>Less hazardous chemical syntheses</li>
        <li>Designing safer chemicals</li>
        <li>Safer solvents and auxiliaries</li>
        <li>Design for energy efficiency</li>
        <li>Use of renewable feedstocks</li>
        <li>Reduce derivatives</li>
        <li>Catalysis</li>
        <li>Design for degradation</li>
        <li>Real-time analysis for pollution prevention</li>
        <li>Inherently safer chemistry for accident prevention</li>
      </ul>
      
      <h2>Innovations in Green Chemistry</h2>
      <p>Recent advancements in green chemistry have led to exciting innovations:</p>
      <ol>
        <li><strong>Bio-based Materials:</strong> Development of plastics and other materials derived from renewable resources like corn starch or vegetable oil.</li>
        <li><strong>Green Solvents:</strong> Use of supercritical CO2 or water as environmentally benign alternatives to traditional organic solvents.</li>
        <li><strong>Catalysis:</strong> Design of more efficient catalysts that reduce energy requirements and waste in chemical reactions.</li>
        <li><strong>Renewable Energy in Manufacturing:</strong> Integration of solar and wind power in chemical production processes.</li>
      </ol>
      
      <h2>The Future Outlook</h2>
      <p>As we look to the future, green chemistry will play an increasingly crucial role in addressing global challenges such as climate change, resource depletion, and pollution. The chemical industry has the potential to be a leader in sustainability, driving innovation that benefits both the environment and the economy.</p>
      
      <p>The path forward will require collaboration between industry, academia, and government to foster research, develop new technologies, and create supportive policies. By embracing the principles of green chemistry, we can ensure a more sustainable and prosperous future for generations to come.</p>
    `,
    image: "/images/green-chemistry.jpg",
    date: "2024-03-15",
    author: "Dr. Jane Smith",
    authorBio: "Dr. Jane Smith is a renowned chemist specializing in sustainable practices in the chemical industry. She has published numerous papers on green chemistry and is a frequent speaker at international conferences.",
    readTime: "8 min read",
    tags: ["Green Chemistry", "Sustainability", "Innovation", "Environmental Science"]
  },
  {
    id: 2,
    title: "Innovations in Chemical Manufacturing",
    excerpt: "New technologies reshaping production processes, from 3D printing to nanotech applications in the chemical industry.",
    content: `
      <p>The landscape of chemical manufacturing is undergoing a radical transformation, driven by cutting-edge technologies that promise to revolutionize production processes. From 3D printing to nanotechnology, these innovations are not just enhancing efficiency but are also opening up new possibilities for product development and customization.</p>
      
      <h2>3D Printing in Chemical Manufacturing</h2>
      <p>3D printing, or additive manufacturing, is making significant inroads in the chemical industry. This technology allows for:</p>
      <ul>
        <li>Rapid prototyping of chemical reactors and equipment</li>
        <li>Production of complex geometries impossible with traditional manufacturing methods</li>
        <li>On-demand manufacturing of spare parts, reducing downtime</li>
        <li>Creation of custom catalysts with optimized surface areas</li>
      </ul>
      
      <h2>Nanotechnology Applications</h2>
      <p>Nanotechnology is enabling unprecedented control over material properties at the molecular level. Key applications include:</p>
      <ul>
        <li>Development of high-performance nanomaterials for various industries</li>
        <li>Nanostructured catalysts for more efficient chemical reactions</li>
        <li>Nanofilters for advanced water and air purification systems</li>
        <li>Nanocoatings for corrosion resistance and self-cleaning surfaces</li>
      </ul>
      
      <h2>Internet of Things (IoT) and Industry 4.0</h2>
      <p>The integration of IoT and Industry 4.0 principles is transforming chemical plants into smart factories. Benefits include:</p>
      <ul>
        <li>Real-time monitoring and optimization of production processes</li>
        <li>Predictive maintenance to prevent equipment failures</li>
        <li>Enhanced safety through continuous environmental monitoring</li>
        <li>Improved supply chain management and inventory control</li>
      </ul>
      
      <h2>Artificial Intelligence and Machine Learning</h2>
      <p>AI and ML are revolutionizing chemical manufacturing by:</p>
      <ul>
        <li>Optimizing reaction conditions for maximum yield and efficiency</li>
        <li>Predicting product properties and performance</li>
        <li>Accelerating the discovery of new materials and compounds</li>
        <li>Enhancing quality control through advanced image recognition</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As these technologies continue to evolve and integrate, the chemical manufacturing industry is poised for a new era of innovation. Companies that embrace these advancements will be well-positioned to lead in efficiency, sustainability, and product innovation.</p>
    `,
    image: "/images/chemical-manufacturing.jpg",
    date: "2024-03-10",
    author: "John Doe",
    authorBio: "John Doe is a chemical engineer with over 15 years of experience in process optimization and innovation in the chemical manufacturing sector.",
    readTime: "10 min read",
    tags: ["Chemical Manufacturing", "3D Printing", "Nanotechnology", "IoT", "Artificial Intelligence"]
  },
  {
    id: 3,
    title: "The Impact of AI on Chemical Research",
    excerpt: "How artificial intelligence is accelerating discoveries, from drug development to materials science breakthroughs.",
    content: `
      <p>Artificial Intelligence (AI) is revolutionizing the field of chemical research, accelerating discoveries and opening up new frontiers in areas ranging from drug development to materials science. This technological leap is not just enhancing existing processes; it's fundamentally changing how chemical research is conducted.</p>
      
      <h2>AI in Drug Discovery</h2>
      <p>The pharmaceutical industry is leveraging AI to streamline the drug discovery process:</p>
      <ul>
        <li>Predicting drug-target interactions with machine learning models</li>
        <li>Designing novel molecules with desired properties</li>
        <li>Optimizing lead compounds for efficacy and safety</li>
        <li>Repurposing existing drugs for new therapeutic applications</li>
      </ul>
      
      <h2>Materials Science Breakthroughs</h2>
      <p>AI is accelerating materials discovery and optimization:</p>
      <ul>
        <li>Predicting material properties without extensive physical testing</li>
        <li>Designing new alloys and composites with specific characteristics</li>
        <li>Optimizing material formulations for improved performance</li>
        <li>Discovering novel materials for energy storage and conversion</li>
      </ul>
      
      <h2>Process Optimization</h2>
      <p>AI algorithms are enhancing chemical processes:</p>
      <ul>
        <li>Optimizing reaction conditions for maximum yield and selectivity</li>
        <li>Predicting and preventing equipment failures in chemical plants</li>
        <li>Reducing energy consumption in manufacturing processes</li>
        <li>Enhancing quality control through advanced data analysis</li>
      </ul>
      
      <h2>Challenges and Future Directions</h2>
      <p>While AI presents immense opportunities, there are challenges to address:</p>
      <ul>
        <li>Ensuring the reliability and interpretability of AI models</li>
        <li>Integrating AI with traditional chemical knowledge and intuition</li>
        <li>Addressing data quality and availability issues</li>
        <li>Developing ethical guidelines for AI use in chemical research</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As AI continues to evolve, its impact on chemical research will only grow. The synergy between human expertise and machine intelligence promises to unlock new possibilities, accelerating innovation and discovery in ways we're only beginning to imagine.</p>
    `,
    image: "/images/ai-research.jpg",
    date: "2024-03-05",
    author: "Dr. Alex Johnson",
    authorBio: "Dr. Alex Johnson is a computational chemist specializing in the application of AI and machine learning in chemical research and drug discovery.",
    readTime: "12 min read",
    tags: ["Artificial Intelligence", "Drug Discovery", "Materials Science", "Process Optimization", "Chemical Research"]
  },
  {
    id: 4,
    title: "Regulatory Challenges in the Chemical Industry",
    excerpt: "Navigating the complex landscape of chemical regulations, including REACH, GHS, and emerging global standards.",
    content: `
      <p>The chemical industry operates in an increasingly complex regulatory environment, with stringent standards and evolving global requirements. Understanding and complying with these regulations is crucial for companies to maintain operations, ensure product safety, and access markets worldwide.</p>
      
      <h2>REACH Regulation</h2>
      <p>The Registration, Evaluation, Authorization, and Restriction of Chemicals (REACH) regulation in the European Union:</p>
      <ul>
        <li>Requires registration of chemical substances manufactured or imported in quantities of 1 tonne or more per year</li>
        <li>Mandates safety assessments and risk management measures</li>
        <li>Implements authorization procedures for substances of very high concern (SVHCs)</li>
        <li>Impacts global supply chains due to the EU's market size</li>
      </ul>
      
      <h2>Globally Harmonized System (GHS)</h2>
      <p>The GHS for classification and labeling of chemicals:</p>
      <ul>
        <li>Standardizes hazard communication across different countries</li>
        <li>Requires specific labeling and safety data sheet formats</li>
        <li>Enhances worker safety and emergency response capabilities</li>
        <li>Facilitates international trade by harmonizing standards</li>
      </ul>
      
      <h2>Emerging Global Standards</h2>
      <p>New and evolving regulations worldwide:</p>
      <ul>
        <li>China REACH: Similar to EU REACH but with unique requirements</li>
        <li>US Toxic Substances Control Act (TSCA) reform: Enhancing chemical safety assessments</li>
        <li>Biocidal Products Regulation: Governing the use of biocides in the EU</li>
        <li>Nanomaterial regulations: Addressing the unique properties and potential risks of nanoscale materials</li>
      </ul>
      
      <h2>Challenges for the Industry</h2>
      <p>Key regulatory challenges facing chemical companies:</p>
      <ul>
        <li>Keeping up with rapidly changing regulations across multiple jurisdictions</li>
        <li>Managing the costs associated with compliance and testing</li>
        <li>Navigating differences in regulatory approaches between regions</li>
        <li>Balancing innovation with regulatory requirements</li>
      </ul>
      
      <h2>Strategies for Compliance</h2>
      <p>Approaches for effective regulatory management:</p>
      <ul>
        <li>Implementing robust chemical management systems</li>
        <li>Engaging in industry consortia for shared compliance efforts</li>
        <li>Investing in regulatory expertise and staying informed of upcoming changes</li>
        <li>Adopting green chemistry principles to anticipate future regulations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As regulations continue to evolve, chemical companies must remain vigilant and adaptive. Proactive engagement with regulatory challenges can not only ensure compliance but also drive innovation and create competitive advantages in the global marketplace.</p>
    `,
    image: "/images/regulatory-challenges.jpg",
    date: "2024-02-28",
    author: "Sarah Brown",
    authorBio: "Sarah Brown is a regulatory affairs specialist with extensive experience in navigating global chemical regulations and advising multinational corporations on compliance strategies.",
    readTime: "15 min read",
    tags: ["Chemical Regulations", "REACH", "GHS", "Compliance", "Global Standards"]
  },
  {
    id: 5,
    title: "Sustainable Packaging Solutions",
    excerpt: "Exploring eco-friendly alternatives to traditional chemical packaging, from biodegradable materials to reusable containers.",
    content: `
      <p>The chemical industry is increasingly focusing on sustainable packaging solutions to reduce environmental impact and meet growing consumer and regulatory demands for eco-friendly practices. This shift is driving innovation in materials, design, and lifecycle management of chemical packaging.</p>
      
      <h2>Biodegradable Packaging Materials</h2>
      <p>Emerging biodegradable options for chemical packaging:</p>
      <ul>
        <li>PLA (Polylactic Acid) derived from renewable resources like corn starch</li>
        <li>PHAs (Polyhydroxyalkanoates) produced by microorganisms</li>
        <li>Cellulose-based materials for non-reactive chemicals</li>
        <li>Biodegradable coatings to enhance traditional packaging materials</li>
      </ul>
      
      <h2>Reusable Container Systems</h2>
      <p>Implementing circular economy principles in chemical packaging:</p>
      <ul>
        <li>Durable, multi-use containers for industrial chemicals</li>
        <li>Standardized packaging designs to facilitate reuse across different products</li>
        <li>Tracking systems for efficient return and refill processes</li>
        <li>Cleaning and reconditioning services for reusable containers</li>
      </ul>
      
      <h2>Innovative Packaging Designs</h2>
      <p>New approaches to packaging design for sustainability:</p>
      <ul>
        <li>Lightweight designs to reduce material use and transportation emissions</li>
        <li>Modular packaging systems for flexible and efficient use</li>
        <li>Concentrated product formulations to minimize packaging needs</li>
        <li>Smart packaging with built-in indicators for product integrity and safety</li>
      </ul>
      
      <h2>Recycled Content Integration</h2>
      <p>Incorporating recycled materials in chemical packaging:</p>
      <ul>
        <li>Post-consumer recycled (PCR) plastics in non-critical applications</li>
        <li>Chemical recycling technologies to produce high-quality recycled materials</li>
        <li>Hybrid packaging combining recycled and virgin materials for optimal performance</li>
        <li>Closed-loop recycling systems within the chemical industry</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>Key factors in adopting sustainable packaging solutions:</p>
      <ul>
        <li>Ensuring chemical compatibility and safety with new packaging materials</li>
        <li>Meeting regulatory requirements for hazardous materials packaging</li>
        <li>Balancing sustainability with cost-effectiveness and market demands</li>
        <li>Developing infrastructure for collection, recycling, and reuse of packaging</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The transition to sustainable packaging in the chemical industry represents both a challenge and an opportunity. By embracing innovative solutions and collaborating across the value chain, companies can reduce their environmental footprint while potentially uncovering new efficiencies and market advantages.</p>
    `,
    image: "/images/sustainable-packaging.jpg",
    date: "2024-02-20",
    author: "Emily Chen",
    authorBio: "Emily Chen is a packaging engineer specializing in sustainable solutions for the chemical industry, with a focus on circular economy principles and eco-design.",
    readTime: "11 min read",
    tags: ["Sustainable Packaging", "Biodegradable Materials", "Reusable Containers", "Recycling", "Eco-design"]
  },
  {
    id: 6,
    title: "The Rise of Biocatalysis",
    excerpt: "How enzymes and microorganisms are revolutionizing chemical synthesis, offering greener and more efficient production methods.",
    content: `
      <p>Biocatalysis, the use of natural catalysts such as enzymes and microorganisms to perform chemical transformations, is emerging as a game-changer in the chemical industry. This approach offers numerous advantages in terms of efficiency, selectivity, and environmental sustainability.</p>
      
      <h2>Advantages of Biocatalysis</h2>
      <p>Key benefits driving the adoption of biocatalytic processes:</p>
      <ul>
        <li>High selectivity, reducing unwanted by-products</li>
        <li>Mild reaction conditions, lowering energy requirements</li>
        <li>Biodegradable catalysts, minimizing environmental impact</li>
        <li>Potential for one-pot multi-step reactions, simplifying processes</li>
      </ul>
      
      <h2>Applications in the Chemical Industry</h2>
      <p>Growing areas of biocatalysis implementation:</p>
      <ul>
        <li>Pharmaceutical synthesis, especially for complex chiral compounds</li>
        <li>Fine chemical production, including flavors and fragrances</li>
        <li>Biofuel production from renewable feedstocks</li>
        <li>Polymer synthesis and modification</li>
      </ul>
      
      <h2>Enzyme Engineering and Directed Evolution</h2>
      <p>Advancing biocatalyst capabilities through biotechnology:</p>
      <ul>
        <li>Tailoring enzyme properties for specific industrial applications</li>
        <li>Enhancing enzyme stability and activity in non-natural conditions</li>
        <li>Developing enzymes for non-natural reactions</li>
        <li>High-throughput screening methods for rapid enzyme optimization</li>
      </ul>
      
      <h2>Whole-Cell Biocatalysis</h2>
      <p>Utilizing entire microorganisms as biocatalysts:</p>
      <ul>
        <li>Multi-step biotransformations within a single organism</li>
        <li>Self-regeneration of cofactors, reducing process costs</li>
        <li>Potential for continuous flow processes</li>
        <li>Challenges in product separation and purification</li>
      </ul>
      
      <h2>Integration with Green Chemistry</h2>
      <p>Synergies between biocatalysis and green chemistry principles:</p>
      <ul>
        <li>Use of renewable feedstocks and biobased solvents</li>
        <li>Reduction in waste generation and energy consumption</li>
        <li>Improved atom economy in chemical transformations</li>
        <li>Enhanced safety profiles of chemical processes</li>
      </ul>
      
      <h2>Future Perspectives</h2>
      <p>Emerging trends and opportunities in biocatalysis:</p>
      <ul>
        <li>Artificial metalloenzymes combining biological and chemical catalysis</li>
        <li>Integration of biocatalysis with flow chemistry and microreactor technology</li>
        <li>Expansion into bulk chemical production</li>
        <li>Development of cell-free biocatalytic systems</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As biocatalysis continues to advance, it promises to revolutionize chemical synthesis by offering greener, more efficient, and more selective production methods. The integration of biotechnology with traditional chemical processes is opening new avenues for innovation and sustainability in the chemical industry.</p>
    `,
    image: "/images/biocatalysis.jpg",
    date: "2024-02-15",
    author: "Dr. Michael Rodriguez",
    authorBio: "Dr. Michael Rodriguez is a biochemist with extensive experience in enzyme engineering and industrial biocatalysis applications.",
    readTime: "13 min read",
    tags: ["Biocatalysis", "Enzyme Engineering", "Green Chemistry", "Biotechnology", "Sustainable Production"]
  },
  {
    id: 7,
    title: "Safety Innovations in Chemical Laboratories",
    excerpt: "Cutting-edge technologies and protocols enhancing safety in chemical research environments, from smart PPE to AI-powered risk assessment.",
    content: `
      <p>Safety in chemical laboratories is paramount, and recent innovations are transforming how researchers and institutions approach risk management and accident prevention. From advanced personal protective equipment (PPE) to AI-driven safety systems, these technologies are creating safer, more efficient research environments.</p>
      
      <h2>Smart Personal Protective Equipment (PPE)</h2>
      <p>Next-generation PPE enhancing user safety and comfort:</p>
      <ul>
        <li>Chemical-resistant gloves with embedded sensors for detecting breaches</li>
        <li>Smart safety goggles with augmented reality displays for real-time hazard information</li>
        <li>Adaptive respirators that adjust filtration based on detected airborne hazards</li>
        <li>Wearable devices monitoring vital signs and environmental conditions</li>
      </ul>
      
      <h2>AI-Powered Risk Assessment</h2>
      <p>Leveraging artificial intelligence for proactive safety management:</p>
      <ul>
        <li>Predictive modeling of potential hazards in experimental setups</li>
        <li>Real-time analysis of laboratory conditions and chemical interactions</li>
        <li>Automated safety protocol suggestions based on planned experiments</li>
        <li>Continuous learning systems improving risk assessment accuracy over time</li>
      </ul>
      
      <h2>Advanced Ventilation and Containment Systems</h2>
      <p>Innovative approaches to managing air quality and chemical containment:</p>
      <ul>
        <li>Smart fume hoods with adaptive airflow based on detected hazards</li>
        <li>Modular containment systems for flexible lab configurations</li>
        <li>Nanoparticle filtration systems for emerging nanomaterial research</li>
        <li>Energy-efficient ventilation designs reducing environmental impact</li>
      </ul>
      
      <h2>Integrated Safety Management Systems</h2>
      <p>Comprehensive digital platforms for laboratory safety:</p>
      <ul>
        <li>Centralized chemical inventory management with real-time tracking</li>
        <li>Digital lab notebooks with built-in safety checks and protocols</li>
        <li>Automated emergency response systems with direct links to first responders</li>
        <li>Virtual reality training modules for hazardous scenarios</li>
      </ul>
      
      <h2>Robotics and Automation in Hazardous Tasks</h2>
      <p>Reducing human exposure through robotics:</p>
      <ul>
        <li>Robotic systems for handling highly toxic or reactive materials</li>
        <li>Automated high-throughput screening reducing manual sample handling</li>
        <li>Teleoperated equipment for remote operation of hazardous processes</li>
        <li>Collaborative robots (cobots) assisting in routine laboratory tasks</li>
      </ul>
      
      <h2>Sustainable Safety Practices</h2>
      <p>Integrating safety with environmental responsibility:</p>
      <ul>
        <li>Green chemistry principles in experimental design reducing hazardous waste</li>
        <li>Eco-friendly alternatives to traditional cleaning and decontamination agents</li>
        <li>Energy-efficient safety equipment reducing laboratory carbon footprint</li>
        <li>Recycling and safe disposal programs for laboratory consumables</li>
      </ul>
      
      <h2>Future Directions</h2>
      <p>Emerging trends in laboratory safety innovation:</p>
      <ul>
        <li>Integration of Internet of Things (IoT) devices for comprehensive lab monitoring</li>
        <li>Blockchain technology for transparent and tamper-proof safety records</li>
        <li>Personalized safety protocols based on individual researcher profiles</li>
        <li>Advanced materials science for next-generation protective equipment</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>As chemical research continues to push boundaries, safety innovations are keeping pace, creating environments where scientific discovery can flourish without compromising on protection. By embracing these cutting-edge technologies and protocols, laboratories can significantly enhance their safety profiles, protect their personnel, and optimize their research capabilities.</p>
    `,
    image: "/images/lab-safety.jpg",
    date: "2024-02-08",
    author: "Lisa Thompson",
    authorBio: "Lisa Thompson is a chemical safety specialist with a background in materials science and a focus on implementing innovative safety technologies in research environments.",
    readTime: "14 min read",
    tags: ["Laboratory Safety", "Smart PPE", "AI Risk Assessment", "Robotics", "Sustainable Practices"]
  }
];

export default function BlogPost() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));
  const post = blogPost.find(post => post.id === id);

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Link href="/insights/blogs" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-6 inline-block">
        ← Back to All Blogs
      </Link>
      
      <article className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
            <span className="mr-4">|</span>
            <span className="mr-4">{post.readTime}</span>
            <span className="mr-4">|</span>
            <span>By {post.author}</span>
          </div>
          
          <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          
          <div className="border-t border-gray-200 pt-6 mt-8">
            <h3 className="text-2xl font-semibold mb-2">About the Author</h3>
            <p className="text-gray-600">{post.authorBio}</p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-12 text-center">
        <Link href="/insights/blogs" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
          Read More Articles
        </Link>
      </div>
    </div>
  );
}