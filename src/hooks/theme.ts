import * as React from 'react';

import { AccentContext } from '@/utils/pokeTheme';

export function useAccent() {
  const context = React.useContext(AccentContext);

  if (context === undefined)
    throw new Error('useAccent must be used within AccentProvider');

  return context;
}
