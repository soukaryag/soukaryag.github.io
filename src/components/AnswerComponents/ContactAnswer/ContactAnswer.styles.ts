import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
`;

export const Intro = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  text-align: center;
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.surface}40;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border}30;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary}40;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}10;
    background: ${({ theme }) => theme.colors.surface}60;
  }
`;

export const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary}15;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
`;

export const ContactInfo = styled.div`
  flex: 1;
`;

export const ContactLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const ContactValue = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  word-break: break-all;
`;

export const ContactNote = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
  opacity: 0.8;
`;

export const QuickContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.primary}08;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

export const QuickContactHeader = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const QuickContactText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-size: 0.95rem;
`;

export const PrimaryContactButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px ${({ theme }) => theme.colors.primary}30;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 1rem;
`;
