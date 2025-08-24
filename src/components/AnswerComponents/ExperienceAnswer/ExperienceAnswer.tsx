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
  Description,
  ProjectsGrid,
  ProjectCard,
  ProjectHeader,
  ProjectIcon,
  ProjectTitle,
  ProjectDescription,
  ProjectStats,
  Stat
} from './ExperienceAnswer.styles';

export interface ExperienceAnswerProps {
  className?: string;
}

export const ExperienceAnswer: React.FC<ExperienceAnswerProps> = ({ className }) => {
  const experiences = [
    {
      icon: '🏰',
      title: 'Software Engineer',
      company: 'Castle',
      duration: '2024-Present',
      description: 'Building fraud detection systems and security infrastructure for enterprise clients.'
    },
    {
      icon: '🚀',
      title: 'Software Engineer → Senior Engineer II',
      company: 'Amazon',
      duration: '2021-2024',
      description: 'Grew from Engineer I to II, leading design initiatives, mentoring teams, and building AWS automation systems.'
    },
    {
      icon: '💼',
      title: 'SDE Intern',
      company: 'Amazon',
      duration: '2020',
      description: 'Built password rotation systems and security infrastructure.'
    },
    {
      icon: '💳',
      title: 'Software Engineering Intern',
      company: 'Capital One',
      duration: '2019',
      description: 'Reduced AWS costs and built Jenkins pipelines for CI/CD automation.'
    }
  ];

  const projects = [
    {
      icon: '🦠',
      title: 'TrackCorona',
      description: 'Global COVID-19 tracker built during the pandemic to provide real-time, accurate data.',
      stats: '14M+ pageviews'
    },
    {
      icon: '🔒',
      title: 'Castle Security Systems',
      description: 'Building next-generation fraud detection systems (can\'t share all the details! 😏)',
      stats: 'Current work'
    },
    {
      icon: '🧠',
      title: 'TextAttack WebDemo',
      description: 'NLP Security Platform that made adversarial attack research accessible through a web interface.',
      stats: 'Open source'
    },
    {
      icon: '⚡',
      title: 'Custom TCP Web Server',
      description: 'Built a production-ready web server implementing HTTP protocols from scratch in C++.',
      stats: 'From scratch'
    },
    {
      icon: '🎯',
      title: 'Hackathon Projects',
      description: 'Various winning projects including blockchain voting systems, fintech apps, and veteran support tools.',
      stats: 'Multiple wins'
    }
  ];

  const revealItems: RevealItem[] = [
    {
      type: 'text',
      content: `Here's my professional journey and some projects I'm proud of:

Each role taught me something new about scaling systems, leading teams, and building products that users actually love.`
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
      loaderCount: 4
    },
    {
      type: 'component',
      content: (
        <Section>
          <SectionHeader>
            🚀 Notable Projects
          </SectionHeader>
        </Section>
      ),
      loader: 'line'
    },
    {
      type: 'grid',
      content: (
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectHeader>
                <ProjectIcon>{project.icon}</ProjectIcon>
                <ProjectTitle>{project.title}</ProjectTitle>
              </ProjectHeader>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectStats>
                <Stat><span>{project.stats}</span></Stat>
              </ProjectStats>
            </ProjectCard>
          ))}
        </ProjectsGrid>
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
