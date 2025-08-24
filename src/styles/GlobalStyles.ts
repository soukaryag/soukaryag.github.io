import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Custom Font */
  @font-face {
    font-family: 'CustomFont';
    src: url('/font/custom.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    transition: background-color ${props => props.theme.transitions.medium};
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.full};
    
    &:hover {
      background: ${props => props.theme.colors.textSecondary};
    }
  }

  /* Focus styles */
  *:focus {
    outline: none;
  }

  *:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  /* Selection styles */
  ::selection {
    background: ${props => props.theme.colors.primary}33;
    color: ${props => props.theme.colors.text};
  }

  /* Link styles */
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Input reset */
  input, textarea {
    border: none;
    background: none;
    font-family: inherit;
    color: inherit;
    
    &::placeholder {
      color: ${props => props.theme.colors.textSecondary};
      opacity: 0.8;
    }
  }

  /* Glass morphism effect classes */
  .glass {
    background: ${props => props.theme.colors.glass};
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid ${props => props.theme.colors.border};
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    border-left: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 16px;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  }

  .glass::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    pointer-events: none;
    border-radius: inherit;
  }

  .glass-strong {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(60px) saturate(200%);
    -webkit-backdrop-filter: blur(60px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-top: 1px solid rgba(255, 255, 255, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 0 rgba(255, 255, 255, 0.3);
  }

  .glass-strong::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    pointer-events: none;
    border-radius: inherit;
  }

  /* Animation classes */
  .slide-in-up {
    animation: slideInUp 0.8s ease-out;
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .fade-in-delay-1 {
    animation: fadeIn 0.8s ease-out;
  }

  .fade-in-delay-2 {
    animation: fadeIn 0.8s ease-out 0.2s both;
  }

  .fade-in-delay-3 {
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .fade-in-delay-4 {
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .btn-hover {
    transition: ${props => props.theme.transitions.medium};
    
    &:hover {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(50px) saturate(200%);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    &:active {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .shine {
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transform: rotate(45deg);
      transition: ${props => props.theme.transitions.medium};
      opacity: 0;
    }
    
    &:hover::before {
      animation: shine 0.6s ease-in-out;
    }
  }

  .ripple {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
    }
    
    &:active::after {
      width: 200px;
      height: 200px;
    }
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  /* Hide elements for screen readers only */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Responsive utilities */
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  /* Dark mode specific adjustments */
  [data-theme="dark"] {
    body {
      color-scheme: dark;
    }
  }

  /* Light mode specific adjustments */
  [data-theme="light"] {
    body {
      color-scheme: light;
    }
  }

  /* Keyframe animations */

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shine {
    0% {
      opacity: 0;
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }
    70% {
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  /* Print styles */
  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    
    a, a:visited {
      text-decoration: underline;
    }
    
    pre, blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }
    
    thead {
      display: table-header-group;
    }
    
    tr, img {
      page-break-inside: avoid;
    }
    
    img {
      max-width: 100% !important;
    }
    
    p, h2, h3 {
      orphans: 3;
      widows: 3;
    }
    
    h2, h3 {
      page-break-after: avoid;
    }
  }
`;

export default GlobalStyles;
