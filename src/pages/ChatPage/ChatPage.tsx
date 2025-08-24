import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, QuickActions, Button } from '../../components';
import { QuickAction } from '../../components/QuickActions';
import { AnswerService } from '../../services/answerService';
import { getChatQuickActions } from '../../config/quickActions';
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
  const [quickActionsCollapsed, setQuickActionsCollapsed] = useState(() => {
    const saved = localStorage.getItem('quickActionsCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

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

  // Handle initial query from home page
  useEffect(() => {
    const initialQuery = sessionStorage.getItem('initialQuery');
    if (initialQuery) {
      sessionStorage.removeItem('initialQuery');
      setTimeout(() => {
        handleUserInput(initialQuery);
      }, 500);
    }
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

  const clearPreviousContent = async () => {
    setIsClearing(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setCurrentBotMessage('');
    setCurrentBotComponent(null);
    setShowUserMessage(false);
    setIsClearing(false);
  };

  const showUserMessageInHeader = (content: string) => {
    setCurrentUserMessage(content);
    setShowUserMessage(true);
  };

  const typeInBotResponse = async (content: string) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
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
  };

  const showBotComponent = async (component: React.ReactNode) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Hide typing indicator
    setShowTypingIndicator(false);
    
    // Show the component
    setCurrentBotComponent(component);
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;
    
    setInputValue('');
    await handleUserInput(message);
  };

  const handleUserInput = async (input: string) => {
    setIsTyping(true);
    
    // Clear previous content if any
    if (currentBotMessage || currentBotComponent || showUserMessage) {
      await clearPreviousContent();
    }
    
    // Show user message in header
    showUserMessageInHeader(input);
    
    try {
      const response = await AnswerService.generateResponse(input);
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
    }
  };

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

  const isEmpty = !currentBotMessage && !currentBotComponent && !showUserMessage;

  return (
    <Container>
      <TopControls>
        <Button
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/')}
          style={{
            padding: '0.6rem 1rem',
            color: 'inherit',
          }}
        >
          Home
        </Button>
        
        <ThemeToggle />
      </TopControls>
      
      {/* Header with Profile */}
      <Header>
        <AvatarContainer onClick={() => navigate('/')}>
          <Avatar src="/images/memoji.png" alt="Soukarya's Avatar" />
        </AvatarContainer>

        {/* User Message appears below profile */}
        <UserMessageInHeader $visible={showUserMessage}>
          <p>{currentUserMessage}</p>
        </UserMessageInHeader>
      </Header>
      
      {/* Chat Messages Area */}
      <MessagesContainer ref={messagesRef}>
        <ClearingOverlay $isClearing={isClearing} />
        
        {isEmpty ? (
          <EmptyState>
            <h3>Ask me anything</h3>
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
              <MessageWrapper $isUser={false}>
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
              <MessageWrapper $isUser={false}>
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
        
          <InputContainer className="glass">
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