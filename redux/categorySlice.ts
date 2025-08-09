import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export interface Category {
  category_id: string;
  name: string;
  description: string;
  created_at: string;
}

interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
};

{/*export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async () => {
    const response = await api.get('/categories');
    // API already returns array in correct shape
    return response.data as Category[];
  }
);*/}
export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async () => {
    const response = await api.get('/categories/');
    return response.data.results as Category[];
  }
);


const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload || []; // fallback to empty array
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
        state.categories = []; // ensure safe fallback
      });
  },
});

export default categorySlice.reducer;
