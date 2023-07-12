import { AppProps } from 'next/app';
import globalStyles from '../styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { StoreProvider } from '../store';
import { CookiesProvider } from 'react-cookie';
import { HydrationProvider } from 'react-hydration-provider';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <HydrationProvider>
      <CookiesProvider>
        <StoreProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </StoreProvider>
      </CookiesProvider>
    </HydrationProvider>
  );
}

export default MyApp;
