import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, QuickActions } from '../../components';
import { QuickAction } from '../../components/QuickActions';
import { generateResponse } from '../../utils/chatResponses';
import {
  Container,
  BackButton,
  Header,
  AvatarContainer,
  Avatar,
  Name,
  Title,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  MessageContent,
  TypingCursor,
  TypingIndicator,
  TypingDots,
  InputArea,
  InputContainer,
  StyledInput,
  SendButton,
  QuickActionsContainer,
  TopControls,
  GitHubBadge
} from './ChatPage.styles';

export interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Quick actions for chat
  const quickActions: QuickAction[] = [
    { key: 'about', icon: '👨‍💻', text: 'Me', prompt: 'Tell me about yourself' },
    { key: 'experience', icon: '💼', text: 'Experience', prompt: "What's your work experience?" },
    { key: 'projects', icon: '🚀', text: 'Projects', prompt: 'Show me your projects' },
    { key: 'skills', icon: '⚡', text: 'Skills', prompt: 'What are your skills?' },
    { key: 'fun', icon: '🎯', text: 'Fun', prompt: 'Something fun about you?' },
    { key: 'contact', icon: '📧', text: 'Contact', prompt: 'How can I contact you?' }
  ];

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: Date.now(),
      type: 'bot',
      content: "Hi! Great to see you here. I'm ready to chat about my work, experience, projects, or anything else you're curious about! 🚀\n\nWhat would you like to know?",
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
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

  // Focus input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Global click handler
  useEffect(() => {
    const handleGlobalClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.message') && 
          !target.closest('button') && 
          !target.closest('a') &&
          !target.closest('[role="button"]')) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to go back
      if (e.key === 'Escape') {
        navigate('/');
      }
      
      // Numbers 1-6 for quick actions
      if (e.key >= '1' && e.key <= '6' && (!e.target || (e.target as HTMLElement).tagName !== 'INPUT')) {
        const index = parseInt(e.key) - 1;
        if (quickActions[index]) {
          handleQuickAction(quickActions[index]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Auto scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, showTypingIndicator, scrollToBottom]);

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addBotMessage = async (content: string, delay = 1000) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Wait for typing delay
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Hide typing indicator
    setShowTypingIndicator(false);
    
    // Start typing animation
    setIsTyping(true);
    
    const botMessage: Message = {
      id: Date.now(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, botMessage]);
    
    // Animate typing
    await typeMessage(botMessage.id, content);
    
    setIsTyping(false);
  };

  const typeMessage = async (messageId: number, content: string) => {
    const paragraphs = content.split('\n\n');
    let fullContent = '';
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      
      if (i > 0) {
        fullContent += '\n\n';
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: fullContent } : msg
        ));
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      for (let j = 0; j <= paragraph.length; j++) {
        fullContent = fullContent.split('\n\n').slice(0, i).join('\n\n') + 
                     (i > 0 ? '\n\n' : '') + 
                     paragraph.substring(0, j);
        
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, content: fullContent } : msg
        ));
        
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 15));
      }
    }
    
    // Mark typing as complete
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isTyping: false } : msg
    ));
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;
    
    handleUserInput(message);
    setInputValue('');
  };

  const handleUserInput = async (input: string) => {
    addUserMessage(input);
    const response = generateResponse(input.toLowerCase());
    await addBotMessage(response);
  };

  const handleQuickAction = (action: QuickAction) => {
    if (action.prompt) {
      handleUserInput(action.prompt);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    const lines = message.content.split('\n\n');
    
    return (
      <MessageWrapper key={message.id} $isUser={message.type === 'user'}>
        <MessageBubble $isUser={message.type === 'user'}>
          <MessageContent>
            {lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            {message.isTyping && <TypingCursor>|</TypingCursor>}
          </MessageContent>
        </MessageBubble>
      </MessageWrapper>
    );
  };

  return (
    <Container>
      {/* Back Button */}
      <BackButton 
        variant="glass" 
        size="sm" 
        onClick={() => navigate('/')}
        icon={<BackIcon />}
      >
        Home
      </BackButton>
      
      {/* Header */}
      <Header>
        <AvatarContainer>
          <Avatar src="/images/memoji.png" alt="Soukarya's Avatar" />
        </AvatarContainer>
        <Name>Chat with Soukarya</Name>
        <Title>Ask me anything about my experience, projects, or just say hello!</Title>
      </Header>
      
      {/* Chat Messages Area */}
      <MessagesContainer ref={messagesRef}>
        {messages.map(renderMessage)}
        
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
      </MessagesContainer>
      
      {/* Input Area */}
      <InputArea>
        <InputContainer>
          <StyledInput
            ref={inputRef}
            variant="glass"
            size="md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question..." 
            onKeyPress={handleKeyPress}
            autoComplete="off"
            maxLength={200}
            disabled={isTyping}
            fullWidth
          />
          <SendButton 
            variant="primary"
            size="md"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            icon={<SendIcon />}
          >
            {/* Icon only button */}
          </SendButton>
        </InputContainer>
      </InputArea>
      
      {/* Quick Action Buttons */}
      <QuickActionsContainer>
        <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
      </QuickActionsContainer>
      
      {/* Top Right Controls */}
      <TopControls>
        <ThemeToggle />
        <GitHubBadge href="https://github.com/soukaryag" target="_blank" rel="noopener noreferrer">
          <span>⭐</span>
          <span>Star</span>
          <span>248</span>
        </GitHubBadge>
      </TopControls>
    </Container>
  );
};

export default ChatPage;
