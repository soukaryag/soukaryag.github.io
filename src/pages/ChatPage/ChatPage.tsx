import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle, QuickActions, Button } from '../../components';
import { QuickAction } from '../../components/QuickActions';
import {
  Container,
  TopControls,
  Header,
  AvatarContainer,
  Avatar,
  ProfileInfo,
  Name,
  PersonalInfo,
  Bio,
  TagsContainer,
  Tag,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  MessageContent,
  TypingIndicator,
  TypingDots,
  InputArea,
  InputContainer,
  StyledTextarea,
  SendButton,
  EmptyState,
} from './ChatPage.styles';

export interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface QuickActionData {
  icon: string;
  title: string;
  description: string;
  prompt: string;
}

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 11L12 6L17 11M12 18V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Smart response handler with external AI integration placeholder
class ChatService {
  private static predefinedResponses = {
    greeting: [
      "hey", "hello", "hi", "sup", "what's up"
    ],
    about: [
      "about", "who are you", "tell me about yourself", "introduce yourself"
    ],
    experience: [
      "experience", "work", "job", "career", "professional", "amazon", "castle"
    ],
    skills: [
      "skills", "technologies", "programming", "languages", "tech stack"
    ],
    projects: [
      "projects", "built", "created", "made", "portfolio", "work"
    ],
    contact: [
      "contact", "reach", "email", "phone", "linkedin", "get in touch"
    ],
    fun: [
      "fun", "hobbies", "personal", "interesting", "diet coke", "uva"
    ]
  };

  private static responses = {
    greeting: `Hey there! 👋 Great to see you! I'm Soukarya, a full-stack software engineer currently working at Castle in NYC. I'm passionate about building secure, scalable systems that make a real impact.

What would you like to know about me?`,

    about: `I'm Soukarya Ghosh, a full-stack software engineer currently working at Castle in NYC, focusing on fraud detection and security infrastructure.

I graduated from University of Virginia with degrees in Computer Science and Mathematics, plus a minor in Economics. My journey has taken me through Amazon (where I grew from intern to Senior Engineer), several startups, and now Castle where I'm building critical security systems.

I'm passionate about the intersection of AI, security, and product engineering - basically building tech that actually matters and keeps people safe! 🛡️`,

    experience: `Here's my professional journey:

🏰 **Castle (2024-Present)** - Software Engineer
Building fraud detection systems and security infrastructure for enterprise clients.

🚀 **Amazon (2021-2024)** - Software Engineer → Senior Engineer II  
Grew from Engineer I to II, leading design initiatives, mentoring teams, and building AWS automation systems.

💼 **Previous Adventures:**
- Amazon SDE Intern (2020) - Built password rotation systems
- Capital One Intern (2019) - Reduced AWS costs, built Jenkins pipelines  
- Castle Part-time (2021-2022) - Frontend prototypes for fintech

Each role taught me something new about scaling systems, leading teams, and building products that users actually love.`,

    skills: `Here's what's in my technical toolkit:

🔧 **Languages:** Python, Java, TypeScript/JavaScript, C++, Go, Bash
💻 **Frontend:** React.js, Next.js, HTML5/CSS3, responsive design
⚙️ **Backend:** Node.js, Django, Flask, Express.js, microservices
☁️ **Cloud & DevOps:** AWS, GCP, Docker, Kubernetes, Jenkins CI/CD
🗄️ **Databases:** PostgreSQL, MongoDB, Redis, DynamoDB
🤖 **AI/ML:** TensorFlow, PyTorch, NLP, Computer Vision
🔒 **Security:** Fraud detection, secure system design, threat modeling`,

    projects: `Here are some projects I'm proud of:

🦠 **TrackCorona** - Global COVID-19 tracker (14M+ pageviews!)
Built during the pandemic to provide real-time, accurate data.

🔒 **Castle Security Systems** - Current work
Building next-generation fraud detection systems (can't share all the details! 😏)

🧠 **TextAttack WebDemo** - NLP Security Platform  
Made adversarial attack research accessible through a web interface.

⚡ **Custom TCP Web Server** - From Scratch
Built a production-ready web server implementing HTTP protocols in C++.

🎯 **Various Hackathon Winners**
Including blockchain voting systems, fintech apps, and veteran support tools.`,

    contact: `Let's connect! I'm always excited to chat about tech, opportunities, or just life in general.

📧 **Email:** sg4fz@virginia.edu
💼 **LinkedIn:** linkedin.com/in/soukaryaghosh  
🐙 **GitHub:** github.com/soukaryag
📱 **Phone:** +1 (571) 337-7193
🌐 **Website:** Right here! (soukarya.com)

Whether you're looking to collaborate on a project, discuss tech trends, or just want to say hi - my inbox is open!`,

    fun: `Here's some fun stuff about me:

🎓 **Wahoo!** I'm a proud UVA alum - go Hoos! 🔶🔷

🥤 **Diet Coke Enthusiast** - I may have built a terminal command that exploded Diet Coke cans across the screen. Priorities!

🎯 **Problem Solver** - I genuinely get excited about debugging. Yes, I know that's weird.

🎮 **Hackathon Addict** - There's something magical about building something awesome in 48 hours fueled by pizza and determination.

🚀 **Space Nerd** - I follow SpaceX launches religiously and dream about debugging code on Mars.`,

    fallback: `That's an interesting question! I'm still learning to understand everything, but I'd love to help you learn more about me.

Try asking about my experience, skills, projects, or how to get in touch. I'm always getting better at conversations! 😊`
  };

