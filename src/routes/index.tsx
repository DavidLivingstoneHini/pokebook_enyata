import { createBrowserRouter, Outlet } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import Error from '../utils/error';
import Home from './home';
import Pokemons from './pokemons';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Outlet />
      </QueryParamProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/pokemons',
        element: <Pokemons />,
      },
    ],
  },
]);
