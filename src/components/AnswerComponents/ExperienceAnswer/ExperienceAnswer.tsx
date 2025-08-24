import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  Section,
  SectionHeader,
  TimelineContainer,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  ItemHeader,
  ItemTitle,
  Company,
  Duration,
  Description
} from './ExperienceAnswer.styles';

export interface ExperienceAnswerProps {
  className?: string;
  onRevealStart?: () => void;
}

export const ExperienceAnswer: React.FC<ExperienceAnswerProps> = ({ className, onRevealStart }) => {
  const experiences = [
    {
      icon: '🏰',
      title: 'Tech Lead',
      company: 'Castle',
      duration: 'July 2024-Present',
      description: 'Seed stage startup building the future of homeowner finances.'
    },
    {
      icon: '🚀',
      title: 'Software Development Engineer II',
      company: 'Amazon',
      duration: 'Nov 2022 - July 2024',
      description: 'Designed global territory expansion doubling product reach. Led CD pipeline optimization and directed team service upgrades. Co-designed fullstack admin console for deal configurations and standardized on-call procedures.'
    },
    {
      icon: '💼',
      title: 'Software Development Engineer Intern',
      company: 'Amazon',
      description: 'Automated Private Engine Requests for corporate AWS customers worldwide. Led rules processing engine expansion and cross-team coordination for service generating $5B+ revenue. Built fullstack auditing system.'
    },
    {
      icon: '🏗️',
      title: 'Software Engineer',
      company: 'Castle (Part-time)',
      duration: 'Nov 2021 - Nov 2022',
      description: 'Worked fullstack on pre-seed startup MVP. Designed and implemented custom React Native end-to-end testing pipeline.'
    },
    {
      icon: '🦠',
      title: 'Co-founder & Developer',
      company: 'TrackCorona',
      duration: 'Jan 2020 - Jan 2021',
      description: 'Built highly scalable Django application with Google Maps API integration. Supported by Google and Oxylabs, handled $50K monthly costs at peak, serving 1M+ daily users.'
    },
    {
      icon: '🔧',
      title: 'Software Engineering Intern',
      company: 'Amazon',
      duration: 'May 2020 - Aug 2020',
      description: 'Increased internal tool security and efficiency over 1000x. Built password rotation systems and React UI prototypes.'
    },
    {
      icon: '💳',
      title: 'Software Engineering Intern',
      company: 'Capital One',
      description: 'Reduced AWS costs by decoupling external message handling. Created Android app for physical coin change conversion using computer vision.'
    }
  ];



  const revealItems: RevealItem[] = [
    {
      type: 'text',
      content: `I've been fortunate to work across startups and big tech, learning how to scale systems that serve millions while leading teams and building products that drive real business value.`
    },
    {
      type: 'component',
      content: (
        <Section>
          <SectionHeader>
            💼 Professional Experience
          </SectionHeader>
        </Section>
      ),
      loader: 'line'
    },
    {
      type: 'timeline',
      content: (
        <TimelineContainer>
          {experiences.map((experience, index) => (
            <TimelineItem key={index}>
              <TimelineIcon>{experience.icon}</TimelineIcon>
              <TimelineContent>
                <ItemHeader>
                  <div>
                    <ItemTitle>{experience.title}</ItemTitle>
                    <Company>{experience.company}</Company>
                  </div>
                  <Duration>{experience.duration}</Duration>
                </ItemHeader>
                <Description>{experience.description}</Description>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      ),
      loader: 'timeline',
      loaderCount: 7
    }
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
