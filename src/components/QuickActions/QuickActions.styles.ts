import styled from 'styled-components';
import Button from '../Button';

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  max-width: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const ActionIcon = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xxl};
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  position: relative;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.xl};
  }
`;

export const ActionText = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  line-height: 1;
  position: relative;
  z-index: 2;
  transition: color ${props => props.theme.transitions.fast};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`;

export const ActionButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  min-width: 4rem;
  height: auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
  width: 100%;
  
  /* Ensure text changes color on hover */
  &:hover:not(:disabled) {
    ${ActionText} {
      color: ${props => props.theme.colors.text};
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: 3.5rem;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xs};
  }
`;
