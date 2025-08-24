import React from 'react';
import { ProgressiveReveal, RevealItem } from '../ProgressiveReveal';
import {
  Container,
  SkillCategory,
  CategoryHeader,
  CategoryIcon,
  CategoryTitle,
  SkillsGrid,
  SkillChip,
  ProficiencyLegend,
  LegendItem,
  LegendColor
} from './SkillsAnswer.styles';

export interface SkillsAnswerProps {
  className?: string;
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

export const SkillsAnswer: React.FC<SkillsAnswerProps> = ({ className }) => {
  const skillCategories: SkillCategoryData[] = [
    {
      icon: '🔧',
      title: 'Languages',
      skills: [
        { name: 'Python', proficiency: 'expert' },
        { name: 'Java', proficiency: 'expert' },
        { name: 'TypeScript', proficiency: 'expert' },
        { name: 'JavaScript', proficiency: 'expert' },
        { name: 'C++', proficiency: 'advanced' },
        { name: 'Go', proficiency: 'advanced' },
        { name: 'Bash', proficiency: 'advanced' }
      ]
    },
    {
      icon: '💻',
      title: 'Frontend',
      skills: [
        { name: 'React.js', proficiency: 'expert' },
        { name: 'Next.js', proficiency: 'advanced' },
        { name: 'HTML5/CSS3', proficiency: 'expert' },
        { name: 'Responsive Design', proficiency: 'expert' },
        { name: 'Styled Components', proficiency: 'advanced' }
      ]
    },
    {
      icon: '⚙️',
      title: 'Backend',
      skills: [
        { name: 'Node.js', proficiency: 'expert' },
        { name: 'Django', proficiency: 'advanced' },
        { name: 'Flask', proficiency: 'advanced' },
        { name: 'Express.js', proficiency: 'expert' },
        { name: 'Microservices', proficiency: 'advanced' }
      ]
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS', proficiency: 'expert' },
        { name: 'GCP', proficiency: 'advanced' },
        { name: 'Docker', proficiency: 'expert' },
        { name: 'Kubernetes', proficiency: 'advanced' },
        { name: 'Jenkins CI/CD', proficiency: 'advanced' }
      ]
    },
    {
      icon: '🗄️',
      title: 'Databases',
      skills: [
        { name: 'PostgreSQL', proficiency: 'expert' },
        { name: 'MongoDB', proficiency: 'advanced' },
        { name: 'Redis', proficiency: 'advanced' },
        { name: 'DynamoDB', proficiency: 'advanced' }
      ]
    },
    {
      icon: '🤖',
      title: 'AI/ML',
      skills: [
        { name: 'TensorFlow', proficiency: 'advanced' },
        { name: 'PyTorch', proficiency: 'advanced' },
        { name: 'NLP', proficiency: 'advanced' },
        { name: 'Computer Vision', proficiency: 'intermediate' }
      ]
    },
    {
      icon: '🔒',
      title: 'Security',
      skills: [
        { name: 'Fraud Detection', proficiency: 'expert' },
        { name: 'Secure System Design', proficiency: 'advanced' },
        { name: 'Threat Modeling', proficiency: 'advanced' }
      ]
    }
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
              <SkillChip key={skillIndex} $proficiency={skill.proficiency}>
                {skill.name}
              </SkillChip>
            ))}
          </SkillsGrid>
        </SkillCategory>
      ),
      loader: 'grid' as const,
      loaderCount: category.skills.length
    })),
    {
      type: 'component',
      content: (
        <ProficiencyLegend>
          <LegendItem>
            <LegendColor $level="expert" />
            <span>Expert</span>
          </LegendItem>
          <LegendItem>
            <LegendColor $level="advanced" />
            <span>Advanced</span>
          </LegendItem>
          <LegendItem>
            <LegendColor $level="intermediate" />
            <span>Intermediate</span>
          </LegendItem>
        </ProficiencyLegend>
      ),
      loader: 'line'
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
