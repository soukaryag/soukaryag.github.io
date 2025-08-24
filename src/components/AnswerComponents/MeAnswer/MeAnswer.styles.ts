import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;

  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 10px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

export const BasicInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BasicInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  }
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary}!important;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin: 0!important;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
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
