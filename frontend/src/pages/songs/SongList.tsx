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
  }, []);

  if (fetching) return <LoadingPage />;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!songs || songs.length === 0) return <EmptyMessage>No songs found.</EmptyMessage>;

  return (
    <Wrapper>
      <Title>🎵 Song Library</Title>
      <ListContainer>
        {songs?.map((song) => (
          <StyledCard key={song._id}>
            <TopSection>
              <ArtworkPlaceholder>
                {song.genre ? (
                  <img src={song.genre} alt={`${song.title} cover`} />
                ) : (
                  <span>🎶</span>
                )}
              </ArtworkPlaceholder>
              <SongDetails>
                <SongTitle>{song.title}</SongTitle>
                <SongSubInfo>{song.artist?.name} • {song.album}</SongSubInfo>
                <GenreTag>{song.genre || <i>No genre</i>}</GenreTag>
              </SongDetails>
            </TopSection>

            <ActionRow>
              <AddSong
                editingSong={{
                  ...song,
                  artist: song.artist?._id,
                }}
                onSubmit={onEdit}
                iconOnly
              />
              <DeleteDialog
                dialogId={`delete-artist-${song._id}`}
                triggerText=""
                itemName={"Artist"}
                deleteStatus={{
                  deleted: mutuated,
                  error: error,
                  deleting: deleting,
                }}
                onDelete={() => {
                  onDelete(song._id);
                }}
              />
            </ActionRow>
          </StyledCard>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default SongList;

// Styled Components

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 80%;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.cardBackground};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);

  &:hover {
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }
`;

const TopSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const ArtworkPlaceholder = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.mutedBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SongTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme }) => theme.textPrimary};
`;

const SongSubInfo = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.25rem 0;
`;

const GenreTag = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.mutedBackground};
  color: ${({ theme }) => theme.textMuted};
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  width: fit-content;
`;

const ActionRow = styled(ButtonRow)`
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
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
