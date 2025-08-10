// /pages/cart.tsx
{/*import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { CartItem } from '@/types/cartItem';
import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from '@/redux/cartSlice';

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateCartItem({ cartItemId, quantity }));
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
            {items.map((item: CartItem) => (
              <li
                key={item.id} // Cart item ID
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p>${item.price.toFixed(2)} each</p>
                  <p className="text-sm text-gray-500">
                    Total: ${item.totalPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
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
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </p>
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
// /redux/cartSlice.ts
*/}
// /pages/cart.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CartItem from '@/components/common/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <section className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>

      <CartSummary />
    </section>
  );
};

export default CartPage;

// /redux/cartSlice.ts