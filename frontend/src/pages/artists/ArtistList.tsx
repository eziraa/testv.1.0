import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, OutlineButton, OutlineDeleteButton } from '../../components/Button';
import type { ArtistPayload } from '../../features/artists/artist.types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchArtists } from '../../features/artists/artist.slice';
import LoadingPage from '../../components/LoadingPage';
import AddArtist from './AddArtist';
import DeleteDialog from '../../components/DeleteDialog';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  onEdit: (artist: ArtistPayload, id?: string) => void;
  onDelete: (id: string) => void;
}

const ArtistList: React.FC<Props> = ({ onEdit, onDelete }) => {

  const dispatch = useAppDispatch();
  const { artists, fetching, deleting, mutuated, error } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists())
  }, [])

  if (fetching) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!artists || artists.length === 0) {
    return <div>No artists found</div>;
  }
  return <ListContainer>
    {
      error
        ?
        (
          <div>Error: {error}</div>
        )
        :
        !artists || artists.length === 0
          ?
          (
            <div className="flex">
              No artists found
            </div>
          )
          :
          artists.map((artist) => (
            <Card key={artist._id}>
              <h3>{artist.name}</h3>
              <p>Artist Name: {artist.name}</p>
              <p>Bio: {artist.bio}</p>
              <p>Profile Picture: {artist.profilePicture}</p>
              <ButtonRow style={{ gap: "0.5rem" }}>
                <AddArtist
                  editingArtist={artist}
                  onSubmit={onEdit}
                  triggerContent={<OutlineButton><Pencil size={16} /></OutlineButton>}
                />
                <DeleteDialog
                  triggerContent={<OutlineDeleteButton><Trash2 size={18} /></OutlineDeleteButton>}

                  dialogId={`delete-artist-${artist._id}`}
                  itemName={"Artist"}
                  deleteStatus={{
                    deleted: mutuated,
                    error: error,
                    deleting: deleting
                  }}
                  onDelete={() => {
                    onDelete(artist._id);
                  }}
                />
              </ButtonRow>
            </Card>
          ))}
  </ListContainer>

}
export default ArtistList;

const ListContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
