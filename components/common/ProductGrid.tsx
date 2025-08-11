'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import Head from 'next/head';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <>
    <Head>
            <title>S&G Fast and Easy Buy | Online Products Stock</title>
            <meta
              name="description"
              content="Fast and Easy Online Shopping Platform"
            />
            <link rel="icon" href="/images/logo.png" />
          </Head>
    <div className="bg-lightblue-100 border-light-grove grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
    </>
  );
};

export default ProductGrid;
