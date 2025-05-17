import { styled } from "styled-components";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
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
`;

export { MainLayout, Header, AppTitle, Body, Sidebar, ContentArea };
