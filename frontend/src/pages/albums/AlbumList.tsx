import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, OutlineButton, OutlineDeleteButton } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchAlbums } from '../../features/albums/album.slice';
import LoadingPage from '../../components/LoadingPage';
import AddAlbum from './AddAlbum';
import DeleteDialog from '../../components/DeleteDialog';
import { Pencil, Trash2 } from 'lucide-react';
import { calculateAgo, formattedDate } from '../../utils/date';
import { MutedElement } from '../songs/SongList';

interface Props {
  onEdit: (album: FormData, id?: string) => void;
  onDelete: (id: string) => void;
}

const AlbumList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const dispatch = useAppDispatch();
  const { albums, fetching, error,fetchError, mutuated, deleting } = useAppSelector(
    (state) => state.albums
  );

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  if (fetching) return <LoadingPage />;

  if (fetchError)
    return <MessageContainer>Error: {fetchError}</MessageContainer>;

  if (!albums || albums.length === 0)
    return <MessageContainer>No albums found</MessageContainer>;

  return (
    <Wrapper>
      <ListContainer>
        {albums.map((album) => (
          <StyledCard key={album._id}>
            <DateCreated>
              {calculateAgo(album.createdAt)}
            </DateCreated>
            <InfoBlock>
              <Title>{album.title}</Title>
              <Detail><strong>Artist:</strong> {album.artist?.name}</Detail>
              <Detail><strong>Genre:</strong> <MutedElement> {album.genre || "No genre"}</MutedElement> </Detail>
              <Detail><strong>Release Date:</strong> {formattedDate(album.releaseDate)}</Detail>
              <Detail><strong>Songs:</strong> {!!album.songs?.length ? album.songs?.map(song=> <MutedElement>{song.title}</MutedElement>) : <MutedElement><i>No songs yet</i></MutedElement>} </Detail>
              {album.coverImage && (
                <CoverImage src={album.coverImage} alt={album.title} />
              )}
            </InfoBlock>
            <ButtonRow>
              <AddAlbum editingAlbum={{
                ...album,
                songs: album.songs?.map(song=> song._id) || [],
                artist: album.artist?._id || "",
              }} 
              onSubmit={onEdit}
              triggerContent={<OutlineButton><Pencil size={16}/></OutlineButton>}
               />
              <DeleteDialog
                triggerContent={<OutlineDeleteButton><Trash2 size={18}/></OutlineDeleteButton>}
                dialogId={`delete-album-${album._id}`}
                itemName="Album"
                deleteStatus={{
                  deleted: mutuated,
                  error: error,
                  deleting: deleting
                }}
                onDelete={() => onDelete(album._id)}
              />
            </ButtonRow>
          </StyledCard>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default AlbumList;

const Wrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 100%;
  margin: 0 auto;
  width: 90%;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    max-width: 100%;
    padding: 0;
  }

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
  max-width: 450px;
  position: relative;
  @media (max-width: 1200px) {
    max-width: 350px;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 0.5rem;
    align-self: self-start;
  }

  @media (max-width: 768px) {
    max-width: 300px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;

export const DateCreated = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: ${({theme})=>theme.mutedTextSecondary};
  font-size: smaller;
`
const InfoBlock = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textPrimary || '#111827'};
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: ${({theme}) => theme.mutedButtonBackground};
  padding: 0.5rem;
  margin-top: 3px;
  border-radius: 0.4rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

const Detail = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary || '#4b5563'};
  margin: 0.25rem 0;
`;

const CoverImage = styled.img`
  width: 100%;
  max-height: 140px;
  object-fit:fill;
  margin-top: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border || '#ddd'};
`;

const MessageContainer = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted || '#6b7280'};
  margin-top: 3rem;
`;
