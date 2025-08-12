// /redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, UpdateCartItemPayload } from '@/types/cartItem';
import { Product } from '@/types/product';

// --- Load cart from localStorage ---
const loadCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error loading cart from localStorage', err);
    }
  }
  return [];
};

// --- Save cart to localStorage ---
const saveCart = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (err) {
      console.error('Error saving cart to localStorage', err);
    }
  }
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const priceNum = Number(product.price);

      const existingItem = state.items.find(
        (item) => item.product.product_id === product.product_id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: crypto.randomUUID(),
          product,
          quantity,
          price: priceNum,
          totalPrice: priceNum * quantity,
        });
      }

      saveCart(state.items); // ✅ Persist after adding
    },

    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.price;
        saveCart(state.items); // ✅ Persist after update
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items); // ✅ Persist after removal
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items); // ✅ Persist after clearing
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
