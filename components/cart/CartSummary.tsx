'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';

const CartSummary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Items:</span>
        <span>{items.length}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Total:</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => dispatch(clearCart())}
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartSummary;

// /components/cart/CartSummary.tsx