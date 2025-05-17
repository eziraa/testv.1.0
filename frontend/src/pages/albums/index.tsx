import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import AlbumList from './AlbumList';
import type { AlbumPayload } from '../../features/albums/album.types';
import AddAlbum from './AddAlbum';
import { createAlbum, deleteAlbum, updateAlbum } from '../../features/albums/album.slice';


const AlbumsPage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data: AlbumPayload, id?: string) => {
    if (id) {
      dispatch(updateAlbum({ id, data: data }));
    } else {
      dispatch(createAlbum(data));
    }
  };

  const handleDelete = (albumId: string) => {
    dispatch(deleteAlbum(albumId));
  };


  return (
    <PageWrapper>
      <Header>
        <Title>🎵 Albums</Title>
        <AddAlbum
          onSubmit={handleSubmit}
        />
      </Header>

      <AlbumList onEdit={handleSubmit} onDelete={handleDelete} />


    </PageWrapper>
  );
};

export default AlbumsPage;
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
