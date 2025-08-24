import { QuickAction } from '../components/QuickActions';

export interface QuickActionConfig {
  key: string;
  icon: string;
  text: string;
  description: string;
  query: string;
}

export const QUICK_ACTIONS: QuickActionConfig[] = [
  {
    key: 'about',
    icon: '👨‍💻',
    text: 'Me',
    description: 'Learn about my background',
    query: 'Tell me about yourself'
  },
  {
    key: 'experience',
    icon: '🚀',
    text: 'Experience',
    description: 'My work journey and projects',
    query: "What's your work experience and projects?"
  },
  {
    key: 'skills',
    icon: '⚡',
    text: 'Skills',
    description: 'Technical skills and expertise',
    query: 'What are your technical skills?'
  },
  {
    key: 'fun',
    icon: '🎯',
    text: 'Fun',
    description: 'Personal interests and fun facts',
    query: 'Tell me something fun about you'
  },
  {
    key: 'contact',
    icon: '📧',
    text: 'Contact',
    description: 'How to reach me',
    query: 'How can I contact you?'
  },
];

// Convert to QuickAction format for components
export const getQuickActionsForComponent = (): QuickAction[] => {
  return QUICK_ACTIONS.map(action => ({
    key: action.key,
    icon: action.icon,
    text: action.text,
    query: action.query
  }));
};

// Get actions for chat page (without fun, more focused on professional)
export const getChatQuickActions = (): QuickAction[] => {
  return QUICK_ACTIONS
    .filter(action => action.key !== 'fun')
    .map(action => ({
      key: action.key,
      icon: action.icon,
      text: action.text,
      query: action.query
    }));
};
