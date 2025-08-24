import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionState {
  isTransitioning: boolean;
  avatarPosition: ElementPosition | null;
  inputPosition: ElementPosition | null;
  query: string;
}

interface PageTransitionContextType {
  transitionState: TransitionState;
  startTransition: (avatarEl: HTMLElement, inputEl: HTMLElement, query: string) => void;
  completeTransition: () => void;
  animateToTargets: (avatarTarget: ElementPosition, inputTarget: ElementPosition) => void;
  isReady: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

// Styled components for transition elements
const TransitionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
`;

const TransitionAvatar = styled.div<{ $position: ElementPosition; $isAnimating: boolean; $targetPosition?: ElementPosition }>`
  position: fixed;
  width: ${props => props.$position.width}px;
  height: ${props => props.$position.height}px;
  top: ${props => props.$position.top}px;
  left: ${props => props.$position.left}px;
  border-radius: 50%;
  overflow: hidden;
  transition: ${props => props.$isAnimating ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  z-index: 10000;
  
  ${props => props.$isAnimating && props.$targetPosition && `
    width: ${props.$targetPosition.width}px !important;
    height: ${props.$targetPosition.height}px !important;
    top: ${props.$targetPosition.top}px !important;
    left: ${props.$targetPosition.left}px !important;
  `}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TransitionInput = styled.div<{ $position: ElementPosition; $isAnimating: boolean; $targetPosition?: ElementPosition }>`
  position: fixed;
  width: ${props => props.$position.width}px;
  height: ${props => props.$position.height}px;
  top: ${props => props.$position.top}px;
  left: ${props => props.$position.left}px;
  border-radius: 25px;
  transition: ${props => props.$isAnimating ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'};
  z-index: 10000;
  
  ${props => props.$isAnimating && props.$targetPosition && `
    width: ${props.$targetPosition.width}px !important;
    height: ${props.$targetPosition.height}px !important;
    top: ${props.$targetPosition.top}px !important;
    left: ${props.$targetPosition.left}px !important;
  `}
  
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(255, 255, 255, 0.3);
`;

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transitionState, setTransitionState] = useState<TransitionState>({
    isTransitioning: false,
    avatarPosition: null,
    inputPosition: null,
    query: ''
  });
  
  const [showTransitionElements, setShowTransitionElements] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetPositions, setTargetPositions] = useState<{
    avatar: ElementPosition | null;
    input: ElementPosition | null;
  }>({ avatar: null, input: null });
  
  const isReady = useRef(false);

  const startTransition = useCallback((avatarEl: HTMLElement, inputEl: HTMLElement, query: string) => {
    const avatarRect = avatarEl.getBoundingClientRect();
    const inputRect = inputEl.getBoundingClientRect();
    
    const avatarPosition: ElementPosition = {
      top: avatarRect.top + window.scrollY,
      left: avatarRect.left + window.scrollX,
      width: avatarRect.width,
      height: avatarRect.height
    };
    
    const inputPosition: ElementPosition = {
      top: inputRect.top + window.scrollY,
      left: inputRect.left + window.scrollX,
      width: inputRect.width,
      height: inputRect.height
    };
    
    setTransitionState({
      isTransitioning: true,
      avatarPosition,
      inputPosition,
      query
    });
    
    setShowTransitionElements(true);
    isReady.current = true;
  }, []);

  const completeTransition = useCallback(() => {
    setTransitionState({
      isTransitioning: false,
      avatarPosition: null,
      inputPosition: null,
      query: ''
    });
    setShowTransitionElements(false);
    setIsAnimating(false);
    setTargetPositions({ avatar: null, input: null });
    isReady.current = false;
  }, []);

  // Method to start animation to target positions
  const animateToTargets = useCallback((avatarTarget: ElementPosition, inputTarget: ElementPosition) => {
    setTargetPositions({
      avatar: avatarTarget,
      input: inputTarget
    });
    
    // Start animation after a brief delay to ensure elements are positioned
    setTimeout(() => {
      setIsAnimating(true);
    }, 50);
    
    // Complete transition after animation
    setTimeout(() => {
      completeTransition();
    }, 850); // Slightly longer than animation duration
  }, [completeTransition]);

  const contextValue: PageTransitionContextType = {
    transitionState,
    startTransition,
    completeTransition,
    animateToTargets,
    isReady: isReady.current
  };

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
      {showTransitionElements && transitionState.avatarPosition && transitionState.inputPosition && (
        <TransitionOverlay>
          <TransitionAvatar
            $position={transitionState.avatarPosition}
            $isAnimating={isAnimating}
            $targetPosition={targetPositions.avatar || undefined}
          >
            <img src="/images/memoji.png" alt="Soukarya's Avatar" />
          </TransitionAvatar>
          <TransitionInput
            $position={transitionState.inputPosition}
            $isAnimating={isAnimating}
            $targetPosition={targetPositions.input || undefined}
          />
        </TransitionOverlay>
      )}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};
