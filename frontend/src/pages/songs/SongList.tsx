import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow } from '../../components/Button';
import type { SongPayload } from '../../features/songs/song.types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchSongs } from '../../features/songs/song.slice';
import LoadingPage from '../../components/LoadingPage';
import AddSong from './AddSong';
import DeleteDialog from '../../components/DeleteDialog';

interface Props {
  onEdit: (song: SongPayload, id?: string) => void;
  onDelete: (id: string) => void;
}

const SongList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const dispatch = useAppDispatch();
  const { songs, mutuated, deleting, fetching, error } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (fetching) return <LoadingPage />;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!songs || songs.length === 0) return <EmptyMessage>No songs found.</EmptyMessage>;

  return (
    <Wrapper>
      <ListContainer>
        {songs?.map((song) => (
          <StyledCard key={song._id}>
            <SongInfo>
              <h3> <strong> <i>Title</i> </strong> {song.title}</h3>
              <p><strong>Artist:</strong> {song.artist?.name}</p>
              <p><strong>Album:</strong> {song.album}</p>
              <p><strong>Genre:</strong> {song.genre}</p>
            </SongInfo>
            <ButtonRow>
              <AddSong
                editingSong={{
                  ...song,
                  artist: song.artist?._id,
                }}
                onSubmit={onEdit}
              />
              <DeleteDialog
                  dialogId={`delete-artist-${song._id}`}
                  triggerText="Delete"
                  itemName={"Artist"}
                  deleteStatus={{
                    deleted: mutuated,
                    error: error,
                    deleting: deleting
                  }}
                  onDelete={() => {
                    onDelete(song._id);
                  }}
                />
            </ButtonRow>
          </StyledCard>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default SongList;

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
`;

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SongInfo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.textPrimary};
  }

  p {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.textSecondary};
  }

  strong {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.errorColor};
  text-align: center;
  margin-top: 2rem;
`;

const EmptyMessage = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
`;
