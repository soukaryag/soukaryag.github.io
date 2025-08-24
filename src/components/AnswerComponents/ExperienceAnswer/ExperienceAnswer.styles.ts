import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionHeader = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TimelineItem = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 24px;
    top: 60px;
    bottom: -24px;
    width: 2px;
    background: ${({ theme }) => theme.colors.border}30;
  }
`;

export const TimelineIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}15;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

export const TimelineContent = styled.div`
  flex: 1;
  padding-top: 0.25rem;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const ItemTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Company = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-top: 0.25rem;
`;

export const Duration = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  white-space: nowrap;
`;

export const Description = styled.p`
  margin: 0.5rem 0 0 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

export const ProjectCard = styled.div`
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.surface}40;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border}30;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary}40;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.primary}10;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const ProjectIcon = styled.div`
  font-size: 1.5rem;
`;

export const ProjectTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProjectDescription = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;

export const ProjectStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border}20;
`;

export const Stat = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;
