// Chat response generation utility

interface ResponseMap {
  [key: string]: string;
}

// Chat response generation utility
export const generateResponse = (input: string): string => {
  // Enhanced keyword matching for responses
  const responses: ResponseMap = {
    // About/Me responses
    about: `I'm Soukarya Ghosh, a Software Engineer currently working at Castle in NYC, focusing on fraud detection and security infrastructure.
    
I graduated from University of Virginia with degrees in Computer Science and Mathematics, plus a minor in Economics. My journey has taken me through Amazon (where I grew from intern to Senior Engineer), several startups, and now Castle where I'm building critical security systems.
    
I'm passionate about the intersection of AI, security, and product engineering - basically building tech that actually matters and keeps people safe! 🛡️`,
    
    experience: `Here's my professional journey:
    
🏰 **Castle (2024-Present)** - Software Engineer
Building fraud detection systems and security infrastructure for enterprise clients. It's like being a digital detective, but with more code and less trench coats!

🚀 **Amazon (2021-2024)** - Software Engineer → Senior Engineer II  
Grew from Engineer I to II, leading design initiatives, mentoring teams, and building AWS automation systems. Automated pricing requests for enterprise customers and built fullstack auditing systems.

💼 **Previous Adventures:**
- Amazon SDE Intern (2020) - Built password rotation systems, increased efficiency by 1000x
- Capital One Intern (2019) - Reduced AWS costs, built Jenkins pipelines  
- Castle Part-time (2021-2022) - Frontend prototypes for fintech
- Various other cool gigs since high school!

Each role taught me something new about scaling systems, leading teams, and building products that users actually love.`,
    
    skills: `Here's what's in my technical toolkit:
    
🔧 **Languages:** Python, Java, TypeScript/JavaScript, C++, Go, Bash
💻 **Frontend:** React.js, Next.js, HTML5/CSS3, responsive design
⚙️ **Backend:** Node.js, Django, Flask, Express.js, microservices
☁️ **Cloud & DevOps:** AWS (the whole suite!), GCP, Docker, Kubernetes, Jenkins CI/CD
🗄️ **Databases:** PostgreSQL, MongoDB, Redis, DynamoDB
🤖 **AI/ML:** TensorFlow, PyTorch, NLP, Computer Vision
🔒 **Security:** Fraud detection, secure system design, threat modeling

Plus the usual suspects: Git, Linux/Unix, Agile, and enough Diet Coke knowledge to be dangerous 🥤`,
    
    experiences: `Here are some experiences I'm proud of:
    
🦠 **TrackCorona** - Global COVID-19 tracker (14M+ pageviews!)
Built during the pandemic to provide real-time, accurate data. React frontend with automated data aggregation backend.

🔒 **Castle Security Systems** - Current work
Can't share all the details, but let's just say fraudsters don't like what we're building 😏

🧠 **TextAttack WebDemo** - NLP Security Platform  
Made adversarial attack research accessible through a web interface. Helps researchers test AI model robustness.

⚡ **Custom TCP Web Server** - From Scratch
Built a production-ready web server implementing HTTP protocols in C++. Because sometimes you need to understand how the internet actually works!

🎯 **Various Hackathon Winners**
Including blockchain voting systems, fintech apps, and veteran support tools. I love the energy of hackathons!`,
    
    contact: `Let's connect! I'm always excited to chat about tech, opportunities, or just life in general.
    
📧 **Email:** sg4fz@virginia.edu
💼 **LinkedIn:** linkedin.com/in/soukaryaghosh  
🐙 **GitHub:** github.com/soukaryag
📱 **Phone:** +1 (571) 337-7193
🌐 **Website:** Right here! (soukarya.com)

Whether you're looking to collaborate on a project, discuss tech trends, or just want to say hi - my inbox is open! I typically respond within a day or two.`,
    
    fun: `Here's some fun stuff about me:
    
🎓 **Wahoo!** I'm a proud UVA alum - hence the blue and orange theme! 🔶🔷
    
🥤 **Diet Coke Enthusiast** - I may have built a terminal command that exploded Diet Coke cans across the screen. Priorities, you know?
    
🎯 **Problem Solver** - I genuinely get excited about debugging. Yes, I know that's weird.
    
🎮 **Hackathon Addict** - There's something magical about building something awesome in 48 hours fueled by pizza and determination.
    
🚀 **Space Nerd** - I follow SpaceX launches religiously and dream about the day we'll debug code on Mars.
    
💡 **Random Experiences** - I once built a combinatorics calculator just because math is beautiful. It's probably still buried in my GitHub somewhere!
    
🎨 **Portfolio Evolution** - This site itself has gone through many iterations - from terminal UI to now this ChatGPT-style interface!`,
    
    default: `That's a great question! I'm still learning how to answer everything, but I can definitely tell you about:
    
• My background and experience 👨‍💻
• Technical skills and experiences 🚀  
• How to get in touch with me 📧
• Some fun facts about me 🎯

Try clicking one of the buttons below, or ask me something like "tell me about your experience at Amazon" or "what experiences are you most proud of?"

I'm always getting better at understanding what you're curious about! 😊`
  };
  
  // Advanced keyword matching with better context understanding
  if (input.includes('tell me about') || input.includes('about') || input.includes('who are you') || input.includes('yourself')) {
    return responses.about;
  } else if (input.includes('experience') || input.includes('work') || input.includes('job') || input.includes('career') || input.includes('amazon') || input.includes('castle')) {
    return responses.experience;
  } else if (input.includes('skill') || input.includes('tech') || input.includes('language') || input.includes('framework') || input.includes('programming')) {
    return responses.skills;
  } else if (input.includes('project') || input.includes('build') || input.includes('made') || input.includes('created') || input.includes('trackcorona')) {
    return responses.experiences;
  } else if (input.includes('contact') || input.includes('reach') || input.includes('email') || input.includes('linkedin') || input.includes('phone')) {
    return responses.contact;
  } else if (input.includes('fun') || input.includes('hobby') || input.includes('personal') || input.includes('interesting') || input.includes('diet coke') || input.includes('uva')) {
    return responses.fun;
  } else if (input.includes('hello') || input.includes('hi ') || input.includes('hey') || input.includes('sup')) {
    return `Hey there! 👋 Great to see you in the chat! I'm Soukarya, and I'm excited to tell you about my work in software engineering, AI, and security.

What would you like to know about me? You can ask about my experience, experiences, skills, or just chat!`;
  } else if (input.includes('how') && (input.includes('made') || input.includes('built this') || input.includes('create this'))) {
    return `Great question! This portfolio went through quite the journey! 🚀

I started with a terminal-style interface (complete with Diet Coke explosion effects 😄), then evolved it into this ChatGPT-inspired design. Now it's built with React and TypeScript for the ultimate clean implementation:

• **Frontend**: React.js with TypeScript and styled-components
• **Routing**: React Router with HashRouter for GitHub Pages
• **Styling**: styled-components with comprehensive theme system
• **Components**: Fully reusable Button, Input, and UI components
• **State Management**: React hooks with proper TypeScript types
• **Build Tools**: Create React App with yarn for dependency management
• **Deployment**: react-gh-pages for seamless GitHub Pages hosting

The architecture follows modern React patterns with component abstraction, type safety, and reusable design systems. Every component is built with styled-components for maximum reusability and maintainability!

Want to see the code? It's all open source on my GitHub! This is exactly how I'd build production React applications.`;
  } else {
    return responses.default;
  }
};
