'use client';
import { Product } from '@/types/product';
import React from 'react';
import Image from 'next/image';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col">
      <Image
        src={product.image}
        alt={product.name}
        className="object-cover h-48 w-full rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.description}</h3>
      <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
      <button
        type="button"
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </article>
  );
};

export default ProductCard;
