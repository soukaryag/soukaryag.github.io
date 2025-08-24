import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import Button from '../Button';
import { ToggleContainer, ThemeIcon } from './ThemeToggle.styles';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <ToggleContainer className={className}>
      <Button
        variant="glass"
        size="sm"
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        icon={
          <>
            <ThemeIcon $isVisible={!isDark}>🌙</ThemeIcon>
            <ThemeIcon $isVisible={isDark}>☀️</ThemeIcon>
          </>
        }
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
        }}
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    </ToggleContainer>
  );
};

export default ThemeToggle;
