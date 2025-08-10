// /redux/cartSlice.ts
{/*import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, UpdateCartItemPayload } from '@/types/cartItem';
import { Product } from '@/types/product';
import { nanoid } from 'nanoid';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;

      // Check if the product is already in cart
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: nanoid(), // unique cart item id
          product,
          quantity,
          price: product.price, // snapshot price
          totalPrice: product.price * quantity,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      // action.payload is the cartItemId
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);
      if (item && quantity > 0) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
// /redux/store.ts*/}
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, UpdateCartItemPayload } from '@/types/cartItem';
import { Product } from '@/types/product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
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
      const priceNum = Number(product.price); // ✅ convert string to number

      const existingItem = state.items.find(
        (item) => item.product.product_id === product.product_id // ✅ correct key
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: crypto.randomUUID(), // unique ID for cart entry
          product,
          quantity,
          price: priceNum,
          totalPrice: priceNum * quantity,
        });
      }
    },

    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === cartItemId);

      if (item && quantity > 0) { // ✅ fixed syntax
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.price;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
