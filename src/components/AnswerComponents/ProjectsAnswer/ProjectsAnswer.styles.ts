import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
`;

export const Section = styled.div`
`;

export const SectionHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProjectsContainer = styled.div`
  position: relative;
  margin: 0 -2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0 -1rem;
  }
`;

export const ProjectsScrollWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure proper spacing at the ends */
  &::before,
  &::after {
    content: '';
    flex-shrink: 0;
    width: 0.1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem;
  }
`;

export const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border}30;
  background: ${({ theme }) => theme.colors.surface}40;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background: ${({ theme }) => theme.colors.surface}40;
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.border}30;
    }
  }
`;

export const ProjectCard = styled.div`
  width: 240px;
  height: 350px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 175px;
    height: 250px;
  }
`;

export const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary}40, 
    ${({ theme }) => theme.colors.accent}40
  );
  background-size: cover;
  background-position: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7) contrast(1.1);
    transition: filter 0.3s ease;
  }

  /* Additional darkening gradient overlay specifically for images */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 30%,
      transparent 60%,
      rgba(0, 0, 0, 0.1) 100%
    );
    z-index: 0;
    pointer-events: none;
  }
`;

export const ProjectOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  right: 0;
  height: 100%;
  padding: 1.5rem 1rem 1rem 1rem;
  z-index: 3;
  color: white;
`;

export const ProjectShortDescription = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const ProjectTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

export const ProjectStats = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export const Stat = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glass};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 0.3rem 0.5rem;
  font-size: 10px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  span {
    display: inline-block;
  }
`;