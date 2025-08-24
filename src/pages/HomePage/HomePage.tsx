import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, QuickActions } from '../../components';
import { QuickAction } from '../../components/QuickActions';
import { useTypingPlaceholder } from '../../hooks/useTypingPlaceholder';
import { getQuickActionsForComponent } from '../../config/quickActions';
import {
  Container,
  TopControls,
  GitHubBadge,
  StatusBadge,
  MainContent,
  TitleSection,
  Subtitle,
  MainTitle,
  AvatarSection,
  AvatarContainer,
  AvatarImg,
  InputSection,
  InputContainer,
  StyledInput,
  SubmitButton,
  ActionsSection,
  Footer,
  FooterText,
  FooterLink,
  TopControlsRight
} from './HomePage.styles';

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M13 7L18 12L13 17M6 12H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Typing placeholder animation
  const phrases = [
    "Ask me anything...",
    "Where do you work?",
    "Tell me about your experiences",
    "What are your skills?",
    "How can I contact you?",
    "Tell me something fun about you!"
  ];
  
  const typingPlaceholder = useTypingPlaceholder(phrases, {
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000,
    startDelay: 2000
  }, !inputValue.trim()); // Only active when input is empty

  // Use common quick actions configuration
  const quickActions: QuickAction[] = getQuickActionsForComponent();

  // Focus input on mount and after animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Global click handler to focus input
  useEffect(() => {
    const handleGlobalClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('button') && 
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
      // Numbers 1-5 for quick actions
      if (e.key >= '1' && e.key <= '5' && (!e.target || (e.target as HTMLElement).tagName !== 'INPUT')) {
        const index = parseInt(e.key) - 1;
        if (quickActions[index]) {
          handleQuickAction(quickActions[index]);
        }
      }
      
      // Escape to clear input
      if (e.key === 'Escape') {
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [quickActions]);

  const handleInputSubmit = () => {
    const query = inputValue.trim();
    if (!query || isLoading) return;
    
    setIsLoading(true);
    
    // Navigate to chat with query after brief delay
    setTimeout(() => {
      navigateToChat(query);
    }, 300);
  };

  const handleQuickAction = (action: QuickAction) => {
    navigateToChat(action.query || '');
  };

  const navigateToChat = (query = '') => {
    // Store query for chat page
    if (query) {
      sessionStorage.setItem('initialQuery', query);
    }
    
    // Navigate to chat page
    navigate('/chat');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <Container>
      <TopControls>
        {/* <StatusBadge href="https://www.getcastle.com/careers" target="_blank" rel="noopener noreferrer" className="glass btn-hover">
          Come work at Castle!
        </StatusBadge> */}
        <div />
        <TopControlsRight>
          <ThemeToggle />
          <GitHubBadge href="https://github.com/soukaryag" target="_blank" rel="noopener noreferrer" className="glass btn-hover">
            GitHub
          </GitHubBadge>
        </TopControlsRight>
      </TopControls>
      
      {/* Main Content */}
      <MainContent>
        {/* Title Section */}
        <TitleSection>
          <Subtitle>Hey, I'm Soukarya 👋</Subtitle>
          <MainTitle>Ask me anything!</MainTitle>
        </TitleSection>

        {/* Avatar Section */}
        <AvatarSection>
          <AvatarContainer>
            <AvatarImg src="/images/memoji.png" alt="Soukarya's Memoji" />
          </AvatarContainer>
        </AvatarSection>
        
        {/* Input Section */}
        <InputSection>
          <InputContainer className="glass">
            <StyledInput
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={typingPlaceholder || ""}
              onKeyPress={handleKeyPress}
              autoComplete="off"
              spellCheck="false"
            />
            <SubmitButton 
              onClick={handleInputSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              ) : (
                <ArrowIcon />
              )}
            </SubmitButton>
          </InputContainer>
        </InputSection>
        
        {/* Quick Actions */}
        <ActionsSection>
          <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
        </ActionsSection>
      </MainContent>
      
      {/* Footer */}
      <Footer>
        <FooterText>
          Currently building the future of home finances at
          <FooterLink href="https://www.getcastle.com" target="_blank" rel="noopener noreferrer">
            Castle
          </FooterLink> 
          in NYC 🏰
        </FooterText>
      </Footer>
    </Container>
  );
};

export default HomePage;
