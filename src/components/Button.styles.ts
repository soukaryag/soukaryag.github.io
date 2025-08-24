import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: linear-gradient(135deg, ${props => props.theme.colors.primary}dd, ${props => props.theme.colors.accent}dd);
          transform: translateY(-1px);
          box-shadow: ${props => props.theme.shadows.md};
        }
        
        &:active {
          transform: translateY(0);
        }
      `;
    
    case 'secondary':
      return css`
        background: ${props => props.theme.colors.secondary};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: ${props => props.theme.colors.secondary}dd;
          transform: translateY(-1px);
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
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        color: ${props => props.theme.colors.text};
        border: 1px solid ${props => props.theme.colors.border};
        box-shadow: ${props => props.theme.shadows.glass};
        
        &:hover:not(:disabled) {
          background: ${props => props.theme.colors.glass}cc;
          transform: translateY(-2px);
          box-shadow: ${props => props.theme.shadows.lg};
        }
        
        &:active {
          transform: translateY(-1px);
        }
      `;
    
    case 'danger':
      return css`
        background: ${props => props.theme.colors.error};
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background: ${props => props.theme.colors.error}dd;
          transform: translateY(-1px);
        }
      `;
    
    default:
      return css``;
  }
};

export const getSizeStyles = (size: ButtonSize) => {
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
  
  border-radius: ${props => props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.fast};
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
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
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
