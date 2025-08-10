import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { fetchCategories } from '../redux/categorySlice';

function AppWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories(''));
  }, [dispatch]);

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}
// pages/_app.tsx
// This file wraps the application with Redux Provider and fetches categories on initial load.