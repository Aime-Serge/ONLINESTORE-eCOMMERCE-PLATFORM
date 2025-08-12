import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Product } from '@/types/product';
import { setTotalCount } from './paginationSlice'; // ✅ Import pagination action
import { AppDispatch } from './store';

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
  categoryFilter: string;
  priceRangeFilter: { min: number; max: number } | null;
  search: string;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 1,
  page: 1,
  categoryFilter: '',
  priceRangeFilter: null,
  search: '',
};

export const fetchProducts = createAsyncThunk<
  { products: Product[]; totalPages: number; totalCount: number },
  { page?: number; categoryId?: string; minPrice?: number; maxPrice?: number; search?: string },
  { dispatch: AppDispatch; rejectValue: string }
>(
  'products/fetchProducts',
  async ({ page = 1, categoryId, minPrice, maxPrice, search }, { dispatch, rejectWithValue }) => {
    try {
      const params: Record<string, string> = { page: page.toString() };
      if (categoryId) params.category = categoryId;
      if (minPrice !== undefined) params.min_price = minPrice.toString();
      if (maxPrice !== undefined) params.max_price = maxPrice.toString();
      if (search) params.q = search;

      const response = await api.get('/products', { params });

      const totalCount = response.data.meta?.total_count ?? 0;
      const totalPages = response.data.meta?.page_count ?? 1;

      // ✅ Sync totalCount to paginationSlice
      dispatch(setTotalCount(totalCount));

      return {
        products: response.data.results ?? [],
        totalPages,
        totalCount,
      };
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Failed to fetch products');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.categoryFilter = action.payload;
    },
    setPriceRangeFilter(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRangeFilter = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    clearFilters(state) {
      state.categoryFilter = '';
      state.priceRangeFilter = null;
      state.search = '';
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
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  setCategoryFilter,
  setPriceRangeFilter,
  setSearch,
  setPage,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
