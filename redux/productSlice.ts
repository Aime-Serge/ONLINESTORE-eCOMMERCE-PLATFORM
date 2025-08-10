// redux/productSlice.ts
{/*import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

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

// Updated fetchProducts to take explicit args
export const fetchProducts = createAsyncThunk<
  { products: Product[]; totalPages: number },
  { page?: number; categoryId?: string; minPrice?: number; maxPrice?: number; search?: string; sort?: string }
>(
  'products/fetchProducts',
  async ({ page, categoryId, minPrice, maxPrice, search, sort }) => {
    const params = new URLSearchParams();

    // Required pagination params
    if (page) params.append('page', page.toString());
    params.append('limit', '12');

    // Optional filters
    if (categoryId) params.append('category', categoryId);
    if (minPrice !== undefined) params.append('min_price', minPrice.toString());
    if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());
    if (search) params.append('q', search);
    if (sort) params.append('sort', sort);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return {
      products: data.products,
      totalPages: data.totalPages,
    };
  }
);

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
*/}
// redux/store.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { Product } from '@/types/product';

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  totalPages: number;
  page: number;
  categoryFilter: string;
  priceRangeFilter: { min: number; max: number } | null;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  totalPages: 1,
  page: 1,
  categoryFilter: '',
  priceRangeFilter: null,
};

// ✅ Fixed to use backend's "results" and "meta.page_count"
export const fetchProducts = createAsyncThunk<
  { products: Product[]; totalPages: number },
  { page: number; categoryId?: string },
  { rejectValue: string }
>(
  'products/fetchProducts',
  async ({ page, categoryId }, { rejectWithValue }) => {
    try {
      {/*const response = await api.get('/products'*/}
      const response = await api.get(`/products?category=${categoryId}`
, {
        params: { page, categoryId },
      });

      return {
        products: response.data.results as Product[],
        totalPages: response.data.meta?.page_count ?? 1,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
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
    clearFilters(state) {
      state.categoryFilter = '';
      state.priceRangeFilter = null;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
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
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { setPage, setCategoryFilter, setPriceRangeFilter, clearFilters } = productSlice.actions;
export default productSlice.reducer;
