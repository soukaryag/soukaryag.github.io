import styled, { css } from 'styled-components';

export type InputVariant = 'default' | 'glass' | 'minimal';
export type InputSize = 'sm' | 'md' | 'lg';

const getVariantStyles = (variant: InputVariant) => {
  switch (variant) {
    case 'glass':
      return css`
        background: transparent;
        border: none;
        
        &:focus {
          outline: none;
        }
      `;
    
    case 'minimal':
      return css`
        background: transparent;
        border: none;
        border-bottom: 1px solid ${props => props.theme.colors.border};
        border-radius: 0;
        
        &:focus {
          border-bottom-color: ${props => props.theme.colors.primary};
          box-shadow: none;
        }
      `;
    
    case 'default':
    default:
      return css`
        background: ${props => props.theme.colors.surface};
        border: 1px solid ${props => props.theme.colors.border};
        
        &:focus {
          background: ${props => props.theme.colors.background};
          border-color: ${props => props.theme.colors.primary};
          box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
        }
      `;
  }
};

const getSizeStyles = (size: InputSize, variant: InputVariant) => {
  // For glass variant, the wrapper has padding, so input doesn't need it
  if (variant === 'glass') {
    switch (size) {
      case 'sm':
        return css`
          padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
          font-size: ${props => props.theme.typography.fontSize.sm};
        `;
      
      case 'md':
        return css`
          padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
          font-size: ${props => props.theme.typography.fontSize.md};
        `;
      
      case 'lg':
        return css`
          padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
          font-size: ${props => props.theme.typography.fontSize.lg};
          font-weight: 500;
        `;
      
      default:
        return css``;
    }
  }
  
  // For other variants, normal padding
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

export const InputContainer = styled.div<{ $fullWidth: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

export const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const InputWrapper = styled.div<{ $variant: InputVariant }>`
  position: relative;
  display: flex;
  align-items: center;
  
  ${props => props.$variant === 'glass' && css`
    padding: 8px 12px;
    border-radius: 40px;
    overflow: hidden;
    background: ${props.theme.colors.glass};
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid ${props.theme.colors.border};
    border-top: 1px solid rgba(255, 255, 255, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 rgba(255, 255, 255, 0.3);
      
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
  `}
`;

export const StyledInput = styled.input<{
  $variant: InputVariant;
  $size: InputSize;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $hasError: boolean;
}>`
  flex: 1;
  font-family: ${props => props.theme.typography.fontFamily};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.$variant === 'glass' ? '0' : props.theme.borderRadius.md};
  transition: ${props => props.theme.transitions.fast};
  outline: none;
  position: relative;
  z-index: 1;
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size, props.$variant)}
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.8;
    font-weight: 400;
  }
  
  ${props => props.$hasLeftIcon && css`
    padding-left: 2.5rem;
  `}
  
  ${props => props.$hasRightIcon && css`
    padding-right: 2.5rem;
  `}
  
  ${props => props.$hasError && css`
    border-color: ${props.theme.colors.error};
    
    &:focus {
      border-color: ${props.theme.colors.error};
      box-shadow: 0 0 0 2px ${props.theme.colors.error}33;
    }
  `}
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.8;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
  z-index: 1;
  
  ${props => props.$position === 'left' ? css`
    left: ${props.theme.spacing.sm};
  ` : css`
    right: ${props.theme.spacing.sm};
  `}
`;

export const ErrorMessage = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.xs};
`;
