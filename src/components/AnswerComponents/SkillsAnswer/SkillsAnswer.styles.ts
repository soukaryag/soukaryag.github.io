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
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const CategoryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary}15;
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

export const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
`;

export const SkillChip = styled.div<{ $proficiency?: 'expert' | 'advanced' | 'intermediate' }>`
  padding: 0.75rem 1rem;
  background: ${({ theme, $proficiency }) => {
    switch ($proficiency) {
      case 'expert': return theme.colors.primary + '20';
      case 'advanced': return theme.colors.primary + '15';
      default: return theme.colors.surface + '40';
    }
  }};
  border: 1px solid ${({ theme, $proficiency }) => {
    switch ($proficiency) {
      case 'expert': return theme.colors.primary + '40';
      case 'advanced': return theme.colors.primary + '30';
      default: return theme.colors.border + '30';
    }
  }};
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 0 0 6px 6px;
    background: ${({ theme, $proficiency }) => {
      switch ($proficiency) {
        case 'expert': return theme.colors.primary;
        case 'advanced': return theme.colors.primary + '70';
        default: return theme.colors.primary + '30';
      }
    }};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}10;
  }
`;

export const SkillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SkillTag = styled.div<{ $highlight?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ theme, $highlight }) => 
    $highlight ? theme.colors.primary + '20' : theme.colors.surface + '40'};
  border: 1px solid ${({ theme, $highlight }) => 
    $highlight ? theme.colors.primary + '40' : theme.colors.border + '30'};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme, $highlight }) => 
    $highlight ? theme.colors.primary : theme.colors.text};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary}50;
  }
`;

export const ProficiencyLegend = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface}20;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border}20;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const LegendColor = styled.div<{ $level: 'expert' | 'advanced' | 'intermediate' }>`
  width: 12px;
  height: 3px;
  border-radius: 2px;
  background: ${({ theme, $level }) => {
    switch ($level) {
      case 'expert': return theme.colors.primary;
      case 'advanced': return theme.colors.primary + '70';
      default: return theme.colors.primary + '30';
    }
  }};
`;

export const Intro = styled.p`
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;
