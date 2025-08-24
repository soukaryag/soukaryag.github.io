import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div<{ $delay?: number }>`
  animation: ${fadeInUp} 0.8s ease-out forwards;
  animation-delay: ${({ $delay = 0 }) => $delay}ms;
  opacity: 0;
`;

export const ContentWrapper = styled.div`
  > * {
    animation: ${slideIn} 0.6s ease-out forwards;
    opacity: 0;
  }

  > *:nth-child(1) { animation-delay: 200ms; }
  > *:nth-child(2) { animation-delay: 300ms; }
  > *:nth-child(3) { animation-delay: 400ms; }
  > *:nth-child(4) { animation-delay: 500ms; }
  > *:nth-child(5) { animation-delay: 600ms; }
  > *:nth-child(6) { animation-delay: 700ms; }
  > *:nth-child(7) { animation-delay: 800ms; }
  > *:nth-child(8) { animation-delay: 900ms; }
  > *:nth-child(9) { animation-delay: 1000ms; }
  > *:nth-child(10) { animation-delay: 1100ms; }
`;
