import { useState, useEffect, useRef } from 'react';

interface TypingPlaceholderOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  startDelay?: number;
}

export const useTypingPlaceholder = (
  phrases: string[], 
  options: TypingPlaceholderOptions = {}
): string => {
  const {
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
    startDelay = 2000
  } = options;

  const [placeholder, setPlaceholder] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  
  const currentPhraseRef = useRef(0);
  const currentCharRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const type = (): void => {
    const currentText = phrases[currentPhraseRef.current];
    
    if (isDeletingRef.current) {
      setPlaceholder(currentText.substring(0, currentCharRef.current - 1));
      currentCharRef.current--;
    } else {
      setPlaceholder(currentText.substring(0, currentCharRef.current + 1));
      currentCharRef.current++;
    }
    
    let nextTypeSpeed = isDeletingRef.current ? deleteSpeed : typeSpeed;
    
    if (!isDeletingRef.current && currentCharRef.current === currentText.length) {
      nextTypeSpeed = pauseTime;
      isDeletingRef.current = true;
    } else if (isDeletingRef.current && currentCharRef.current === 0) {
      isDeletingRef.current = false;
      currentPhraseRef.current = (currentPhraseRef.current + 1) % phrases.length;
      nextTypeSpeed = 500;
    }
    
    timeoutRef.current = setTimeout(type, nextTypeSpeed);
  };

  useEffect(() => {
    if (!isStarted && phrases.length > 0) {
      // Start typing animation after delay
      timeoutRef.current = setTimeout(() => {
        setIsStarted(true);
        type();
      }, startDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isStarted, phrases.length, startDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return placeholder;
};

export default useTypingPlaceholder;
