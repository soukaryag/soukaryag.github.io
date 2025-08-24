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
    // This will trigger a re-render of all children when theme changes
  }, [themeType]);

  return (
    <StyledThemeProvider theme={theme} key={themeType}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
