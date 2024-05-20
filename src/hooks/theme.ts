import * as React from 'react';

import { ThemeContext } from '@/utils/pokeTheme';

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined)
    throw new Error('Cannot set theme');

  return context;
}
