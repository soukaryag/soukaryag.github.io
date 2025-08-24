import styled from 'styled-components';
import { Button, Input } from '../../components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background}00 0%,
    ${props => props.theme.colors.primary}05 25%,
    ${props => props.theme.colors.secondary}05 75%,
    ${props => props.theme.colors.background}00 100%
  );
  position: relative;
`;

export const BackButton = styled(Button)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  z-index: 10;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
`;

export const AvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Name = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

export const Title = styled.p`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const MessagesContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.textSecondary};
  }
`;

export const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  
  ${props => props.$isUser ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent});
    color: white;
    border-bottom-right-radius: ${props.theme.borderRadius.sm};
  ` : `
    background: ${props.theme.colors.glass};
    backdrop-filter: blur(10px);
    border: 1px solid ${props.theme.colors.border};
    color: ${props.theme.colors.text};
    border-bottom-left-radius: ${props.theme.borderRadius.sm};
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 90%;
  }
`;

export const MessageContent = styled.div`
  p {
    margin: 0 0 ${props => props.theme.spacing.xs} 0;
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TypingCursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const TypingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  border-bottom-left-radius: ${props => props.theme.borderRadius.sm};
  
  span {
    width: 6px;
    height: 6px;
    background: ${props => props.theme.colors.textSecondary};
    border-radius: 50%;
    animation: typingAnimation 1.4s infinite ease-in-out;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes typingAnimation {
    0%, 80%, 100% {
      transform: scale(0);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const InputArea = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
`;

export const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-end;
  max-width: 800px;
  margin: 0 auto;
`;

export const StyledInput = styled(Input)`
  flex: 1;
`;

export const SendButton = styled(Button)`
  min-width: auto;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: ${props => props.theme.borderRadius.md};
`;

export const QuickActionsContainer = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
`;

export const TopControls = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: center;
  z-index: 10;
`;

export const GitHubBadge = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.glass}cc;
    transform: translateY(-1px);
  }
`;
