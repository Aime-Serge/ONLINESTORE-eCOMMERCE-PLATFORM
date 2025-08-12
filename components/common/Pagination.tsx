'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCurrentPage } from '@/redux/paginationSlice';
import { fetchProducts } from '@/redux/productSlice';
import { AppDispatch } from '@/redux/store';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
const Pagination: React.FC<PaginationProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, pageSize, totalCount } = useSelector(
    (state: RootState) => state.pagination
  );

  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchProducts({ page })); // ✅ Fetch new page from server
  };
  return (
    <nav aria-label="Product Pagination" className="flex justify-center mt-6 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded-md transition ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
