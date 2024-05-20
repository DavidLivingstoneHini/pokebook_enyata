import * as React from 'react';

import { themeColors } from '@/utils/data';

type ThemeColor = (typeof themeColors)[number];
type ThemeContext = {
  accent: ThemeColor;
  setAccent: (accent: ThemeColor) => void;
};
type ThemeProps = {
  children: React.ReactNode;
  baseTheme?: ThemeColor;
  storageKey?: string;
};

export const ThemeContext = React.createContext({} as ThemeContext);

export const GetTheme = ({
  children,
  baseTheme = 'pink',
  storageKey = 'accent',
}: ThemeProps) => {
  const [accent, setAccent] = React.useState(
    () => (localStorage.getItem(storageKey) as ThemeColor) ?? baseTheme,
  );

  React.useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent: (accent: ThemeColor) => {
          localStorage.setItem(storageKey, accent);
          setAccent(accent);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
