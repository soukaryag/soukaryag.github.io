import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { 
  ButtonVariant, 
  ButtonSize, 
  StyledButton, 
  IconWrapper, 
  LoadingSpinner 
} from './Button.styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      className={variant === 'glass' ? 'glass btn-hover' : undefined}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && icon && (
        <IconWrapper $position={iconPosition}>
          {icon}
        </IconWrapper>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;
