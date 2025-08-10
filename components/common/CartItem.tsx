'use client';

{/*import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '@/redux/cartSlice';
import { CartItem as CartItemType } from '@/types/cartItem';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      dispatch(updateCartItem({ cartItemId: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <Image
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <p className="font-medium">{item.product.name}</p>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-14 border rounded text-center"
        />
        <p className="w-20 text-right font-semibold">${item.totalPrice.toFixed(2)}</p>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
*/}

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { CartItem as CartItemType } from '@/types/cartItem';
import { removeFromCart, updateCartItem } from '@/redux/cartSlice';
import Image from 'next/image';

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
  );
};

export default CartItem;
