import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import { Button } from '../../Button';
import {
  Container,
  SkillCategory,
  CategoryHeader,
  CategoryIcon,
  CategoryTitle,
  SkillsGrid,
} from './SkillsAnswer.styles';

export interface SkillsAnswerProps {
  className?: string;
  onRevealStart?: () => void;
}

interface Skill {
  name: string;
  proficiency: 'expert' | 'advanced' | 'intermediate';
}

interface SkillCategoryData {
  icon: string;
  title: string;
  skills: Skill[];
}

export const SkillsAnswer: React.FC<SkillsAnswerProps> = ({ className, onRevealStart }) => {
  const skillCategories: SkillCategoryData[] = [
    {
      icon: '🔧',
      title: 'Programming Languages',
      skills: [
        { name: 'Python', proficiency: 'expert' },
        { name: 'Java', proficiency: 'expert' },
        { name: 'TypeScript', proficiency: 'expert' },
        { name: 'C++', proficiency: 'expert' },
        { name: 'Ruby', proficiency: 'advanced' },
        { name: 'Groovy', proficiency: 'advanced' },
        { name: 'SQL', proficiency: 'advanced' },
        { name: 'Bash', proficiency: 'advanced' },
      ]
    },
    {
      icon: '💻',
      title: 'Frontend & Mobile',
      skills: [
        { name: 'React.js', proficiency: 'expert' },
        { name: 'React Native', proficiency: 'advanced' },
        { name: 'Responsive Design', proficiency: 'expert' },
        { name: 'Styled Components', proficiency: 'advanced' },
      ]
    },
    {
      icon: '⚙️',
      title: 'Backend & Frameworks',
      skills: [
        { name: 'Django', proficiency: 'expert' },
        { name: 'Java Spring Boot', proficiency: 'advanced' },
        { name: 'Flask', proficiency: 'advanced' },
        { name: 'Node.js', proficiency: 'advanced' },
        { name: 'Apache Camel', proficiency: 'intermediate' },
        { name: 'Serverless', proficiency: 'advanced' },
      ]
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', proficiency: 'expert' },
        { name: 'Google Cloud', proficiency: 'advanced' },
        { name: 'Docker', proficiency: 'advanced' },
        { name: 'Jenkins CI/CD', proficiency: 'advanced' },
        { name: 'Git', proficiency: 'expert' },
      ]
    },
    {
      icon: '🗄️',
      title: 'Data & APIs',
      skills: [
        { name: 'SQL Databases', proficiency: 'advanced' },
        { name: 'Google Maps API', proficiency: 'expert' },
        { name: 'WebSockets', proficiency: 'advanced' },
        { name: 'Meta CAPI', proficiency: 'advanced' },
      ]
    },
    {
      icon: '🤖',
      title: 'LLMs',
      skills: [
        { name: 'Claude', proficiency: 'advanced' },
        { name: 'Cursor', proficiency: 'advanced' },
        { name: 'GPT', proficiency: 'advanced' },
        { name: 'Gemini', proficiency: 'advanced' },
      ]
    },
  ];

  const revealItems: RevealItem[] = [
    {
      type: 'header',
      content: 'Skills & Technologies',
    },
    // Create a reveal item for each skill category
    ...skillCategories.map((category, index) => ({
      type: 'component' as const,
      content: (
        <SkillCategory key={index}>
          <CategoryHeader>
            <CategoryIcon>{category.icon}</CategoryIcon>
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryHeader>
          
          <SkillsGrid>
            {category.skills.map((skill, skillIndex) => (
              <Button
                key={skillIndex}
                variant="glass"
                size="sm"
                className="glass btn-hover"
                style={{
                  opacity: skill.proficiency === 'expert' ? 1 : 
                    skill.proficiency === 'advanced' ? 0.85 : 0.7,
                  fontWeight: skill.proficiency === 'expert' ? 600 : 
                    skill.proficiency === 'advanced' ? 500 : 400,
                  padding: '0.8rem 1rem',
                }}
              >
                {skill.name}
              </Button>
            ))}
          </SkillsGrid>
        </SkillCategory>
      ),
      loader: 'grid' as const,
      loaderCount: category.skills.length
    }))
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
