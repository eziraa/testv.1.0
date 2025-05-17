import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import SongList from './SongList';
import type {  SongPayload } from '../../features/songs/song.types';
import AddSong from './AddSong';


const SongsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [editingSong, setEditingSong] = useState<SongPayload | null>(null);



  const handleSubmit = (_: SongPayload, id?: string) => {
    if (id) {
    //   dispatch(updateSongSaga({ id, data: song }));
    } else {
    //   dispatch((song));
    }
  };

  const handleEdit = (song: SongPayload, id?: string) => {
    setEditingSong(song);
  };

  const handleDelete = (_: string) => {
    // dispatch(deleteSongSaga(id));
  };

  const handleOpen = () => {
    setEditingSong(null);
  };


  return (
    <PageWrapper>
      <Header>
        <h1>🎵 Songs</h1>
        <AddSong
            onSubmit={handleSubmit}
          />
      </Header>

      <SongList  onEdit={handleEdit} onDelete={handleDelete} />

         
    </PageWrapper>
  );
};

export default SongsPage;

// Styled Components

const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1024px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-items: start;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  background-color: #0f62fe;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #0353e9;
  }
`;
