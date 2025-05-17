// src/components/LoadingPage.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ message = 'Loading...' }) => {
  return (
    <Wrapper>
      <Spinner />
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default LoadingPage;

// Animations
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled Components
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background || 'linear-gradient(135deg, #fff, #efefef)'};
  color: ${({ theme }) => theme.textPrimary || '#000'};
  position: fixed;
  inset: 0;
  z-index: 9999;
  font-family: ${({ theme }) => theme.font || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
`;

const Spinner = styled.div`
  border: 6px solid ${({ theme }) => theme.spinnerBackground || 'rgba(255, 255, 255, 0.5)'};
  border-top: 4px solid ${({ theme }) => theme.spinnerColor || '#000'};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1.5rem;
`;

const Message = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  user-select: none;
  color: ${({ theme }) => theme.textPrimary || '#000'};
`;
