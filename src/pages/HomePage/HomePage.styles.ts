import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const TopControls = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  z-index: 10;
`;

export const GitHubBadge = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: ${props => props.theme.transitions.medium};
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    border-left: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  }
`;

export const StatusBadge = styled.a`
  position: fixed;
  top: ${props => props.theme.spacing.lg};
  left: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  transition: ${props => props.theme.transitions.medium};
  z-index: 10;
  
  &:hover {
    color: ${props => props.theme.colors.text};
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    border-left: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideInUp 0.8s ease-out;
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: 1.1;
  margin: 0;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.25rem;
  }
`;

export const MainTitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xxxxxl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin: 0;
  opacity: 0.8;
`;

export const AvatarSection = styled.div`
  animation: slideInUp 0.8s ease-out 0.2s both;
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

export const AvatarImg = styled.img`
  width: calc(100%);
  height: calc(100%);
`;

export const InputSection = styled.div`
  width: 100%;
  max-width: 500px;
  animation: slideInUp 0.8s ease-out 0.4s both;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 40px;
  overflow: hidden;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid ${props => props.theme.colors.border};
  border-top: 1px solid rgba(255, 255, 255, 0.9);
  border-left: 1px solid rgba(255, 255, 255, 0.8);
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
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  background: transparent;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  outline: none;
  font-family: inherit;
  position: relative;
  z-index: 1;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #0171e3;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.medium};
  flex-shrink: 0;
  z-index: 2;
  
  &:hover {
    background: #026eda;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ActionsSection = styled.div`
  animation: slideInUp 0.8s ease-out 0.6s both;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: ${props => props.theme.spacing.lg} 0;
  animation: slideInUp 0.8s ease-out 0.8s both;
`;

export const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

export const FooterLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin: 0 ${props => props.theme.spacing.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;
