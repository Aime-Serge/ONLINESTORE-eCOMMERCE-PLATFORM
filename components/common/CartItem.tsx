'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { removeFromCart, updateQuantity } from '@/redux/cartSlice';
import { CartItem as CartItemType } from '@/types/cartItem';

interface CartItemProps {
  item: CartItemType;
  id: number;
}

const CartItem: React.FC<CartItemProps> = ({ item}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(e.target.value);
    if (qty > 0) {
      dispatch(updateQuantity({ id: Number(item.id), quantity: qty }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(Number(item.id)));
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Product image */}
      <div className="flex items-center gap-4">
        <Image
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Quantity control */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 border rounded p-1 text-center"
        />
        <button
          onClick={handleRemove}
          className="text-red-500 hover:underline text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
