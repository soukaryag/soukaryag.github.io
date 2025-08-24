import React from 'react';
import { ActionsContainer, ActionIcon, ActionText } from './QuickActions.styles';
import { Button } from '../Button';

export interface QuickAction {
  key: string;
  icon: string;
  text: string;
  query?: string;
  prompt?: string;
}

export interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: QuickAction) => void;
  variant?: 'default' | 'compact';
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick, variant = 'default' }) => {
  const handleActionClick = (action: QuickAction) => {
    if (onActionClick) {
      onActionClick(action);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: QuickAction) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActionClick(action);
    }
  };

  const isCompact = variant === 'compact';

  return (
    <ActionsContainer 
      className={isCompact ? 'compact-actions' : ''}
      style={isCompact ? {
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 0',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } : undefined}>
      {actions.map((action) => (
        <Button
          key={action.key}
          variant="glass"
          size={isCompact ? "sm" : "md"}
          data-action={action.key}
          data-prompt={action.prompt}
          onClick={() => handleActionClick(action)}
          onKeyDown={(e) => handleKeyDown(e, action)}
          tabIndex={0}
          style={isCompact ? {
            borderRadius: '25px',
            padding: '12px 16px',
            minWidth: 'auto',
            width: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          } : {
            borderRadius: '16px',
            padding: '16px 24px',
            width: '110px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ActionIcon style={isCompact ? { fontSize: '14px' } : undefined}>
            {action.icon}
          </ActionIcon>
          <ActionText style={isCompact ? { fontSize: '12px', fontWeight: 500 } : undefined}>
            {action.text}
          </ActionText>
        </Button>
      ))}
    </ActionsContainer>
  );
};

export default QuickActions;
