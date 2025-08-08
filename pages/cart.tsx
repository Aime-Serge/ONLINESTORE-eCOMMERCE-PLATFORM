import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../redux/cartSlice';

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
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
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
// pages/cart.tsx
// This file defines the CartPage component which displays the items in the shopping cart and allows users