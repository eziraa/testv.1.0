import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow } from '../../components/Button';
import type { PlaylistPayload } from '../../features/playlists/playlist.types';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchPlaylists } from '../../features/playlists/playlist.slice';
import LoadingPage from '../../components/LoadingPage';
import AddPlaylist from './AddPlaylist';
import DeleteDialog from '../../components/DeleteDialog';

interface Props {
  onEdit: (playlist: PlaylistPayload, id?: string) => void;
  onDelete: (id: string) => void;
}

const PlaylistList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const dispatch = useAppDispatch();
  const { playlists, fetching, error, mutuated, deleting } = useAppSelector((state) => state.playlists);

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  if (fetching) return <LoadingPage />;

  if (error) return <MessageContainer>Error: {error}</MessageContainer>;

  if (!playlists || playlists.length === 0)
    return <MessageContainer>No playlists found</MessageContainer>;

  return (
    <Wrapper>
      <ListContainer>
        {playlists.map((playlist) => {
          const maxVisibleSongs = 3;
          const visibleSongs = playlist.songs.slice(0, maxVisibleSongs);
          const remainingSongs = playlist.songs.length - maxVisibleSongs;

          return (
            <StyledCard key={playlist._id}>
              <InfoBlock>
                <Title>{playlist.name}</Title>
                <SubTitle>Songs</SubTitle>
                <SongList>
                  {visibleSongs.map((song) => (
                    <SongItem key={song._id}>{song.title}</SongItem>
                  ))}
                  {remainingSongs > 0 && (
                    <SeeMoreBtn>+{remainingSongs} more</SeeMoreBtn>
                  )}
                </SongList>
                <CreatedDate>
                  Created: {new Date(playlist.createdAt).toLocaleDateString()}
                </CreatedDate>
              </InfoBlock>

              <ButtonRow>
                <AddPlaylist
                  editingPlaylist={{
                    ...playlist,
                    songs: playlist.songs.map((song) => song._id) || [],
                    user: playlist.user._id || '',
                  }}
                  onSubmit={onEdit}
                />
                <DeleteDialog
                  dialogId={`delete-playlist-${playlist._id}`}
                  triggerText="Delete"
                  itemName="Playlist"
                  deleteStatus={{ deleted: mutuated, error: error, deleting: deleting }}
                  onDelete={() => onDelete(playlist._id)}
                />
              </ButtonRow>
            </StyledCard>
          );
        })}
      </ListContainer>
    </Wrapper>
  );
};

export default PlaylistList;

const Wrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 100%;
  margin: 0 auto;
  width: 90%;
`;

const ListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.cardBg || '#fff'};
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoBlock = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SongItem = styled.li`
  padding: 0.3rem 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const SeeMoreBtn = styled.button`
  margin-top: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
`;

const CreatedDate = styled.div`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedTextPrimary};
`;

const MessageContainer = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted || '#6b7280'};
  margin-top: 3rem;
`;
