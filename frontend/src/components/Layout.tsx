import { styled } from "styled-components";
import ThemeToggle from "./ToggleTheme";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

interface Props {
  toggleTheme: () => void;
  isDark: boolean;
}

const MainLayout = ({isDark, toggleTheme}:Props) => {
  

  return (
    <Layout className=''>
      <Header>
        <AppTitle>🎵 Resonix</AppTitle>
        <ThemeToggle isDark={isDark} toggle={toggleTheme} />
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

export { MainLayout, Header, AppTitle, Body, Sidebar, ContentArea, Dismissable };

