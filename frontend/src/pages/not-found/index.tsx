import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <Container>
    <Content>
      <StatusCode>404</StatusCode>
      <Title>Page Not Found</Title>
      <Message>
        Oops! The page you're looking for doesn't exist or has been moved.
      </Message>
      <StyledLink to="/">← Go back to Home</StyledLink>
    </Content>
  </Container>
);

export default NotFound;

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Content = styled.div`
  text-align: center;
  max-width: 480px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.border};
`;

const StatusCode = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.buttonBg || '#6366f1'};
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  background-color: ${({ theme }) => theme.buttonBg || '#6366f1'};
  color: #fff;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHoverBackground || '#4f46e5'};
  }
`;
