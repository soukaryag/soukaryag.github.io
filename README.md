# Soukarya's Portfolio - React + TypeScript + Styled Components 🚀

A modern, responsive portfolio website built with React, TypeScript, and styled-components. Features a ChatGPT-inspired interface, dark mode, and reusable component architecture.

## ✨ Features

- **Modern Tech Stack**: React 18, TypeScript, styled-components
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic system detection with manual override
- **Interactive Chat**: ChatGPT-style conversation interface
- **Component Architecture**: Fully reusable Button, Input, and UI components
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Theme System**: Comprehensive design tokens and styled-components theming
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Package Management**: Yarn-first with optimized dependencies

## 🛠 Tech Stack

### Core
- **React 18** - Latest React with concurrent features
- **TypeScript** - Full type safety and better developer experience
- **styled-components** - CSS-in-JS with theme support
- **React Router** - Client-side routing with HashRouter for GitHub Pages

### Development
- **Yarn** - Fast, reliable package management
- **Create React App** - Zero-config build tooling
- **ESLint + TypeScript** - Code quality and type checking
- **gh-pages** - Automated deployment to GitHub Pages

### Components & Architecture
```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Universal button component
│   ├── Input.tsx        # Form input component
│   ├── ThemeToggle.tsx  # Dark mode toggle
│   ├── QuickActions.tsx # Action button grid
│   └── ThemeProvider.tsx # Theme context provider
├── hooks/               # Custom React hooks
│   ├── useTheme.ts      # Theme management
│   └── useTypingPlaceholder.ts # Typing animation
├── pages/               # Route components
│   ├── HomePage.tsx     # Landing page
│   └── ChatPage.tsx     # Chat interface
├── theme/               # Design system
│   └── index.ts         # Theme tokens and configuration
├── styles/              # Global styles
│   └── GlobalStyles.ts  # styled-components global styles
└── utils/               # Helper functions
    └── chatResponses.ts # Chat logic
```

## 🎨 Design System

### Theme Structure
- **Colors**: Semantic color tokens for light/dark modes
- **Typography**: Font scales, weights, and line heights
- **Spacing**: Consistent spacing scale (xs to xxl)
- **Breakpoints**: Mobile-first responsive breakpoints
- **Shadows**: Elevation system with glass morphism
- **Transitions**: Consistent animation timings

### Component Variants
- **Button**: `primary | secondary | ghost | glass | danger`
- **Input**: `default | glass | minimal`
- **Sizes**: `sm | md | lg` across all components

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- Yarn 1.22+

### Installation
```bash
# Clone the repository
git clone https://github.com/soukaryag/soukaryag.github.io.git
cd soukaryag.github.io

# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build

# Deploy to GitHub Pages
yarn deploy
```

### Development
```bash
# Start development server (opens on http://localhost:3000)
yarn start

# Run TypeScript type checking
yarn build

# Run tests
yarn test
```

## 📱 Features Deep Dive

### Component Reusability
Every UI element is built as a reusable component with:
- **TypeScript interfaces** for prop validation
- **Variant system** for different styles
- **Size variants** for responsive scaling
- **Full accessibility** support
- **styled-components** theming

### Theme System
```typescript
// Example theme usage in components
const StyledButton = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
`;
```

### Dark Mode
- Automatic system preference detection
- Manual toggle with localStorage persistence  
- Smooth transitions between themes
- WCAG compliant contrast ratios

### Responsive Design
- Mobile-first approach with breakpoints
- Flexible grid systems
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎯 Performance

- **Bundle Size**: ~96KB gzipped (optimized build)
- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Excellent scores
- **Tree Shaking**: Automatic dead code elimination
- **Code Splitting**: React.lazy for route-based splitting

## 🔧 Deployment

### GitHub Pages (Automatic)
```bash
yarn deploy
```

### Manual Build
```bash
yarn build
# Deploy contents of build/ folder to any static host
```

### Environment Variables
No environment variables required for basic operation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📫 Contact

**Soukarya Ghosh**
- Email: sg4fz@virginia.edu
- LinkedIn: [linkedin.com/in/soukaryaghosh](https://linkedin.com/in/soukaryaghosh)
- GitHub: [github.com/soukaryag](https://github.com/soukaryag)
- Website: [soukarya.com](https://soukarya.com)

---

Built with ❤️ using React, TypeScript, and styled-components