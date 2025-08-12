'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '@/types/product';
import { addToCart } from '@/redux/cartSlice';
import Image from 'next/image';
import Head from 'next/head';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const productPrice = Number(product.price); // ensure number
  const productImage = product.primary_image || '/images/placeholder.png';

  return (
    <>
      <Head>
        <title>{product.name} | S&G Fast and Easy Buy</title>
        <meta
          name="description"
          content={`Buy ${product.name} at S&G Fast and Easy Buy`}
        />
      </Head>

      <div className="bg-lightblue-200 border rounded-lg p-4 flex flex-col">
        {productImage && (
          <div className="relative w-full h-48">
            <Image
              src={productImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-md"
              priority={true} // loads faster
              unoptimized={false} // let next/image optimize now that next.config.js allows it
            />
          </div>
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
              })
            )
          }
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default ProductCard;
// Note: Ensure that the product object passed to this component has the correct structure