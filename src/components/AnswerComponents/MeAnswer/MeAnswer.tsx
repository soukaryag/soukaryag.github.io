import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  HeaderSection,
  ProfileImage,
  BasicInfo,
  Name,
  Title,
  TagsContainer,
  Tag,
  QuickFactsGrid,
  QuickFact,
  FactIcon,
  FactLabel,
  FactValue,
  BasicInfoText
} from './MeAnswer.styles';

export interface MeAnswerProps {
  className?: string;
  onRevealStart?: () => void;
}

export const MeAnswer: React.FC<MeAnswerProps> = ({ className, onRevealStart }) => {
  const tags = ['Engineer', 'Hobby Jogger', 'Human (I promise)'];
  
  const quickFacts = [
    {
      icon: '🎓',
      label: 'Education',
      value: 'UVA - B.S. Computer Science, B.A. Mathematics'
    },
    {
      icon: '🏢',
      label: 'Current Role',
      value: 'Software Engineer at Castle'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Brooklyn, NY'
    },
  ];

  const revealItems: RevealItem[] = [
    {
      type: 'component',
      content: (
        <HeaderSection>
          <ProfileImage src="/images/portrait.JPG" alt="Soukarya's Avatar" />
          <BasicInfo>
            <BasicInfoText>
              <Name>Soukarya Ghosh</Name>
              <Title>Full-Stack Software Engineer</Title>
              <Title>Ex-Amazon, currently building at Castle</Title>
            </BasicInfoText>

            <TagsContainer>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
          </BasicInfo>
        </HeaderSection>
      ),
      loader: 'card'
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
    },
    {
      type: 'text',
      content: `Hey there! 👋 I'm Soukarya, a full-stack software engineer currently working at Castle in NYC, building the future of homeowner finances.

I graduated from University of Virginia with dual degrees in Computer Science (B.S.) and Mathematics (B.A.), plus a minor in Economics. My journey started with internships at Capital One and Amazon, then grew into a full-time role where I advanced from Software Development Engineer to Engineer II, leading major initiatives and cross-team coordination. Now I'm applying that experience to help build the future of homeowner finances at Castle.`
    },
  ];

  return (
    <Container className={className}>
      <ProgressiveReveal
        items={revealItems}
        startDelay={200}
        componentDelay={200}
        onRevealStart={onRevealStart}
      />
    </Container>
  );
};
