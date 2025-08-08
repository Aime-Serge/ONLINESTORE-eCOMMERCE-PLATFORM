import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 12, // You can adjust this as needed
  totalCount: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.pageSize = initialState.pageSize;
      state.totalCount = 0;
    },
  },
});

export const {
  setCurrentPage,
  setPageSize,
  setTotalCount,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
// This file defines the pagination slice for managing pagination state in a Redux store.