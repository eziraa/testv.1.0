import React, { use, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyls';
import { darkTheme, lightTheme } from './styles/theme';
import { MainLayout } from './components/Layout';

import SongPage from './pages/songs';
import NotFound from './pages/not-found';
import AlbumsPage from './pages/albums';
import ArtistsPage from './pages/artists';
import PlaylistPage from './pages/playlists';
import { DialogProvider } from './contexts/dialog.context';
import { ToastContainer } from 'react-toastify';
import SignUpPage from './pages/auth/signup';
import LoginPage from './pages/auth/login';
import HomePage from './pages/home';
import { useAppDispatch } from './app/store';
import { getMe } from './features/auth/auth.slice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getMe());
    }

  }, [dispatch]);


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
        <Routes>
          <Route element={<MainLayout toggleTheme={toggleTheme} isDark={isDark} />}>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/songs" element={<SongPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
          </Route>

          {/* Outside layout for auth pages */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </DialogProvider>
    </ThemeProvider>
  );
};

export default App;
