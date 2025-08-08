import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  categoryId: number | null;
  priceRange: [number, number] | null;
  sortBy: 'price_asc' | 'price_desc' | null;
}

const initialState: FilterState = {
  searchQuery: '',
  categoryId: null,
  priceRange: null,
  sortBy: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number] | null>) {
      state.priceRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<'price_asc' | 'price_desc' | null>) {
      state.sortBy = action.payload;
    },
    resetFilters(state) {
      state.searchQuery = '';
      state.categoryId = null;
      state.priceRange = null;
      state.sortBy = null;
    },
  },
});

export const {
  setSearchQuery,
  setCategoryId,
  setPriceRange,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
