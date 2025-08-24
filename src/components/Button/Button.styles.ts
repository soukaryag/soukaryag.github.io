import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: #0171e3;
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: #026eda;
        }
        
        &:active {
          background: #0160c7;
        }
      `;
    
    case 'secondary':
      return css`
        background: ${props => props.theme.colors.secondary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: ${props => props.theme.colors.primary};
        }
      `;
    
    case 'ghost':
      return css`
        background: transparent;
        color: ${props => props.theme.colors.text};
        border: 1px solid ${props => props.theme.colors.border};
        
        &:hover:not(:disabled) {
          background: ${props => props.theme.colors.surface};
          border-color: ${props => props.theme.colors.primary};
        }
      `;
    
    case 'glass':
      return css`
        background: ${props => props.theme.colors.glass};
        backdrop-filter: blur(40px) saturate(180%);
        -webkit-backdrop-filter: blur(40px) saturate(180%);
        color: ${props => props.theme.colors.text};
        border: 1px solid ${props => props.theme.colors.border};
        border-top: 1px solid rgba(255, 255, 255, 0.8);
        border-left: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: ${props => props.theme.borderRadius.full};
        position: relative;
        overflow: hidden;
        transition: all ${props => props.theme.transitions.medium};
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.9),
          inset 0 -1px 0 rgba(255, 255, 255, 0.2);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          pointer-events: none;
          border-radius: inherit;
        }
        
        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(50px) saturate(200%);
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        &:active {
          background: rgba(255, 255, 255, 0.1);
        }
      `;
    
    case 'danger':
      return css`
        background: ${props => props.theme.colors.error};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: #dc2626;
        }
      `;
    
    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
        font-size: ${props => props.theme.typography.fontSize.sm};
        min-height: 2rem;
      `;
    
    case 'md':
      return css`
        padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
        font-size: ${props => props.theme.typography.fontSize.md};
        min-height: 2.5rem;
      `;
    
    case 'lg':
      return css`
        padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
        font-size: ${props => props.theme.typography.fontSize.lg};
        min-height: 3rem;
      `;
    
    default:
      return css``;
  }
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  line-height: ${props => props.theme.typography.lineHeight.tight};
  
  border-radius: ${props => props.theme.borderRadius.full};
  transition: ${props => props.theme.transitions.fast};
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Ensure text/children are above gradient overlay */
  & > span, & > * {
    position: relative;
    z-index: 2;
  }
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
  
  ${props => props.$isLoading && css`
    cursor: not-allowed;
    opacity: 0.8;
  `}
`;

export const IconWrapper = styled.span<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  ${props => props.$position === 'right' && css`
    order: 1;
  `}
`;

export const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  z-index: 2;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
