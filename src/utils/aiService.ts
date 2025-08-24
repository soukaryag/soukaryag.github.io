// AI Service for external AI integration
// This will handle calls to external AI services like OpenAI, Claude, etc.

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class AIService {
  private static readonly API_ENDPOINT = '/api/chat'; // Future API endpoint
  private static readonly MAX_RETRIES = 3;

  /**
   * Send a message to external AI service
   * Currently returns a placeholder - will be implemented with actual AI integration
   */
  static async sendMessage(
    messages: AIMessage[],
    context?: string
  ): Promise<AIResponse> {
    try {
      // For now, return a placeholder response
      // This will be replaced with actual AI service integration
      return {
        success: false,
        error: `I'd love to help with that, but I'm not quite smart enough yet! 🤖

I'm currently limited to talking about Soukarya's background, experience, skills, and projects. 

For complex questions and conversations, I'll be getting AI superpowers soon! ⚡

Try asking about:
• Work experience and career journey
• Technical skills and technologies
• Projects and achievements  
• How to get in touch

Stay tuned for smarter responses! 🚀`
      };

      // Future implementation would look like:
      // const response = await fetch(this.API_ENDPOINT, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     messages,
      //     context,
      //     maxTokens: 1000,
      //     temperature: 0.7,
      //   }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error(`AI service error: ${response.status}`);
      // }
      // 
      // const data = await response.json();
      // return {
      //   success: true,
      //   message: data.message
      // };

    } catch (error) {
      console.error('AI Service error:', error);
      return {
        success: false,
        error: "Sorry, I'm having trouble thinking right now. Try again in a moment!"
      };
    }
  }

  /**
   * Check if the AI service is available
   */
  static async isAvailable(): Promise<boolean> {
    // For now, always return false since external AI is not implemented
    return false;

    // Future implementation:
    // try {
    //   const response = await fetch(`${this.API_ENDPOINT}/health`, {
    //     method: 'GET',
    //   });
    //   return response.ok;
    // } catch {
    //   return false;
    // }
  }

  /**
   * Get the context about Soukarya for AI responses
   */
  static getPersonalContext(): string {
    return `You are representing Soukarya Ghosh, a Software Engineer at Castle in NYC. 

Key information about Soukarya:
- Current Role: Software Engineer at Castle (2024-Present), working on fraud detection and security infrastructure
- Previous: Senior Engineer II at Amazon (2021-2024), grew from Engineer I to II
- Education: University of Virginia - Computer Science and Mathematics degrees, Economics minor
- Skills: Python, Java, TypeScript, React, AWS, security systems, AI/ML
- Notable Projects: TrackCorona (14M+ pageviews), TextAttack WebDemo, various hackathon wins
- Contact: sg4fz@virginia.edu, linkedin.com/in/soukaryaghosh, github.com/soukaryag
- Personal: UVA alum, Diet Coke enthusiast, hackathon addict, space nerd

Respond in a friendly, professional but casual tone. Be enthusiastic about technology and helpful in answering questions about Soukarya's background and experience.`;
  }

  /**
   * Determine if a query should use external AI
   */
  static shouldUseExternalAI(query: string): boolean {
    const externalAITriggers = [
      'what do you think about',
      'opinion',
      'latest news',
      'current events',
      'compare',
      'explain how to',
      'tutorial',
      'advice',
      'recommend',
      'help me with',
      'analyze',
      'discuss',
      'pros and cons',
      'best practices'
    ];

    const normalizedQuery = query.toLowerCase();
    return externalAITriggers.some(trigger => normalizedQuery.includes(trigger));
  }
}

export default AIService;
