import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import type { SongPayload } from '../../features/songs/song.types';
import { createSong, deleteSong, updateSong } from '../../features/songs/song.slice';
import { Button } from '../../components/Button';
import { Plus } from 'lucide-react';
import FavoriteSongList from './Favorites';


const FavoriteSongsPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data: SongPayload, id?: string) => {
    if (id) {
      dispatch(updateSong({ id, data: data }));
    } else {
      dispatch(createSong(data));
    }
  };

  const handleDelete = (songId: string) => {
    dispatch(deleteSong(songId))
  };


  return (
    <PageWrapper>
      <Header>
        <h1>🎵 Favorite songs</h1>
      </Header>

      <FavoriteSongList onEdit={handleSubmit} onDelete={handleDelete} />


    </PageWrapper>
  );
};

export default FavoriteSongsPage;

// Styled Components

const PageWrapper = styled.div`
  padding: 1rem;
  max-width: 1024px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-items: start;

  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
    margin: 0;
    flex-direction: column;
    justify-items: center;
    max-width: 100vw;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.textSecondary};
    margin: 0;
    font-weight: 600;
    text-align: left;
    flex: 1;

  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
  }
`;
