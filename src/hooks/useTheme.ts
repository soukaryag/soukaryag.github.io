import { useState, useEffect, useCallback, useMemo } from 'react';
import { lightTheme, darkTheme, ThemeType, Theme } from '../theme';

// Custom hook for theme management
export const useTheme = () => {
  const THEME_KEY = 'preferred-theme';
  
  // Get system theme preference
  const getSystemTheme = useCallback((): ThemeType => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }, []);

  // Get stored theme from localStorage
  const getStoredTheme = useCallback((): ThemeType | null => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      return stored === 'dark' || stored === 'light' ? stored : null;
    } catch (e) {
      return null;
    }
  }, []);

  // Initialize theme state
  const [themeType, setThemeType] = useState<ThemeType>(() => {
    return getStoredTheme() || getSystemTheme();
  });

  // Get the actual theme object - memoized to ensure new reference on theme change
  const theme: Theme = useMemo(() => {
    return themeType === 'dark' ? { ...darkTheme } : { ...lightTheme };
  }, [themeType]);

  // Apply theme to document
  const applyTheme = useCallback((newThemeType: ThemeType) => {
    document.documentElement.setAttribute('data-theme', newThemeType);
  }, []);

  // Store theme in localStorage
  const storeTheme = useCallback((newThemeType: ThemeType) => {
    try {
      localStorage.setItem(THEME_KEY, newThemeType);
    } catch (e) {
      console.warn('Could not store theme preference');
    }
  }, []);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    const newThemeType: ThemeType = themeType === 'dark' ? 'light' : 'dark';
    setThemeType(newThemeType);
  }, [themeType]);

  // Set specific theme
  const setSpecificTheme = useCallback((newThemeType: ThemeType) => {
    setThemeType(newThemeType);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(themeType);
    storeTheme(themeType);
    
    // Dispatch custom event for any non-React components that might need it
    document.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: themeType } 
    }));
  }, [themeType, applyTheme, storeTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't manually set a preference
        if (!getStoredTheme()) {
          setThemeType(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [getStoredTheme]);

  // Apply initial theme on mount
  useEffect(() => {
    applyTheme(themeType);
  }, [applyTheme, themeType]);

  return {
    theme,
    themeType,
    isDark: themeType === 'dark',
    isLight: themeType === 'light',
    toggleTheme,
    setTheme: setSpecificTheme
  };
};

export default useTheme;
