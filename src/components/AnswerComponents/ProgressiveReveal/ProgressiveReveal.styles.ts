import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const TypingText = styled.div<{ $isVisible?: boolean; $isHeader?: boolean }>`
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transition: opacity 0.1s ease;

  ${({ $isHeader }) => $isHeader && css`
    font-size: ${props => props.theme.typography.fontSize.xxxl};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  `}
`;



export const GridLoader = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const CardLoader = styled.div<{ $height?: string; $width?: string }>`
  width: ${({ $width = '100%' }) => $width};
  height: ${({ $height = '120px' }) => $height};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface}40 0%,
    ${({ theme }) => theme.colors.surface}60 50%,
    ${({ theme }) => theme.colors.surface}40 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 12px;
`;

export const TimelineLoader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TimelineItemLoader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

export const TimelineIconLoader = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface}40 0%,
    ${({ theme }) => theme.colors.surface}60 50%,
    ${({ theme }) => theme.colors.surface}40 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const TimelineContentLoader = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LineLoader = styled.div<{ $width?: string }>`
  height: 20px;
  width: ${({ $width = '100%' }) => $width};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface}40 0%,
    ${({ theme }) => theme.colors.surface}60 50%,
    ${({ theme }) => theme.colors.surface}40 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 8px;
`;

export const RevealedComponent = styled.div<{ $isVisible?: boolean }>`
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  transform: translateY(${({ $isVisible }) => $isVisible ? '0' : '10px'});
  transition: all 0.3s ease;
`;
