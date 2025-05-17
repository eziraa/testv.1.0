import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, DeleteButton } from '../../components/Button';
import type {  SongPayload } from '../../features/songs/song.types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchSongs } from '../../features/songs/song.slice';
import LoadingPage from '../../components/LoadingPage';
import AddSong from './AddSong';

interface Props {
  onEdit: (song: SongPayload, id?: string) => void;
  onDelete: (id: string) => void;
}

const SongList: React.FC<Props> = ({ onEdit, onDelete }) => {

  const dispatch = useAppDispatch();
  const { songs, fetching, error } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])

  if (fetching) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!songs || songs.length === 0) {
    return <div>No songs found</div>;
  }
  return <ListContainer>
    {songs.map((song) => (
      <Card key={song._id}>
        <h3>{song.title}</h3>
        <p>Artist: {song.artist}</p>
        <p>Album: {song.album}</p>
        <p>Genre: {song.genre}</p>
        <ButtonRow>
          <AddSong
            editingSong={song}
            onSubmit={onEdit}
          />
          <DeleteButton onClick={() => onDelete(song._id)}>Delete</DeleteButton>
        </ButtonRow>
      </Card>
    ))}
  </ListContainer>

}
export default SongList;

const ListContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
