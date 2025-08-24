import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
`;

export const SkillCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

export const CategoryTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extraBold};
  color: ${({ theme }) => theme.colors.text};
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
  
  /* Ensure buttons take full width of their grid cell */
  & > button {
    width: 100%;
    justify-self: stretch;
  }
`;

export const Intro = styled.p`
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;
