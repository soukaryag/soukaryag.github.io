import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary}20;
`;

export const BasicInfo = styled.div`
  flex: 1;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

export const Location = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Tag = styled.span`
  padding: 0.4rem 0.8rem;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

export const Description = styled.div`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  
  p {
    margin: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const QuickFactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const QuickFact = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface}40;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border}30;
`;

export const FactIcon = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const FactLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const FactValue = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;
