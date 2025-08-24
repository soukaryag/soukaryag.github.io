import React, { useRef, useState, useEffect } from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  Section,
  SectionHeader,
  ProjectsContainer,
  ProjectsScrollWrapper,
  NavigationControls,
  NavButton,
  ProjectCard,
  ProjectImage,
  ProjectOverlay,
  ProjectShortDescription,
  ProjectTitle,
  ProjectStats,
  Stat
} from './ProjectsAnswer.styles';

export interface ProjectsAnswerProps {
  className?: string;
  onRevealStart?: () => void;
}

export const ProjectsAnswer: React.FC<ProjectsAnswerProps> = ({ className, onRevealStart }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const projects = [
    {
      title: 'TrackCorona',
      shortDescription: 'COVID Tracker',
      stats: ['1M+ Users', 'Published', 'Google/AWS Backed'],
      url: 'https://news.virginia.edu/content/computer-science-students-build-coronavirus-tracking-website',
      image_path: 'images/trackcorona.jpeg'
    },
    {
      title: 'TextAttack Web',
      shortDescription: 'NLP Security',
      stats: ['Open Source', 'Thesis'],
      url: 'https://textattack.readthedocs.io/en/master/',
      image_path: 'images/textattack.png'
    },
    {
      title: 'Evia',
      shortDescription: 'Hackathon',
      stats: ['Bitcamp 2019 Winner', 'Pitch Comp Winner'],
      url: 'https://devpost.com/software/evia',
      image_path: 'images/evia.png'
    },
    {
      title: 'Piggy',
      shortDescription: 'Hackathon',
      stats: ['Bitcamp 2019 Winner', 'Pitch Comp Winner'],
      url: 'https://github.com/soukaryag/piggy',
      image_path: 'images/piggy.png'
    },
    {
      title: 'TCP Web Server',
      shortDescription: 'From Scratch',
      stats: ['HTTP'],
      url: 'https://github.com/soukaryag/production-web-server',
      image_path: 'images/tcp.png'
    },
  ];

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 240; // Updated card width
      const gap = 24; // 1.5rem gap
      const scrollAmount = cardWidth + gap;
      const currentScroll = scrollRef.current.scrollLeft;
      const newScrollLeft = currentScroll + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollRef.current.scrollTo({ 
        left: Math.max(0, newScrollLeft), 
        behavior: 'smooth' 
      });
      
      // Update button states after scroll
      setTimeout(updateScrollButtons, 100);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      // Ensure we start at the beginning
      scrollContainer.scrollLeft = 0;
      updateScrollButtons();
      scrollContainer.addEventListener('scroll', updateScrollButtons);
      return () => scrollContainer.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const revealItems: RevealItem[] = [
    {
      type: 'component',
      content: (
        <Section>
          <SectionHeader>
            🚀 Featured Projects
          </SectionHeader>
        </Section>
      ),
      loader: 'line'
    },
    {
      type: 'component',
      content: (
        <ProjectsContainer>
          <ProjectsScrollWrapper ref={scrollRef}>
            {projects.map((project, index) => (
              <ProjectCard key={index} onClick={() => window.open(project.url, '_blank')}>
                <ProjectImage>
                  <img src={project.image_path} alt={project.title} />
                </ProjectImage>
                <ProjectOverlay>
                  <div>
                    <ProjectShortDescription>
                      {project.shortDescription}
                    </ProjectShortDescription>
                    <ProjectTitle>{project.title}</ProjectTitle>
                  </div>
                  <ProjectStats>
                    {project.stats.map((stat, statIndex) => (
                      <Stat key={statIndex}>
                        <span>{stat}</span>
                      </Stat>
                    ))}
                  </ProjectStats>
                </ProjectOverlay>
              </ProjectCard>
            ))}
          </ProjectsScrollWrapper>
          <NavigationControls>
            <NavButton 
              onClick={() => scroll('left')} 
              disabled={!canScrollLeft}
            >
              ←
            </NavButton>
            <NavButton 
              onClick={() => scroll('right')} 
              disabled={!canScrollRight}
            >
              →
            </NavButton>
          </NavigationControls>
        </ProjectsContainer>
      ),
      loader: 'grid',
      loaderCount: 7
    },
    {
      type: 'text',
      content: `From hackathon wins to enterprise solutions, I love building products that solve real problems. Here's a showcase of projects that demonstrate my range across web development, AI, blockchain, and systems programming.`
    },
    {
      type: 'text',
      content: `Here are some of my favorite projects:`
    },
    {
      type: 'text',
      content: `- TrackCorona: A COVID tracker that uses data from the Virginia Department of Health to track the spread of the virus in Virginia.`
    },
    {
      type: 'text',
      content: `- TextAttack Web: A web application that allows you to test the robustness of text-based models.`
    },
    {
      type: 'text',
      content: `- Evia: A mobile app that allows you to track your spending and budget.`
    },
    {
      type: 'text',
      content: `- Piggy: A mobile app that allows you to track your spending and budget.`
    },
    {
      type: 'text',
      content: `- TCP Web Server: A web server that allows you to serve HTTP requests.`
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
