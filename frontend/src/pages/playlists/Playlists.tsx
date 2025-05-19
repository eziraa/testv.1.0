import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, OutlineButton, OutlineDeleteButton } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchPlaylists } from '../../features/playlists/playlist.slice';
import LoadingPage from '../../components/LoadingPage';
import AddPlaylist from './AddPlaylist';
import DeleteDialog from '../../components/DeleteDialog';
import { Pencil, Trash2 } from 'lucide-react';
import { DateCreated } from '../albums/AlbumList';
import { calculateAgo } from '../../utils/date';
import { MutedElement } from '../songs/SongList';

interface Props {
  onEdit: (playlist: FormData, id?: string) => void;
  onDelete: (id: string) => void;
}

const PlaylistList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const dispatch = useAppDispatch();
  const { playlists, fetching, error, fetchError, mutuated, deleting } = useAppSelector((state) => state.playlists);

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  if (fetching) return <LoadingPage />;
  if (fetchError) return <MessageContainer>Fetch Error: {fetchError}</MessageContainer>;
  if (!playlists || playlists.length === 0) return <MessageContainer>No playlists found</MessageContainer>;

  return (
    <Wrapper>
      <ListContainer>
        {playlists.map((playlist) => {
          const maxVisibleSongs = 3;
          const visibleSongs = playlist.songs.slice(0, maxVisibleSongs);
          const remainingSongs = playlist.songs.length - maxVisibleSongs;

          return (
            <StyledCard key={playlist._id}>
              <DateCreated >
                {calculateAgo(playlist.createdAt)}
              </DateCreated>
              <CoverImage
                src={playlist.coverImage || '/playlist.png'}
                alt={playlist.name}
                onError={(e) => (e.currentTarget.src = '/playlist.png')}
              />

              <InfoBlock>
                <Title>{playlist.name}</Title>
                
                <SongList>
                  <SubTitle>Songs</SubTitle>
                  {visibleSongs.map((song) => (
                    <MutedElement key={song._id}>{song.title}</MutedElement>
                  ))}
                  {remainingSongs > 0 && (
                    <SeeMoreBtn>+{remainingSongs} more</SeeMoreBtn>
                  )}
                </SongList>
                <SongsLength>
                    {!!playlist.songs.length ? `${playlist.songs.length} song${playlist.songs.length > 1 ? 's' : ""}`: "No songs"}
                </SongsLength>
              </InfoBlock>

              <StyledButtonRow>
                <AddPlaylist
                  editingPlaylist={{
                    ...playlist,
                    songs: playlist.songs.map((song) => song._id),
                    user: playlist.user._id,
                  }}
                  onSubmit={onEdit}
                  triggerContent={<OutlineButton><Pencil size={18} /></OutlineButton>}
                />
                <DeleteDialog
                  dialogId={`delete-playlist-${playlist._id}`}
                  triggerContent={<OutlineDeleteButton><Trash2 size={16} /></OutlineDeleteButton>}
                  itemName="Playlist"
                  deleteStatus={{ deleted: mutuated, error, deleting }}
                  onDelete={() => onDelete(playlist._id)}
                />
              </StyledButtonRow>
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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ListContainer = styled.div`
  display: grid;
  gap: 2rem;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.cardBg || '#fff'};
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  position: relative;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  background-color: #f3f4f6;
  margin-top: 0.7rem;
`;

const InfoBlock = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const SubTitle = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  margin-right: 0.4rem;
  display: inline;
`;

const SongList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: inline;
`;

const SongItem = styled.li`
  font-size: 0.95rem;
  padding: 0.25rem 0;
  color: ${({ theme }) => theme.textPrimary};
`;

const SeeMoreBtn = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  text-decoration: underline;
`;

const SongsLength = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mutedTextPrimary};
  margin-top: 1rem;
`;

const StyledButtonRow = styled(ButtonRow)`
  margin-top: 1.25rem;
  gap: 0.5rem;
`;

const MessageContainer = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted || '#6b7280'};
  margin-top: 3rem;
`;
