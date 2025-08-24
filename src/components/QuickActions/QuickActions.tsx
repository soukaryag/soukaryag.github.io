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
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => {
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

  return (
    <ActionsContainer>
      {actions.map((action) => (
        <Button
          key={action.key}
          variant="glass"
          size="md"
          data-action={action.key}
          data-prompt={action.prompt}
          onClick={() => handleActionClick(action)}
          onKeyDown={(e) => handleKeyDown(e, action)}
          tabIndex={0}
          style={{
            borderRadius: '16px',
            padding: '16px 24px',
            width: '110px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ActionIcon>{action.icon}</ActionIcon>
          <ActionText>{action.text}</ActionText>
        </Button>
      ))}
    </ActionsContainer>
  );
};

export default QuickActions;
