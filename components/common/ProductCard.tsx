'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '@/types/product';
import { addToCart } from '@/redux/cartSlice';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const numericPrice = Number(product.price);

  // ✅ Build full image URL if it's just a filename
  const baseImageUrl = 'https://minio.sakachris.com/product-images/products/';
  const imageUrl = product.primary_image?.startsWith('http')
    ? product.primary_image
    : `${baseImageUrl}${product.primary_image}`;

  return (
    <div className="border rounded-lg p-4 flex flex-col bg-white shadow-sm">
      {product.primary_image && (
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-md"
        />
      )}

      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      {product.description && (
        <p className="text-gray-500 text-sm">{product.description}</p>
      )}
      <p className="mt-2 font-bold">${numericPrice.toFixed(2)}</p>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              product: { ...product, price: numericPrice.toFixed(2) }, // ✅ Ensure numeric
              quantity: 1,
            })
          )
        }
        className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
