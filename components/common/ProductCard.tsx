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
  const productPrice = Number(product.price); // ensure number for .toFixed()
  const productImage = product.primary_image; // match backend key

  return (
    <div className="bg-lightblue-200 border rounded-lg p-4 flex flex-col">
      {productImage && (
        <Image
          src={productImage}
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
      <p className="mt-2 font-bold">${productPrice.toFixed(2)}</p>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              product,
              quantity: 1,
              // store numeric price in cart 
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
// /components/common/ProductCard.tsx