import styled from 'styled-components';

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ThemeIcon = styled.span<{ $isVisible: boolean }>`
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
