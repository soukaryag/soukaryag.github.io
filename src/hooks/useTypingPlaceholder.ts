import { useState, useEffect, useRef } from 'react';

interface TypingPlaceholderOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  startDelay?: number;
}

export const useTypingPlaceholder = (
  phrases: string[], 
  options: TypingPlaceholderOptions = {},
  isActive: boolean = true
): string => {
  const {
    typeSpeed = 100,
    deleteSpeed = 50,
    pauseTime = 2000,
    startDelay = 2000
  } = options;

  const [placeholder, setPlaceholder] = useState('');
  
  const currentPhraseIndexRef = useRef(1);
  const currentCharIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(isActive);

  // Update active ref when prop changes
  isActiveRef.current = isActive;

  const animate = () => {
    if (!isActiveRef.current || phrases.length === 0) {
      return;
    }

    const currentPhrase = phrases[currentPhraseIndexRef.current];
    const currentCharIndex = currentCharIndexRef.current;
    const isDeleting = isDeletingRef.current;

    if (isDeleting) {
      // Delete character
      setPlaceholder(currentPhrase.substring(0, currentCharIndex - 1));
      currentCharIndexRef.current--;
      
      if (currentCharIndexRef.current === 0) {
        // Done deleting, move to next phrase
        isDeletingRef.current = false;
        currentPhraseIndexRef.current = (currentPhraseIndexRef.current + 1) % phrases.length;
        timeoutRef.current = setTimeout(animate, 500); // Brief pause before typing next phrase
      } else {
        timeoutRef.current = setTimeout(animate, deleteSpeed);
      }
    } else {
      // Type character
      setPlaceholder(currentPhrase.substring(0, currentCharIndex + 1));
      currentCharIndexRef.current++;
      
      if (currentCharIndexRef.current === currentPhrase.length) {
        // Done typing, start deleting after pause
        isDeletingRef.current = true;
        timeoutRef.current = setTimeout(animate, pauseTime);
      } else {
        timeoutRef.current = setTimeout(animate, typeSpeed);
      }
    }
  };

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isActive && phrases.length > 0) {
      // Reset state
      currentPhraseIndexRef.current = 0;
      currentCharIndexRef.current = 0;
      isDeletingRef.current = false;
      setPlaceholder('');
      
      // Start animation after delay
      timeoutRef.current = setTimeout(animate, startDelay);
    } else {
      // Clear placeholder when inactive
      setPlaceholder('');
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive, phrases.length, typeSpeed, deleteSpeed, pauseTime, startDelay]);

  return placeholder;
};

export default useTypingPlaceholder;
