export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
    glass: string;
    success: string;
    warning: string;
    error: string;
    castle: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    glass: string;
  };
  transitions: {
    fast: string;
    medium: string;
    slow: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
      xxxxxl: string;
      xxxxxxl: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
}

export const baseTheme: Omit<Theme, 'colors'> = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  transitions: {
    fast: 'all 0.15s ease-in-out',
    medium: 'all 0.3s ease-in-out',
    slow: 'all 0.6s ease-in-out',
  },
  typography: {
    fontFamily: "'CustomFont', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
      xxxxl: '2.25rem',
      xxxxxl: '3rem',
      xxxxxxl: '3.75rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: '#1F8AFF', // iMessage Blue
    secondary: '#213442', // iMessage Dark Blue
    background: '#ffffff', // Pure white
    surface: 'rgba(255, 255, 255, 0.25)',
    text: '#000000', // Darker text
    textSecondary: '#6b7280',
    accent: '#f84c00', // Original UVA Orange
    border: 'rgba(255, 255, 255, 0.6)',
    glass: 'rgba(255, 255, 255, 0.15)',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    castle: '#DBC08D',
  },
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: '#1F8AFF', // iMessage Blue
    secondary: '#213442', // iMessage Dark Blue
    background: '#0f0f0f', // Very dark background
    surface: 'rgba(25, 25, 25, 0.6)',
    text: '#f5f5f5', // Light text for dark mode
    textSecondary: '#a3a3a3',
    accent: '#ff6b35', // Original UVA Orange Light for dark
    border: 'rgba(255, 255, 255, 0.1)',
    glass: 'rgba(20, 20, 20, 0.4)',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    castle: '#DBC08D',
  },
};

export type ThemeType = 'light' | 'dark';
