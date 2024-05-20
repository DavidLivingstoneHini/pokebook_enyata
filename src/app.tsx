import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { GetTheme } from './utils/pokeTheme';
import { router } from './scenes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Pokebook</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <GetTheme>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </GetTheme>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
