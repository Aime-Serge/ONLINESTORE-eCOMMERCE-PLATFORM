'use client';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CartSummary: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate totals
  const { subtotal, tax, total } = useMemo(() => {
    const subtotalCalc = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const taxRate = 0.1; // 10% tax — adjust if needed
    const taxCalc = subtotalCalc * taxRate;
    const totalCalc = subtotalCalc + taxCalc;

    return {
      subtotal: subtotalCalc,
      tax: taxCalc,
      total: totalCalc,
    };
  }, [cartItems]);

  return (
    <div className="p-4 bg-white rounded shadow-md w-full md:w-1/3">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Tax (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-semibold text-base mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        onClick={() => alert('Proceeding to checkout...')}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
