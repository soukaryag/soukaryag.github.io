import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, themeType } = useTheme();

  // Force re-render when theme changes
  useEffect(() => {
  }, [themeType, theme]);

  return (
    <StyledThemeProvider theme={theme} key={`theme-${themeType}`}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
