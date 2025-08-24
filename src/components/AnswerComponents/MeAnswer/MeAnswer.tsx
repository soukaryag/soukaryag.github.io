import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  HeaderSection,
  ProfileImage,
  BasicInfo,
  Name,
  Title,
  Location,
  TagsContainer,
  Tag,
  QuickFactsGrid,
  QuickFact,
  FactIcon,
  FactLabel,
  FactValue
} from './MeAnswer.styles';

export interface MeAnswerProps {
  className?: string;
}

export const MeAnswer: React.FC<MeAnswerProps> = ({ className }) => {
  const tags = ['Engineer', 'Hobby Jogger', 'Human (I promise)'];
  
  const quickFacts = [
    {
      icon: '🎓',
      label: 'Education',
      value: 'UVA Computer Science & Mathematics'
    },
    {
      icon: '🏢',
      label: 'Current Role',
      value: 'Software Engineer at Castle'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'NYC'
    },
    {
      icon: '💝',
      label: 'Passion',
      value: 'AI & Security Tech'
    }
  ];

  const revealItems: RevealItem[] = [
    {
      type: 'text',
      content: `Hey there! 👋 I'm Soukarya, a full-stack software engineer currently working at Castle in NYC, focusing on fraud detection and security infrastructure.

I graduated from University of Virginia with degrees in Computer Science and Mathematics, plus a minor in Economics. My journey has taken me through Amazon (where I grew from intern to Senior Engineer), several startups, and now Castle where I'm building critical security systems.

I'm passionate about the intersection of AI, security, and product engineering - basically building tech that actually matters and keeps people safe! 🛡️`
    },
    {
      type: 'component',
      content: (
        <HeaderSection>
          <ProfileImage src="/images/memoji.png" alt="Soukarya's Avatar" />
          <BasicInfo>
            <Name>Soukarya Ghosh</Name>
            <Title>Full-Stack Software Engineer</Title>
            <Location>New York City</Location>
          </BasicInfo>
        </HeaderSection>
      ),
      loader: 'card'
    },
    {
      type: 'component',
      content: (
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      ),
      loader: 'line'
    },
    {
      type: 'grid',
      content: (
        <QuickFactsGrid>
          {quickFacts.map((fact, index) => (
            <QuickFact key={index}>
              <FactIcon>{fact.icon}</FactIcon>
              <FactLabel>{fact.label}</FactLabel>
              <FactValue>{fact.value}</FactValue>
            </QuickFact>
          ))}
        </QuickFactsGrid>
      ),
      loader: 'grid',
      loaderCount: 4
    }
  ];

  return (
    <Container className={className}>
      <ProgressiveReveal
        items={revealItems}
        startDelay={200}
        textSpeed={40}
        componentDelay={200}
      />
    </Container>
  );
};
