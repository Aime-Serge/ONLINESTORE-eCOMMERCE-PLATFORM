import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit_card',
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! (mock)');
  };

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <p className="mb-6 font-semibold">Total: ${total.toFixed(2)}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="paymentMethod" className="block font-medium mb-1">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default CheckoutPage;
// pages/checkout.tsx
// This file defines the CheckoutPage component which allows users to review their cart items and enter shipping