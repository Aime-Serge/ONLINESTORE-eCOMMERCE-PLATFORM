import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import paginationReducer from './paginationSlice';
import filterReducer from './filterSlice';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice'; // <-- Add this import
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    pagination: paginationReducer,
    filter: filterReducer,
    categories: categoryReducer,
    cart: cartReducer, // <-- Add this line
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;