import styled from 'styled-components';
import { Button, Input } from '../../components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const TopControls = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing.lg};
  z-index: 10;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.spacing.md};
  text-align: center;
`;

export const AvatarContainer = styled.a`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Name = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
`;

export const PersonalInfo = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const Bio = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin: ${props => props.theme.spacing.md} 0;
  max-width: 600px;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  justify-content: center;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  backdrop-filter: blur(10px);
`;

export const MessagesContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  
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
  max-width: 80%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  
  ${props => props.$isUser ? `
    background: ${props.theme.colors.primary};
    border-radius: ${props.theme.borderRadius.full};

    div p {
      color: #ffffff!important;
    }
  ` : `
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid ${props.theme.colors.border};
    border-top: 1px solid rgba(255, 255, 255, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 18px 18px 18px 4px;
    position: relative;
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.05) 100%
      );
      pointer-events: none;
      border-radius: inherit;
    }

    div p {
      color: ${props.theme.colors.text}!important;
      position: relative;
      z-index: 1;
    }
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

export const TypingIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const TypingDots = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 18px 18px 18px 4px;
  
  span {
    width: 8px;
    height: 8px;
    background: #ffffff; /* Force white dots for glass elements */
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
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 10;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-end;
  max-width: 800px;
  margin: 0 auto;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 25px;
  padding: ${props => props.theme.spacing.sm};
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -1px 0 rgba(255, 255, 255, 0.3);
`;

export const StyledTextarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-family: ${props => props.theme.typography.fontFamily};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  resize: none;
  min-height: 20px;
  max-height: 120px;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SendButton = styled(Button)`
  min-width: auto;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  
  h3 {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-bottom: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }
  
  p {
    font-size: ${props => props.theme.typography.fontSize.md};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.sm};
  max-width: 600px;
`;

export const QuickActionCard = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: left;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.glass};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 20px;
  }
  
  .content {
    .title {
      font-weight: ${props => props.theme.typography.fontWeight.medium};
      color: ${props => props.theme.colors.text};
      margin: 0 0 2px 0;
      font-size: ${props => props.theme.typography.fontSize.sm};
    }
    
    .description {
      font-size: ${props => props.theme.typography.fontSize.xs};
      color: ${props => props.theme.colors.textSecondary};
      margin: 0;
    }
  }
`;