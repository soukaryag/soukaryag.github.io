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

export const UserMessageInHeader = styled.div<{ $visible: boolean }>`
  width: 100%;
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.md};
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '10px'});
  transition: all 0.3s ease;
  
  p {
    margin: 0;
    color: white !important;
  }
`;

export const MessagesContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  max-width: 750px;
  
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
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
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
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  
  ${props => props.$isUser ? `
    background: ${props.theme.colors.primary};
    border-radius: ${props.theme.borderRadius.full};

    div p {
      color: #ffffff!important;
    }
  ` : `
    background: transparent;
    border: none;

    div p {
      color: ${props.theme.colors.text}!important;
      margin-bottom: ${props.theme.spacing.md};
    }
  `}


  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
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
  justify-content: center;
  margin: ${props => props.theme.spacing.xl} 0;
`;

export const ClearingOverlay = styled.div<{ $isClearing: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background};
  opacity: ${props => props.$isClearing ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.$isClearing ? 'all' : 'none'};
  z-index: 5;
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
  padding: ${props => props.theme.spacing.md};
  z-index: 10;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const QuickActionsWrapper = styled.div<{ $isCollapsed: boolean }>`
  overflow: hidden;
  transition: all 0.3s ease;
  max-height: ${props => props.$isCollapsed ? '0' : '100px'};
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
`;

export const QuickActionsToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
  padding: ${props => props.theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  margin-bottom: ${props => props.theme.spacing.xs};
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
  
  .chevron {
    transition: transform 0.3s ease;
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
  
  &.collapsed .chevron {
    transform: rotate(180deg);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  align-items: flex-end;
  max-width: 700px;
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