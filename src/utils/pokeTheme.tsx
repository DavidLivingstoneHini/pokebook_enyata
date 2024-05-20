import * as React from 'react';

import { themeColors } from '@/utils/data';

type ThemeColor = (typeof themeColors)[number];
type ThemeContext = {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
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
  storageKey = 'theme',
}: ThemeProps) => {
  const [theme, setTheme] = React.useState(
    () => (localStorage.getItem(storageKey) as ThemeColor) ?? baseTheme,
  );

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (theme: ThemeColor) => {
          localStorage.setItem(storageKey, theme);
          setTheme(theme);
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
