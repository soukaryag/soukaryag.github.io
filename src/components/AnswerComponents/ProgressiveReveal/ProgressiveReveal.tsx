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
}

export const ProgressiveReveal: React.FC<ProgressiveRevealProps> = ({
  items,
  startDelay = 500,
  textSpeed = 50,
  componentDelay = 200,
  className
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);
  const [typedTexts, setTypedTexts] = useState<string[]>([]);
  const [revealedComponents, setRevealedComponents] = useState<boolean[]>([]);
  const [showingLoaders, setShowingLoaders] = useState<boolean[]>([]);

  const typeText = useCallback((index: number, text: string): Promise<void> => {
    return new Promise((resolve) => {
      let currentIndex = 0;
      const words = text.split(' ');
      
      const typeWords = () => {
        if (currentIndex < words.length) {
          const currentText = words.slice(0, currentIndex + 1).join(' ');
          setTypedTexts(prev => {
            const newTexts = [...prev];
            newTexts[index] = currentText;
            return newTexts;
          });
          currentIndex++;
          setTimeout(typeWords, textSpeed + Math.random() * 30);
        } else {
          resolve();
        }
      };
      
      typeWords();
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
    // Initialize states
    setTypedTexts(new Array(items.length).fill(''));
    setRevealedComponents(new Array(items.length).fill(false));
    setShowingLoaders(new Array(items.length).fill(false));

    // Start the reveal sequence
    const startTimer = setTimeout(() => {
      processNextItem(0);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [items.length, startDelay, processNextItem]);



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
                ? item.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>
                      {typedTexts[index] 
                        ? typedTexts[index].split('\n\n')[pIndex] || ''
                        : ''
                      }
                    </p>
                  ))
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
