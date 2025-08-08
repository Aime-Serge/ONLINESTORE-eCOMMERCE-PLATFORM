// redux/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';
import { Product } from '../types/product';
import { RootState } from '../redux/store';

// Add filter and price range types if needed
interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
  categoryFilter: string;
  priceRangeFilter: { min: number; max: number } | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 1,
  page: 1,
  categoryFilter: '',
  priceRangeFilter: null,
};


export const fetchProducts = createAsyncThunk<
  { products: Product[]; totalPages: number },
  void,
  { state: RootState }
>('products/fetchProducts', async (_, { getState }) => {
  const { products, pagination, filter } = getState() as RootState;
  const params: Record<string, string | number> = {
    page: (pagination as unknown as { page: number }).page,
    limit: 12,
  };

  // Use filters from products state if available
  if (products.categoryFilter) params.category = products.categoryFilter;
  if (products.priceRangeFilter) {
    params.min_price = products.priceRangeFilter.min;
    params.max_price = products.priceRangeFilter.max;
  }
  if (filter?.searchQuery) params.q = filter.searchQuery;
  if (filter?.sortBy) params.sort = filter.sortBy;

  const response = await api.get('/products', { params });
  return {
    products: response.data.products,
    totalPages: response.data.totalPages,
  };
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearProducts(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
      state.totalPages = 1;
      state.page = 1;
      state.categoryFilter = '';
      state.priceRangeFilter = null;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
    },
    setPriceRangeFilter(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRangeFilter = action.payload;
    },
    clearFilters(state) {
      state.categoryFilter = '';
      state.priceRangeFilter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to load products';
      });
  },
});

export const {
  setPage,
  clearProducts,
  setCategoryFilter,
  setPriceRangeFilter,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;