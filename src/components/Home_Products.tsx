import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

interface ProductCategory {
  name: string;
  subtext: string;
  image: string;
}

const productCategories: ProductCategory[] = [
  { name: "Organic Chemicals", subtext: "Carbon-based compounds Bulk & Fine Chemicals", image: "/images/organic-chemicals.jpeg" },
  { name: "Inorganic Chemicals", subtext: "Mineral-based chemicals for industrial use", image: "/images/inorganic-chemicals.jpg" },
  { name: "Agro Chemicals", subtext: "Enhancing agricultural productivity and crop protection", image: "/images/agro-chemicals.jpg" },
  { name: "Cosmetic Chemicals", subtext: "Innovative solutions for personal care products", image: "/images/cosmetic-chemicals.jpg" },
  { name: "Construction Chemicals", subtext: "Improving durability and performance in building materials", image: "/images/construction-chemicals.jpg" },
  { name: "Nutraceuticals", subtext: "Health-promoting compounds for dietary supplements", image: "/images/nutraceuticals.jpg" }
];

const ProductSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-10 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-8">Our Chemical Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src={category.image} 
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.subtext}</p>
                <Button
                  variant="default"
                  size="sm"
                  // asChild
                >
                  <Link href={`/product/products?category=${encodeURIComponent(category.name)}`}>
                    Explore
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;