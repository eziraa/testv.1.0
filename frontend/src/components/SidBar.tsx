import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { CloseButton } from './Dialog';


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const pathname = useLocation().pathname;

  return (
    <>
      <MobileHeader>
        <MenuToggle onClick={toggleMenu} aria-label="Toggle navigation">
          <Menu size={24} />
        </MenuToggle>
        <Brand>🎵 Music</Brand>
      </MobileHeader>

      <SidebarContainer isOpen={isOpen}>
        <Sidebar>
          <CloseButton style={{right: "0", display: "none"}}   onClick={closeMenu} aria-label="Close navigation">
            <X size={24} />
          </CloseButton>
          <NavLinks>
            <StyledLink to="/artists" 
            onClick={closeMenu}
            isActive={pathname === '/artists'}
            >
              Artists
            </StyledLink>
            <StyledLink 
            to="/songs" onClick={closeMenu}
            isActive={pathname === '/songs'}>
              Songs
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
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.navBackground || '#f3f3f3'};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    position: static;
    height: auto;
    width: 220px;
    z-index: auto;
    transform: none;
    transition: none;
    box-shadow: none;
  }
`;

const Sidebar = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

interface StyledLinkProps {
  isActive?: boolean;
}
const StyledLink = styled(Link)<StyledLinkProps>`
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: ${({theme, isActive}) => isActive ? theme.navlinkActiveColor || '#fff' : theme.navLinkColor || '#333'};
  transition: background 0.3s, color 0.3s;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.navLinkActiveBg || '#e0e0e0' : 'transparent'};

  &:hover {
    background-color: ${({theme}) =>  theme.navLinkActiveBg || "transparent"};
    color: ${({theme}) =>  theme.navlinkActiveColor || theme.textPrimary};
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${({ theme }) => theme.navBackground || '#f3f3f3'};
    border-bottom: 1px solid ${({ theme }) => theme.border || '#ddd'};
  }
`;

const Brand = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.navLinkColor || '#333'};
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.buttonEdit || '#333'};
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
