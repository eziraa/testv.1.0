import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import SideBar from './components/SideBar';
import ThemeToggle from './components/ToggleTheme';
import GlobalStyle from './styles/globalStyls';
import { darkTheme, lightTheme } from './styles/theme';
import { AppTitle, Body, ContentArea, Header, MainLayout } from './components/Layout';

import SongPage from './pages/songs';
import NotFound from './pages/not-found';
import AlbumsPage from './pages/albums';
import ArtistsPage from './pages/artists';
import { DialogProvider } from './contexts/dialog.context';
import { ToastContainer } from 'react-toastify';

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={isDark ? 'dark' : 'light'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DialogProvider>

        <MainLayout className=''>
          <Header>
            <AppTitle>🎵 Resonix</AppTitle>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </Header>
          <Body>
            <SideBar />
            <ContentArea className='scroll-box'>
              <Routes>
                <Route path="/" element={<Navigate to="/songs" />} />
                <Route path="/songs" element={<SongPage />} />
                <Route path="/artists" element={<ArtistsPage />} />
                <Route path="/albums" element={<AlbumsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ContentArea>
          </Body>
        </MainLayout>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default App;
