import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import ArtistList from './ArtistList';
import AddArtist from './AddArtist';
import { createArtist, deleteArtist, updateArtist } from '../../features/artists/artist.slice';
import { Button } from '../../components/Button';
import { Plus } from 'lucide-react';
import Search from '../../components/Search';
import { flex, flexDirection, width } from 'styled-system';


const ArtistsPage: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data: FormData, id?: string) => {
    if (id) {
      dispatch(updateArtist({ id, data: data }));
    } else {
      dispatch(createArtist(data));
    }
  };


  const handleDelete = (artistId: string) => {
    dispatch(deleteArtist(artistId));
  };


  return (
    <PageWrapper>
      <Header>
        <h1>🎵 Artists</h1>
        <div style={{justifyItems: 'end' , display: 'flex',gap: "0.5rem"}}>
        <Search/>
        <AddArtist
          onSubmit={handleSubmit}
          triggerContent={<Button><Plus size={18} /> Artist</Button>}
        />
        </div>
      </Header>

      <ArtistList onEdit={handleSubmit} onDelete={handleDelete} />


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
