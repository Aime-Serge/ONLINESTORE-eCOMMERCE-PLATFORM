'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';
import CartItem from '@/components/common/CartItem';
import MainLayout from '@/components/layouts/MainLayout';

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
              <p className="text-xl font-semibold text-gray-800">
                Total: <span className="text-green-600">${total.toFixed(2)}</span>
              </p>
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default CartPage;
