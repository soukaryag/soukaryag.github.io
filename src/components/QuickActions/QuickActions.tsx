import React from 'react';
import { ActionsContainer, ActionButton, ActionIcon, ActionText } from './QuickActions.styles';

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
        <ActionButton
          key={action.key}
          variant="glass"
          size="md"
          data-action={action.key}
          data-prompt={action.prompt}
          onClick={() => handleActionClick(action)}
          onKeyDown={(e) => handleKeyDown(e, action)}
          tabIndex={0}
        >
          <ActionIcon>{action.icon}</ActionIcon>
          <ActionText>{action.text}</ActionText>
        </ActionButton>
      ))}
    </ActionsContainer>
  );
};

export default QuickActions;
