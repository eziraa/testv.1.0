import { styled } from "styled-components";
import ThemeToggle from "./ToggleTheme";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import React from "react";
import ProfileDropdown from "./ProfileDropDown";
import { User } from "lucide-react";
import MiniPlayer from "./SongPlayer";

interface Props {
  toggleTheme: () => void;
  isDark: boolean;
}

const MainLayout = ({ isDark, toggleTheme }: Props) => {

  const [showDropdown, setShowDropdown] = React.useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown') && !target.closest('.avatar')) {
      setShowDropdown(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Layout className=''>
      <Header>
        <AppTitle>🎵 Resonix</AppTitle>
        <MiniPlayer/>
        <RightSection>
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <ProfileWrapper>
            <button className="avatar" style={{display: "inline",backgroundColor:"transparent", padding:"0rem"}} onClick={() => setShowDropdown(prev => !prev)} >
              <Avatar src="/avatar.png" fallbackIcon={<User size={15}/>}  />
            </button >
            {showDropdown && <ProfileDropdown />}
          </ProfileWrapper>
        </RightSection>
      </Header>
      <Body>
        <SideBar />
        <ContentArea className='scroll-box'>
          <Outlet />
        </ContentArea>
      </Body>
    </Layout>
  )
}

export default MainLayout


const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Body = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.nav`
  width: 220px;
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  &.scroll-box {
    overflow-y: auto;
    max-height: calc(100vh - 64px); /* Adjust this value based on your header height */
  }
`;


const Dismissable = styled.span`
  display: inline;
  @media (max-width: 768px) {
    display: none;
  }
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`

const ProfileWrapper = styled.div`
  position: relative;
`

const AvatarImage = styled.img`
  cursor: pointer;
  transition: transform 0.2s;
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.mutedBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  z-index: 1;
  &:hover {
    padding: 0.04rem;
    transition: background 0.2s;
  }
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`
const Avatar = ({ src , fallbackIcon}: {
  src: string;
  fallbackIcon?: React.ReactNode;
}) => {
  // Check if the src is a valid URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <AvatarWrapper>
      {isValidUrl(src) ? (
        <AvatarImage src={src} alt="User Avatar" />
      ) : (
        fallbackIcon || <span style={{ fontSize: "1.5rem"  }}>No</span>
      )}
    </AvatarWrapper>
  )
}

export { MainLayout, Header, AppTitle, Body, Sidebar,Avatar, ContentArea, Dismissable };

