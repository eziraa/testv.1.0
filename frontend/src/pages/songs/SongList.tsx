import React, { useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, OutlineButton, OutlineDeleteButton } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { favoriteSong, fetchSongs, fetchSongSuccess } from '../../features/songs/song.slice';
import LoadingPage from '../../components/LoadingPage';
import AddSong from './AddSong';
import DeleteDialog from '../../components/DeleteDialog';
import { Dot, Heart, Pencil, Play, Trash2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  onEdit: (song: FormData, id?: string) => void;
  onDelete: (id: string) => void;
}

const SongList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const [searchParams] = useSearchParams();
  const theme = useTheme()
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user)
  const { songs, song: currentSong, fetchError, mutuated, deleting, fetching, error } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchSongs(searchParams.toString()));
  }, [searchParams]);

  if (fetching) return <LoadingPage />;
  if (fetchError) return <ErrorMessage>Error: {fetchError}</ErrorMessage>;
  if (!songs || songs.length === 0) return <EmptyMessage>No songs found.</EmptyMessage>;

  return (
    <Wrapper>
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
                <SongSubInfo>{song.artist?.name} <Dot style={{
                  color: theme.accent
                }} /> {song.album}</SongSubInfo>
                <MutedElement>{song.genre || <i>No genre</i>}</MutedElement>
              </SongDetails>
            </TopSection>

            <ActionRow>

              {
                currentSong?._id !== song._id && (
                  <OutlineButton
                    onClick={() => {
                      dispatch(fetchSongSuccess(song))
                    }}
                  >
                    {currentSong?._id !== song._id && <Play size={16} />}
                  </OutlineButton>
                )
              }
              {
               !!user && <OutlineDeleteButton
                  onClick={() => {
                    dispatch(favoriteSong(song._id))
                  }}
                >
                  {
                    <FavoriteIcon size={16} $favorited={user.favorites.some(favoriteSong => favoriteSong._id === song._id)} />
                  }
                </OutlineDeleteButton>
              }
              <AddSong
                editingSong={{
                  ...song,
                  artist: song.artist?._id,
                }}
                onSubmit={onEdit}
                triggerContent={
                  <OutlineButton>
                    <Pencil size={16} />
                  </OutlineButton>
                }
              />
              <DeleteDialog
                dialogId={`delete-artist-${song._id}`}
                triggerContent={
                  <OutlineDeleteButton>
                    <Trash2 size={16} />
                  </OutlineDeleteButton>
                }
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

export const MutedElement = styled.span`
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.mutedBackground};
  color: ${({ theme }) => theme.textMuted};
  border-radius: 0.5rem;
  width: fit-content;
  margin: auto 0.2rem;
  margin-top: 0.25rem;

  &:hover{
    background-color: ${({ theme }) => theme.accent};
    color: white;
    cursor: pointer;
    transition: all 0.3s;
  }
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

export const EmptyMessage = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  font-size: 1.1rem;
  margin-top: 2rem;
`;

interface FavoriteProps {
  $favorited: boolean;
}

export const FavoriteIcon = styled(Heart) <FavoriteProps>`
  cursor: pointer;
  transition: all 0.2s ease;
  stroke: ${({ $favorited, theme }) => ($favorited ? theme.cardBackground : '#e23737')};
  fill: ${({ $favorited, theme }) => ($favorited ? '#e23737' : theme.cardBackground)};
  padding: 0;
  &:hover {
    transform: scale(1.04);
    stroke: ${({ $favorited, theme }) => (!$favorited ? theme.cardBackground : '#e23737')};
    fill: ${({ $favorited, theme }) => (!$favorited ? '#e23737' : theme.cardBackground)};
  }
`;