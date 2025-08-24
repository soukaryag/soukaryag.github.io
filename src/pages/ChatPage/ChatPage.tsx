import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, QuickActions } from '../../components';
import { QuickAction } from '../../components/QuickActions';
import { AnswerService } from '../../services/answerService';
import { getChatQuickActions } from '../../config/quickActions';
import { usePageTransition } from '../../contexts/PageTransitionContext';
import {
  Container,
  TopControls,
  Header,
  AvatarContainer,
  Avatar,
  UserMessageInHeader,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  MessageContent,
  TypingIndicator,
  TypingDots,
  ClearingOverlay,
  InputArea,
  QuickActionsWrapper,
  QuickActionsToggle,
  InputContainer,
  StyledTextarea,
  SendButton,
  EmptyState,
} from './ChatPage.styles';

export interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 11L12 6L17 11M12 18V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



export const ChatPage: React.FC = () => {
  const [currentUserMessage, setCurrentUserMessage] = useState<string>('');
  const [currentBotMessage, setCurrentBotMessage] = useState<string>('');
  const [currentBotComponent, setCurrentBotComponent] = useState<React.ReactNode>(null);
  const [responseType, setResponseType] = useState<'text' | 'component'>('text');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [userMessageAnimationState, setUserMessageAnimationState] = useState<'hidden' | 'slideUp' | 'slideDown' | 'visible'>('hidden');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quickActionsCollapsed, setQuickActionsCollapsed] = useState(() => {
    const saved = localStorage.getItem('quickActionsCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [hideElementsDuringTransition, setHideElementsDuringTransition] = useState(false);
  const [showAvatarAfterLoad, setShowAvatarAfterLoad] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const avatarRef = useRef<HTMLAnchorElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to show the content that's being revealed
  const scrollToContent = useCallback(() => {
    if (messagesRef.current) {
      // Find the bot message content that's being revealed
      const botMessages = messagesRef.current.querySelectorAll('[data-is-user="false"]');
      const lastBotMessage = botMessages[botMessages.length - 1];
      
      if (lastBotMessage) {
        // Scroll to the bot message with some offset from the top
        const rect = lastBotMessage.getBoundingClientRect();
        const messagesRect = messagesRef.current.getBoundingClientRect();
        const offsetTop = rect.top - messagesRect.top + messagesRef.current.scrollTop - 20; // 20px offset from top
        
        messagesRef.current.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }, []);
  const navigate = useNavigate();
  const { transitionState, animateToTargets } = usePageTransition();

  // Use common quick actions configuration
  const homePageActions: QuickAction[] = getChatQuickActions();

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  // Set hideElementsDuringTransition based on whether we're coming from home page
  useEffect(() => {
    setHideElementsDuringTransition(transitionState.isTransitioning);
  }, [transitionState.isTransitioning]);

  // Show avatar after 1 second delay on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAvatarAfterLoad(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll when content changes
  useEffect(() => {
    scrollToBottom();
  }, [currentBotMessage, currentBotComponent, showTypingIndicator, scrollToBottom]);

  // Auto-resize textarea on input change
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Save quick actions collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('quickActionsCollapsed', JSON.stringify(quickActionsCollapsed));
  }, [quickActionsCollapsed]);

  const clearPreviousContent = useCallback(async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setCurrentBotMessage('');
    setCurrentBotComponent(null);
    setShowUserMessage(false);
    setUserMessageAnimationState('hidden');
    setIsClearing(false);
  }, []);

  const showUserMessageInHeader = useCallback(async (content: string) => {
    // If there's already a message visible, animate it out first
    if (showUserMessage && userMessageAnimationState === 'visible') {
      setUserMessageAnimationState('slideUp');
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Set new content and animate it in
    setCurrentUserMessage(content);
    setShowUserMessage(true);
    setUserMessageAnimationState('slideDown');
    
    // Complete the animation by setting to visible
    await new Promise(resolve => setTimeout(resolve, 50));
    setUserMessageAnimationState('visible');
  }, [showUserMessage, userMessageAnimationState]);

  const typeInBotResponse = useCallback(async (content: string) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Hide typing indicator
    setShowTypingIndicator(false);
    
    // Type in the response character by character
    setCurrentBotMessage('');
    const words = content.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      const partialMessage = words.slice(0, i + 1).join(' ');
      setCurrentBotMessage(partialMessage);
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
    }
  }, []);

  const showBotComponent = useCallback(async (component: React.ReactNode) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Hide typing indicator
    setShowTypingIndicator(false);
    
    // Show the component
    setCurrentBotComponent(component);
  }, []);

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;
    
    setInputValue('');
    await handleUserInput(message);
  };

  const handleUserInput = useCallback(async (input: string, isFromTransition = false) => {
    setIsTyping(true);
    setIsTransitioning(true);
    
    // Clear previous content if any (but not during page transitions since there shouldn't be any)
    if (!isFromTransition && (currentBotMessage || currentBotComponent || showUserMessage)) {
      await clearPreviousContent();
    }
    
    // Only show user message in header if we're not in a page transition
    // (page transitions handle this differently)
    if (!isFromTransition && !hideElementsDuringTransition) {
      await showUserMessageInHeader(input);
    }
    
    try {
      const response = await AnswerService.generateResponse(input, scrollToContent);
      setResponseType(response.type);
      
      if (response.type === 'component') {
        await showBotComponent(response.content as React.ReactNode);
      } else {
        await typeInBotResponse(response.content as string);
      }
    } catch (error) {
      setResponseType('text');
      await typeInBotResponse("Sorry, I'm having trouble thinking right now. Try asking again in a moment!");
    } finally {
      setIsTyping(false);
      setIsTransitioning(false);
    }
  }, [currentBotMessage, currentBotComponent, showUserMessage, hideElementsDuringTransition, clearPreviousContent, showUserMessageInHeader, showBotComponent, typeInBotResponse]);

  // Handle incoming page transitions (moved here to access handleUserInput)
  useEffect(() => {
    if (transitionState.isTransitioning && transitionState.query) {
      // Clear any existing safety timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      // Hide elements during transition
      setHideElementsDuringTransition(true);
      setIsTransitioning(true);
      
      // Immediately show the user message in header for page transitions
      setCurrentUserMessage(transitionState.query);
      setShowUserMessage(true);
      setUserMessageAnimationState('visible');
      
      // Safety timeout to ensure content shows up even if transition fails
      transitionTimeoutRef.current = setTimeout(() => {
        setHideElementsDuringTransition(false);
        if (transitionState.query) {
          handleUserInput(transitionState.query, true); // true = isFromTransition
        }
      }, 2000); // 2 second safety timeout
      
      // Wait for elements to be positioned, then get target positions and start animation
      setTimeout(() => {
        if (avatarRef.current && inputContainerRef.current) {
          const avatarRect = avatarRef.current.getBoundingClientRect();
          const inputRect = inputContainerRef.current.getBoundingClientRect();
          
          const avatarTarget = {
            top: avatarRect.top + window.scrollY,
            left: avatarRect.left + window.scrollX,
            width: avatarRect.width,
            height: avatarRect.height
          };
          
          const inputTarget = {
            top: inputRect.top + window.scrollY,
            left: inputRect.left + window.scrollX,
            width: inputRect.width,
            height: inputRect.height
          };
          
          // Start animation using the context method
          animateToTargets(avatarTarget, inputTarget);
          
          // Show elements after animation and process query
          setTimeout(() => {
            // Clear safety timeout since we're proceeding normally
            if (transitionTimeoutRef.current) {
              clearTimeout(transitionTimeoutRef.current);
              transitionTimeoutRef.current = null;
            }
            
            setHideElementsDuringTransition(false);
            
            // Wait longer for elements to be fully visible and stable before processing
            setTimeout(() => {
              handleUserInput(transitionState.query, true); // true = isFromTransition
            }, 500); // Further increased delay to ensure components are stable after transitions
          }, 900);
        } else {
          // Clear safety timeout
          if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current);
            transitionTimeoutRef.current = null;
          }
          
          // Fallback: show elements and process query even if animation fails
          setHideElementsDuringTransition(false);
          setTimeout(() => {
            handleUserInput(transitionState.query, true); // true = isFromTransition
          }, 500);
        }
      }, 200);
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [transitionState, animateToTargets, handleUserInput]);

  // Handle initial query from home page (fallback for direct navigation) - moved here
  useEffect(() => {
    const initialQuery = sessionStorage.getItem('initialQuery');
    if (initialQuery && !transitionState.isTransitioning) {
      sessionStorage.removeItem('initialQuery');
      setIsTransitioning(true);
      setTimeout(() => {
        handleUserInput(initialQuery);
      }, 500);
    }
  }, [transitionState.isTransitioning, handleUserInput]);

  const handleQuickAction = (action: QuickAction) => {
    handleUserInput(action.query || '');
  };

  const toggleQuickActions = () => {
    setQuickActionsCollapsed(!quickActionsCollapsed);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isEmpty = !currentBotMessage && !currentBotComponent && !showUserMessage && !isTransitioning;

  return (
    <Container>
      <TopControls>
        {/* <Button
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/')}
          style={{
            padding: '0.6rem 1rem',
            color: 'inherit',
          }}
        >
          Home
        </Button> */}
        <div />
        <ThemeToggle />
      </TopControls>
      
      <Header>
        <AvatarContainer 
          ref={avatarRef} 
          onClick={() => navigate('/')}
          $visible={showAvatarAfterLoad && !hideElementsDuringTransition}
        >
          <Avatar src="/images/memoji.png" alt="Soukarya's Avatar" />
        </AvatarContainer>

        <UserMessageInHeader $visible={showUserMessage} $animationState={userMessageAnimationState}>
          <p>{currentUserMessage}</p>
        </UserMessageInHeader>
      </Header>
      
      {/* Chat Messages Area */}
      <MessagesContainer ref={messagesRef}>
        <ClearingOverlay $isClearing={isClearing} />
        
        {isEmpty && !isTransitioning ? (
          <EmptyState>
            <h2>Ask me anything</h2>
            <p>I'd love to tell you about my experience, projects, or just chat!</p>
            <QuickActions actions={homePageActions} onActionClick={handleQuickAction} />
          </EmptyState>
        ) : (
          <>
            {/* Typing Indicator */}
            {showTypingIndicator && (
              <TypingIndicator>
                <TypingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingDots>
              </TypingIndicator>
            )}
            
            {/* Current Bot Response */}
            {responseType === 'text' && currentBotMessage && (
              <MessageWrapper $isUser={false} data-is-user="false">
                <MessageBubble $isUser={false}>
                  <MessageContent>
                    {currentBotMessage.split('\n\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </MessageContent>
                </MessageBubble>
              </MessageWrapper>
            )}
            
            {/* Current Bot Component Response */}
            {responseType === 'component' && currentBotComponent && (
              <MessageWrapper $isUser={false} data-is-user="false">
                <MessageBubble $isUser={false}>
                  <MessageContent>
                    {currentBotComponent}
                  </MessageContent>
                </MessageBubble>
              </MessageWrapper>
            )}
          </>
        )}
      </MessagesContainer>
      
        <InputArea>
          {/* Only show collapsible quick actions when there's an active conversation */}
          {!isEmpty && (
            <>
              <QuickActionsToggle 
                onClick={toggleQuickActions}
                className={quickActionsCollapsed ? 'collapsed' : ''}
              >
                <span className="chevron">↓</span>
                <span>{quickActionsCollapsed ? 'Show' : 'Hide'} quick questions</span>
              </QuickActionsToggle>
              
              <QuickActionsWrapper $isCollapsed={quickActionsCollapsed}>
                <QuickActions 
                  actions={homePageActions} 
                  onActionClick={handleQuickAction}
                  variant="compact"
                />
              </QuickActionsWrapper>
            </>
          )}
        
          <InputContainer 
            ref={inputContainerRef}
            className="glass"
            style={{ opacity: hideElementsDuringTransition ? 0 : 1 }}
          >
            <StyledTextarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={handleKeyPress}
              disabled={isTyping}
              rows={1}
              style={{
                outline: 'none',
                height: 'auto',
              }}
            />
            <SendButton 
              variant="primary"
              size="sm"
              onClick={handleSendMessage}
              disabled={isTyping}
              icon={<SendIcon />}
            />
          </InputContainer>
        </InputArea>
    </Container>
  );
};

export default ChatPage;