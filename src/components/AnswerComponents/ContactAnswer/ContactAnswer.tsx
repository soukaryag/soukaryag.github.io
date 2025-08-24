import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  ContactGrid,
  ContactCard,
  ContactIcon,
  ContactInfo,
  ContactLabel,
  ContactValue,
  ContactNote,
  QuickContactSection,
  QuickContactHeader,
  QuickContactText,
  PrimaryContactButtons,
  ContactButton,
  ButtonIcon
} from './ContactAnswer.styles';

export interface ContactAnswerProps {
  className?: string;
}

export const ContactAnswer: React.FC<ContactAnswerProps> = ({ className }) => {
  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'sg4fz@virginia.edu',
      href: 'mailto:sg4fz@virginia.edu',
      note: 'I probably won\'t respond to this'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/soukaryaghosh',
      href: 'https://linkedin.com/in/soukaryaghosh',
      note: 'Best place to reach out'
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: 'github.com/soukaryag',
      href: 'https://github.com/soukaryag',
      note: 'Check out my code!'
    },
    {
      icon: '🏃',
      label: 'Strava',
      value: 'Sub 3 at some point',
      href: 'https://www.strava.com/athletes/130671185',
      note: 'Why am I running?'
    }
  ];

  const revealItems: RevealItem[] = [
    {
      type: 'text',
      content: `Let's connect! I'm always excited to chat about tech, opportunities, or just life in general.

Whether you're looking to collaborate on a project, discuss tech trends, or just want to say hi - my inbox is open!`
    },
    {
      type: 'component',
      content: (
        <QuickContactSection>
          <QuickContactHeader>🚀 Quick Connect</QuickContactHeader>
          <QuickContactText>
            Ready to reach out? Here are the fastest ways to get in touch!
          </QuickContactText>
          <PrimaryContactButtons>
            <ContactButton href="mailto:sg4fz@virginia.edu">
              <ButtonIcon>📧</ButtonIcon>
              Email Me
            </ContactButton>
            <ContactButton href="https://linkedin.com/in/soukaryaghosh" target="_blank" rel="noopener noreferrer">
              <ButtonIcon>💼</ButtonIcon>
              LinkedIn
            </ContactButton>
          </PrimaryContactButtons>
        </QuickContactSection>
      ),
      loader: 'card'
    },
    {
      type: 'grid',
      content: (
        <ContactGrid>
          {contactMethods.map((contact, index) => (
            <ContactCard
              key={index}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <ContactIcon>{contact.icon}</ContactIcon>
              <ContactInfo>
                <ContactLabel>{contact.label}</ContactLabel>
                <ContactValue>{contact.value}</ContactValue>
                <ContactNote>{contact.note}</ContactNote>
              </ContactInfo>
            </ContactCard>
          ))}
        </ContactGrid>
      ),
      loader: 'grid',
      loaderCount: 5
    }
  ];

  return (
    <Container className={className}>
      <ProgressiveReveal
        items={revealItems}
        startDelay={200}
        textSpeed={35}
        componentDelay={200}
      />
    </Container>
  );
};
