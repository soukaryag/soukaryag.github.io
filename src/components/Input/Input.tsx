import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import {
  InputVariant,
  InputSize,
  InputContainer,
  Label,
  InputWrapper,
  StyledInput,
  IconWrapper,
  ErrorMessage
} from './Input.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  error?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'md',
  error,
  label,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputWrapper $variant={variant}>
        {leftIcon && (
          <IconWrapper $position="left">
            {leftIcon}
          </IconWrapper>
        )}
        <StyledInput
          ref={ref}
          $variant={variant}
          $size={size}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon}
          $hasError={!!error}
          {...props}
        />
        {rightIcon && (
          <IconWrapper $position="right">
            {rightIcon}
          </IconWrapper>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
