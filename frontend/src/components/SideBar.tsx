import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, Music, User, Music2 } from 'lucide-react';
import { CloseButton } from './Dialog';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useLocation().pathname;

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <MobileHeader>
        <MenuToggle onClick={toggleMenu} aria-label="Toggle navigation">
          <Menu size={24} />
        </MenuToggle>
        <Brand>
          <Music size={20} style={{ marginRight: '0.5rem' }} />
          Music App
        </Brand>
      </MobileHeader>

      <SidebarContainer isOpen={isOpen}>
        <Sidebar>
          <CloseButton style={{ display: "hidden" }} onClick={closeMenu} aria-label="Close navigation">
            <X size={24} />
          </CloseButton>
          <NavLinks>
            <StyledLink to="/artists" onClick={closeMenu} isActive={pathname === '/artists'}>
              <User size={18} /> Artists
            </StyledLink>
            <StyledLink to="/songs" onClick={closeMenu} isActive={pathname === '/songs'}>
              <Music2 size={18} /> Songs
            </StyledLink>
          </NavLinks>
        </Sidebar>
      </SidebarContainer>

      {isOpen && <Overlay onClick={closeMenu} />}
    </>
  );
};

export default Navbar;


const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  z-index: 1200;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.navBackground || '#ffffff'};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    position: static;
    transform: none;
    height: auto;
    box-shadow: none;
  }
`;

const Sidebar = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface StyledLinkProps {
  isActive?: boolean;
}
const StyledLink = styled(Link) <StyledLinkProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid
    ${({ isActive, theme }) =>
    isActive ? theme.navLinkActiveBg || '#4f46e5' : 'transparent'};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.navLinkActiveBg + '20' || '#eef2ff' : 'transparent'};
  color: ${({  theme }) => theme.navLinkColor || '#4f46e5'};
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-left: 4px solid ${({ theme }) => theme.navLinkActiveBg || '#4f46e5'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 1rem;
    height: 2px;
    width: calc(100% - 2rem);
    background-color: ${({ theme }) => theme.navLinkActiveBg || '#4f46e5'};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  svg {
    flex-shrink: 0;
    color: inherit;
  }
`;


const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: ${({ theme }) => theme.navBackground || '#ffffff'};
    border-bottom: 1px solid ${({ theme }) => theme.border || '#ddd'};
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.navLinkColor || '#333'};
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary || '#333'};
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  @media (min-width: 769px) {
    display: none;
  }
`;
