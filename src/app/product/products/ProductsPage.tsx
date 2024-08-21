'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products data
    const fetchProducts = async () => {
      // Replace this with your actual API call or data fetching method
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [category, products]);

  return (
    <div className="flex flex-col items-center px-5 py-10">
      <h1 className="text-3xl font-bold mb-5">Products</h1>
      <div className="flex flex-col items-center">
        <div className="flex mb-5">
          <input
            type="text"
            placeholder="Search by category"
            value={category}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              params.set('category', e.target.value);
              window.history.pushState(null, '', `?${params.toString()}`);
            }}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card card-compact bg-base-300 shadow-md"
            >
              <figure>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain h-full w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="mt-2">
                  ${product.price} - {product.description}
                </p>
                <div className="mt-2">
                  <span className="badge badge-primary mr-2">
                    {product.rating} stars
                  </span>
                  <span className="badge badge-secondary">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}