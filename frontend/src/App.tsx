import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import  { ThemeProvider } from 'styled-components';
import ThemeToggle from './components/ToggleTheme';
import GlobalStyle from './styles/globalStyls';
import { darkTheme, lightTheme } from './styles/theme';
import { AppTitle, Body, ContentArea, Header, MainLayout } from './components/Layout';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <MainLayout>
        <Header>
          <AppTitle>🎵 My Music App</AppTitle>
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
        </Header>
        <Body>
          <ContentArea>
            <Routes>
            </Routes>
          </ContentArea>
        </Body>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
