import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n/config';
import './index.css';

// Enable devtools only in development mode
const isDevelopment = import.meta.env.DEV;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: isDevelopment ? 1 : 3, // fewer retries in development
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>
);
