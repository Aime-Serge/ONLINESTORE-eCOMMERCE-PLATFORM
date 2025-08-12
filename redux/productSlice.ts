import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Product } from '@/types/product';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
  categoryFilter: string; // <-- Add this line
  priceRangeFilter: { min: number; max: number } | null; // <-- Add if needed
  search: string;
}
 const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 1,
  page: 1,
  categoryFilter: '',
  priceRangeFilter: null,
  search: '',
};

// Base Minio path
const MINIO_BASE_URL = 'https://minio.sakachris.com/product-images/products/';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, categoryId }: { page: number; categoryId?: string }) => {
    let endpoint = `/products?page=${page}`;
    if (categoryId) {
      endpoint += `&category=${categoryId}`;
    }

    const response = await api.get(endpoint);
    const data = response.data;

    // Ensure every product's image is a full Minio URL
    const mappedProducts = data.items.map((product: Product) => ({
      ...product,
      primary_image: product.primary_image
        ? product.primary_image.startsWith('http')
          ? product.primary_image // already full URL
          : `${MINIO_BASE_URL}${product.primary_image}`
        : '/images/placeholder.png', // fallback
    }));

    return {
      items: mappedProducts,
      totalPages: data.totalPages,
    };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
     clearFilters(state) {
      state.categoryFilter = '';
      state.priceRangeFilter = null;
      state.search = '';
    },
    setPriceRangeFilter(state, action: PayloadAction<{ min: number; max: number } | null>) {
      state.priceRangeFilter = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage, setCategoryFilter,clearFilters,setPriceRangeFilter } = productSlice.actions;
export default productSlice.reducer;
