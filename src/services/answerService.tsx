import React from 'react';
import { 
  MeAnswer, 
  ExperienceAnswer, 
  ProjectsAnswer,
  SkillsAnswer, 
  ContactAnswer
} from '../components/AnswerComponents';

export interface AnswerResponse {
  type: 'text' | 'component';
  content: string | React.ReactNode;
}

export class AnswerService {
  private static predefinedResponses = {
    greeting: [
      "hey", "hello", "hi", "sup", "what's up"
    ],
    about: [
      "about", "who are you", "tell me about yourself", "introduce yourself"
    ],
    experience: [
      "experience", "work", "job", "career", "professional", "amazon", "castle", "capital one", "internship", "engineer", "work experience"
    ],
    projects: [
      "projects", "project", "portfolio", "built", "created", "trackcorona", "textattack", "hackathon", "show me your projects"
    ],
    skills: [
      "skills", "technologies", "programming", "languages", "tech stack", "python", "java", "typescript", "aws", "react", "django"
    ],
    contact: [
      "contact", "reach", "email", "phone", "linkedin", "get in touch"
    ],
    fun: [
      "fun", "hobbies", "personal", "interesting", "uva", "awards", "weightlifting", "bengali", "art", "design", "competition"
    ]
  };

  private static textResponses = {
    greeting: `Hey there! 👋 Great to see you! I'm Soukarya, a full-stack software engineer currently working at Castle in NYC, building the future of homeowner finances. I'm passionate about creating scalable systems that serve millions and drive real business impact.

What would you like to know about me?`,

    fun: `Here's some fun stuff about me:

🎓 **Wahoo!** I'm a proud UVA alum with dual degrees and a 3.8 GPA - go Hoos! 🔶🔷

🏆 **Award Winner** - I received the Louis T. Rader Chairperson Award for community impact and led teams to statewide competition victories.

🦠 **Pandemic Builder** - Co-founded TrackCorona during COVID, scaling it to serve 1M+ daily users and handle $50K monthly costs.

🎯 **Problem Solver** - I genuinely get excited about systems that serve millions and generate billions in revenue. Yes, that's weird and awesome!

🏃‍♂️ **Fitness Enthusiast** - I'm fluent in Bengali and English, love art & design, and you might find me weightlifting when I'm not coding.

🌍 **Community Impact** - From EMS/health ventures to cryptocurrency clubs at UVA, I love building things that help people.`,

    fallback: `That's an interesting question! I'm still learning to understand everything, but I'd love to help you learn more about me.

Try asking about my experience (Amazon to Castle), skills (Python, Java, AWS), projects (TrackCorona, award-winning work), or how to get in touch. I'm always getting better at conversations! 😊`
  };

  static async generateResponse(input: string, onRevealStart?: () => void): Promise<AnswerResponse> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Check for component-based responses first
    if (this.shouldReturnMeComponent(normalizedInput)) {
      return {
        type: 'component',
        content: <MeAnswer key="me-answer" onRevealStart={onRevealStart} />
      };
    }

    if (this.shouldReturnExperienceComponent(normalizedInput)) {
      return {
        type: 'component',
        content: <ExperienceAnswer key="experience-answer" onRevealStart={onRevealStart} />
      };
    }

    if (this.shouldReturnProjectsComponent(normalizedInput)) {
      return {
        type: 'component',
        content: <ProjectsAnswer key="projects-answer" onRevealStart={onRevealStart} />
      };
    }

    if (this.shouldReturnSkillsComponent(normalizedInput)) {
      return {
        type: 'component',
        content: <SkillsAnswer key="skills-answer" onRevealStart={onRevealStart} />
      };
    }

    if (this.shouldReturnContactComponent(normalizedInput)) {
      return {
        type: 'component',
        content: <ContactAnswer key="contact-answer" onRevealStart={onRevealStart} />
      };
    }

    // Check for text-based responses
    for (const [category, keywords] of Object.entries(this.predefinedResponses)) {
      if (keywords.some(keyword => normalizedInput.includes(keyword))) {
        if (this.textResponses[category as keyof typeof this.textResponses]) {
          return {
            type: 'text',
            content: this.textResponses[category as keyof typeof this.textResponses]
          };
        }
      }
    }

    // Check for more complex queries that might need external AI
    if (this.shouldUseExternalAI(normalizedInput)) {
      const externalResponse = await this.getExternalAIResponse(normalizedInput);
      return {
        type: 'text',
        content: externalResponse
      };
    }

    return {
      type: 'text',
      content: this.textResponses.fallback
    };
  }

  private static shouldReturnMeComponent(input: string): boolean {
    const meKeywords = [
      'tell me about yourself',
      'who are you',
      'about yourself',
      'introduce yourself',
      'background',
      'tell me about you'
    ];
    return meKeywords.some(keyword => input.includes(keyword));
  }

  private static shouldReturnExperienceComponent(input: string): boolean {
    const experienceKeywords = [
      'experience',
      'work experience',
      'career',
      'professional',
      'job',
      'work'
    ];
    return experienceKeywords.some(keyword => input.includes(keyword));
  }

  private static shouldReturnProjectsComponent(input: string): boolean {
    const projectsKeywords = [
      'projects',
      'project',
      'portfolio',
      'built',
      'created',
      'show me your projects',
      'trackcorona',
      'synto',
      'rrate',
      'defai',
      'hackathon'
    ];
    return projectsKeywords.some(keyword => input.includes(keyword));
  }

  private static shouldReturnSkillsComponent(input: string): boolean {
    const skillsKeywords = [
      'skills',
      'technical skills',
      'technologies',
      'programming',
      'languages',
      'tech stack',
      'what can you do',
      'expertise'
    ];
    return skillsKeywords.some(keyword => input.includes(keyword));
  }

  private static shouldReturnContactComponent(input: string): boolean {
    const contactKeywords = [
      'contact',
      'reach',
      'get in touch',
      'email',
      'phone',
      'linkedin',
      'connect',
      'hire',
      'reach out'
    ];
    return contactKeywords.some(keyword => input.includes(keyword));
  }

  private static shouldUseExternalAI(input: string): boolean {
    // Determine if we should use external AI for this query
    const externalAITriggers = [
      'what do you think about',
      'opinion',
      'latest news',
      'current events',
      'compare',
      'explain',
      'how to',
      'tutorial',
      'advice',
      'recommend'
    ];

    return externalAITriggers.some(trigger => input.includes(trigger));
  }

  private static async getExternalAIResponse(input: string): Promise<string> {
    // Placeholder for external AI integration
    return `I'd love to help you with that, but I'm not quite smart enough to answer "${input}" yet! 🤖

I'm currently limited to talking about my background, experience, skills, and projects. But I'm always learning and getting smarter!

For now, try asking me about:
• My work experience and career journey
• Technical skills and technologies I use  
• Projects I've built and am proud of
• How to get in touch with me
• Fun facts about my life

I'll be getting AI superpowers soon to answer more complex questions! ⚡`;
  }
}
