import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import PlaylistList from './Playlists';
import type { PlaylistPayload } from '../../features/playlists/playlist.types';
import AddPlaylist from './AddPlaylist';
import { createPlaylist, deletePlaylist, updatePlaylist } from '../../features/playlists/playlist.slice';
import { Button } from '../../components/Button';
import { Plus } from 'lucide-react';


const PlaylistsPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data: PlaylistPayload, id?: string) => {
    if (id) {
      dispatch(updatePlaylist({ id, data: data }));
    } else {
      dispatch(createPlaylist(data));
    }
  };

  const handleDelete = (playlistId: string) => {
    dispatch(deletePlaylist(playlistId));
  };


  return (
    <PageWrapper>
      <Header>
        <Title>🎵 Playlists</Title>
        <AddPlaylist
          onSubmit={handleSubmit}
          triggerContent={<Button><Plus size={18} /></Button>}
        />
      </Header>

      <PlaylistList onEdit={handleSubmit} onDelete={handleDelete} />


    </PageWrapper>
  );
};

export default PlaylistsPage;
const PageWrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.textPrimary};
`;
