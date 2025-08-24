import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  TypingText,
  GridLoader,
  CardLoader,
  TimelineLoader,
  TimelineItemLoader,
  TimelineIconLoader,
  TimelineContentLoader,
  LineLoader,
  RevealedComponent
} from './ProgressiveReveal.styles';

export interface RevealItem {
  type: 'text' | 'header' | 'component' | 'grid' | 'timeline' | 'cards';
  content: string | React.ReactNode;
  loader?: 'card' | 'grid' | 'timeline' | 'line';
  loaderCount?: number; // For grids/multiple items
  delay?: number; // Custom delay for this item
}

export interface ProgressiveRevealProps {
  items: RevealItem[];
  startDelay?: number;
  textSpeed?: number;
  componentDelay?: number;
  className?: string;
  disabled?: boolean; // Add prop to disable animation restarts
  onRevealStart?: () => void; // Callback when reveal animation starts
}

export const ProgressiveReveal: React.FC<ProgressiveRevealProps> = ({
  items,
  startDelay = 500,
  textSpeed = 10,
  componentDelay = 200,
  className,
  disabled = false,
  onRevealStart
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [typedTexts, setTypedTexts] = useState<string[]>([]);
  const [revealedComponents, setRevealedComponents] = useState<boolean[]>([]);
  const [showingLoaders, setShowingLoaders] = useState<boolean[]>([]);
  const [hasStarted, setHasStarted] = useState(false);

  const typeText = useCallback((index: number, text: string): Promise<void> => {
    return new Promise((resolve) => {
      let currentIndex = 0;
      const characters = text.split('');
      
      const typeCharacters = () => {
        if (currentIndex < characters.length) {
          const currentText = characters.slice(0, currentIndex + 1).join('');
          setTypedTexts(prev => {
            const newTexts = [...prev];
            newTexts[index] = currentText;
            return newTexts;
          });
          currentIndex++;
          
          // Smooth, consistent timing with slight variation for natural feel
          const char = characters[currentIndex - 1];
          let delay = textSpeed;
          
          // Add natural pauses
          if (char === '.' || char === '!' || char === '?') {
            delay = textSpeed * 8; // Longer pause after sentences
          } else if (char === ',' || char === ';' || char === ':') {
            delay = textSpeed * 4; // Medium pause after clauses
          } else if (char === ' ') {
            delay = textSpeed * 1.2; // Slight pause after words
          } else {
            delay = textSpeed + Math.random() * 10; // Small variation for natural feel
          }
          
          setTimeout(typeCharacters, delay);
        } else {
          resolve();
        }
      };
      
      typeCharacters();
    });
  }, [textSpeed]);

  const processNextItem = useCallback(async (index: number) => {
    if (index >= items.length) return;

    setCurrentItemIndex(index);
    const item = items[index];
    const customDelay = item.delay || 0;

    if (item.type === 'text') {
      await typeText(index, item.content as string);
      // Move to next item immediately after typing
      setTimeout(() => processNextItem(index + 1), 100 + customDelay);
    } else {
      // Show loader first
      setShowingLoaders(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });

      // After loader delay, show the actual component
      setTimeout(() => {
        setShowingLoaders(prev => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
        
        setRevealedComponents(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });

        // Move to next item
        setTimeout(() => processNextItem(index + 1), 100 + customDelay);
      }, componentDelay);
    }
  }, [items, typeText, componentDelay]);

  useEffect(() => {
    // Don't restart if disabled or already started
    if (disabled || hasStarted) return;
    
    // Longer delay to ensure the component is fully stable after page transitions
    const mountTimer = setTimeout(() => {
      // Double-check we should still start (in case component was unmounted/remounted)
      if (disabled || hasStarted) return;
      
      // Initialize states
      setTypedTexts(new Array(items.length).fill(''));
      setRevealedComponents(new Array(items.length).fill(false));
      setShowingLoaders(new Array(items.length).fill(false));
      setHasStarted(true);

      // Start the reveal sequence with additional delay for page transitions
      const startTimer = setTimeout(() => {
        // Trigger scroll callback when reveal starts
        onRevealStart?.();
        processNextItem(0);
      }, startDelay);

      return () => clearTimeout(startTimer);
    }, 200); // Increased delay to ensure stability after transitions

    return () => clearTimeout(mountTimer);
  }, [items.length, startDelay, processNextItem, disabled, hasStarted]);



  const renderLoader = (item: RevealItem, index: number) => {
    const loaderType = item.loader || 'card';
    const count = item.loaderCount || 1;

    switch (loaderType) {
      case 'grid':
        return (
          <GridLoader>
            {Array.from({ length: count }, (_, i) => (
              <CardLoader key={i} />
            ))}
          </GridLoader>
        );
      
      case 'timeline':
        return (
          <TimelineLoader>
            {Array.from({ length: count }, (_, i) => (
              <TimelineItemLoader key={i}>
                <TimelineIconLoader />
                <TimelineContentLoader>
                  <LineLoader $width="70%" />
                  <LineLoader $width="40%" />
                  <LineLoader $width="90%" />
                </TimelineContentLoader>
              </TimelineItemLoader>
            ))}
          </TimelineLoader>
        );
      
      case 'line':
        return <LineLoader />;
      
      default:
        return <CardLoader />;
    }
  };

  return (
    <Container className={className}>
      {items.map((item, index) => (
        <div key={index} style={{ width: '100%' }}>
          {item.type === 'text' || item.type === 'header' ? (
            <TypingText $isVisible={currentItemIndex >= index} $isHeader={item.type === 'header'}>
              {item.type === 'header' ? <p>{item.content}</p> : (
                typeof item.content === 'string' 
                ? item.content.split('\n\n').map((paragraph, pIndex) => {
                    const typedText = typedTexts[index] || '';
                    const paragraphs = typedText.split('\n\n');
                    const currentParagraph = paragraphs[pIndex] || '';
                    
                    return (
                      <p key={pIndex}>
                        {currentParagraph}
                        {/* Add cursor only to the last visible paragraph */}
                        {pIndex === paragraphs.length - 1 && typedText.length < (item.content as string).length && (
                          <span style={{ 
                            opacity: 0.7,
                            animation: 'blink 1s infinite',
                            marginLeft: '1px'
                          }}>|</span>
                        )}
                      </p>
                    );
                  })
                : item.content
              )}
            </TypingText>
          ) : (
            <>
              {showingLoaders[index] && renderLoader(item, index)}
              <RevealedComponent $isVisible={revealedComponents[index]}>
                {item.content}
              </RevealedComponent>
            </>
          )}
        </div>
      ))}
    </Container>
  );
};
