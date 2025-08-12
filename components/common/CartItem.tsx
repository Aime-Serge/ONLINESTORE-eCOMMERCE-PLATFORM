

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { CartItem as CartItemType } from '@/types/cartItem';
import { removeFromCart, updateCartItem } from '@/redux/cartSlice';
import Image from 'next/image';
import Head from 'next/head';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ cartItemId: item.id, quantity }));
    }
  };

  const productImage = item.product.primary_image; // ✅ matches backend field
  const productPrice = Number(item.price);         // ensure numeric

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
    <li className="flex items-center justify-between border-b pb-4">
      {/* Product Info */}
      <div className="flex items-center gap-4">
        {productImage && (
          <Image
            src={productImage}
            alt={item.product.name}
            width={64}
            height={64}
            className="object-cover rounded"
          />
        )}
        <div>
          <p className="font-semibold">{item.product.name}</p>
          <p>${productPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleQuantityChange(parseInt(e.target.value, 10))
          }
          className="w-16 border rounded px-2 py-1"
        />
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </li>
    </>
  );
};

export default CartItem;
