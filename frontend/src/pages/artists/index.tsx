import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import ArtistList from './ArtistList';
import type { ArtistPayload } from '../../features/artists/artist.types';
import AddArtist from './AddArtist';
import { createArtist, deleteArtist, updateArtist } from '../../features/artists/artist.slice';


const ArtistsPage: React.FC = () => {
  const dispatch = useDispatch();



  const handleSubmit = (data: ArtistPayload, id?: string) => {
    if (id) {
      // dispatch(({ id, data: artist }));
    } else {
      dispatch(createArtist(data));
    }
  };

  const handleEdit = (artist: ArtistPayload, id?: string) => {
    dispatch(updateArtist({ data: artist , id: id || '' }));
  };

  const handleDelete = (artistId: string) => {
    dispatch(deleteArtist(artistId));
  };

  


  return (
    <PageWrapper>
      <Header>
        <h1>🎵 Artists</h1>
        <AddArtist
          onSubmit={handleSubmit}
        />
      </Header>

      <ArtistList onEdit={handleEdit} onDelete={handleDelete} />


    </PageWrapper>
  );
};

export default ArtistsPage;

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
