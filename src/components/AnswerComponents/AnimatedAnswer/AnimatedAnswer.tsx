import React from 'react';
import { Container, ContentWrapper } from './AnimatedAnswer.styles';

export interface AnimatedAnswerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedAnswer: React.FC<AnimatedAnswerProps> = ({ 
  children, 
  delay = 0, 
  className 
}) => {
  return (
    <Container $delay={delay} className={className}>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Container>
  );
};
