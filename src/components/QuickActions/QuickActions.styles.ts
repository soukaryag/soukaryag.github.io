import styled from 'styled-components';
import Button from '../Button';

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  
  &.compact-actions {
    /* Hide webkit scrollbar for compact variant */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const ActionIcon = styled.span`
  font-size: ${props => props.theme.typography.fontSize.lg};
  line-height: 1;
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
