import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';

export interface ThemeToggleProps {
  className?: string;
}

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeIcon = styled.span<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.fast};
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'scale(1)' : 'scale(0.8)'};
  
  position: ${props => props.$isVisible ? 'static' : 'absolute'};
  
  &:first-child {
    /* Light mode icon */
  }
  
  &:last-child {
    /* Dark mode icon */
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

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
          <IconWrapper>
            <ThemeIcon $isVisible={!isDark}>🌙</ThemeIcon>
            <ThemeIcon $isVisible={isDark}>☀️</ThemeIcon>
          </IconWrapper>
        }
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    </ToggleContainer>
  );
};

export default ThemeToggle;