  static async generateResponse(input: string): Promise<string> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Check for predefined responses
    for (const [category, keywords] of Object.entries(this.predefinedResponses)) {
      if (keywords.some(keyword => normalizedInput.includes(keyword))) {
        return this.responses[category as keyof typeof this.responses];
      }
    }

    // Check for more complex queries that might need external AI
    if (this.shouldUseExternalAI(normalizedInput)) {
      return await this.getExternalAIResponse(normalizedInput);
    }

    return this.responses.fallback;
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

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const quickActions: QuickActionData[] = [
    { 
      icon: '👨‍💻', 
      title: 'Me', 
      description: 'Learn about my background',
      prompt: 'Tell me about yourself' 
    },
    { 
      icon: '💼', 
      title: 'Experiences', 
      description: 'My work and career journey',
      prompt: "What's your work experience?" 
    },
    { 
      icon: '⚡', 
      title: 'Skills', 
      description: 'Technical skills and expertise',
      prompt: 'What are your technical skills?' 
    },
    { 
      icon: '🚀', 
      title: 'Projects', 
      description: 'Things I\'ve built',
      prompt: 'Show me your projects' 
    }
  ];

  // Convert to QuickActions component format
  const homePageActions: QuickAction[] = quickActions.map(action => ({
    key: action.title.toLowerCase().replace(/\s+/g, '-'),
    icon: action.icon,
    text: action.title,
    query: action.prompt
  }));

  const tags = ['Engineer', 'Hobby Jogger', 'Human (I promise)'];

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  // Handle initial query from home page
  useEffect(() => {
    const initialQuery = sessionStorage.getItem('initialQuery');
    if (initialQuery) {
      sessionStorage.removeItem('initialQuery');
      setTimeout(() => {
        handleUserInput(initialQuery);
      }, 500);
    }
  }, []);

  // Auto scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, showTypingIndicator, scrollToBottom]);

  // Auto-resize textarea on input change
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addBotMessage = async (content: string) => {
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Hide typing indicator
    setShowTypingIndicator(false);
    
    const botMessage: Message = {
      id: Date.now() + 1,
      type: 'bot',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async () => {
    const message = inputValue.trim();
    if (!message || isTyping) return;
    
    setInputValue('');
    await handleUserInput(message);
  };

  const handleUserInput = async (input: string) => {
    addUserMessage(input);
    setIsTyping(true);
    
    try {
      const response = await ChatService.generateResponse(input);
      await addBotMessage(response);
    } catch (error) {
      await addBotMessage("Sorry, I'm having trouble thinking right now. Try asking again in a moment!");
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleUserInput(action.query || '');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    const lines = message.content.split('\n\n');
    
    return (
      <MessageWrapper key={message.id} $isUser={message.type === 'user'}>
        <MessageBubble $isUser={message.type === 'user'}>
          <MessageContent>
            {lines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </MessageContent>
        </MessageBubble>
      </MessageWrapper>
    );
  };

  const isEmpty = messages.length === 0;

  return (
    <Container>
      <TopControls>
        <Button
          variant="glass" 
          size="sm" 
          onClick={() => navigate('/')}
          style={{
            padding: '0.6rem 1rem',
            color: 'inherit',
          }}
        >
          Home
        </Button>
        
        <ThemeToggle />
      </TopControls>
      
      {/* Header with Profile */}
      <Header>
        <AvatarContainer onClick={() => navigate('/')}>
          <Avatar src="/images/memoji.png" alt="Soukarya's Avatar" />
        </AvatarContainer>
      </Header>
      
      {/* Chat Messages Area */}
      <MessagesContainer ref={messagesRef}>
        {isEmpty ? (
          <EmptyState>
            <h3>Ask me anything</h3>
            <p>I'd love to tell you about my experience, projects, or just chat!</p>
            <QuickActions actions={homePageActions} onActionClick={handleQuickAction} />
          </EmptyState>
        ) : (
          <>
            {messages.map(renderMessage)}
            
            {/* Typing Indicator */}
            {showTypingIndicator && (
              <TypingIndicator>
                <TypingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingDots>
              </TypingIndicator>
            )}
          </>
        )}
      </MessagesContainer>
      
      {/* Input Area */}
      <InputArea>
        <InputContainer className="glass">
          <StyledTextarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            rows={1}
            style={{
              outline: 'none',
            }}
          />
          <SendButton 
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={isTyping}
            icon={<SendIcon />}
          />
        </InputContainer>
      </InputArea>
    </Container>
  );
};

export default ChatPage;