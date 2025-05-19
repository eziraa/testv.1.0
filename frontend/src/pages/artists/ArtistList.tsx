import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card';
import { ButtonRow, OutlineButton, OutlineDeleteButton } from '../../components/Button';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchArtists } from '../../features/artists/artist.slice';
import LoadingPage from '../../components/LoadingPage';
import AddArtist from './AddArtist';
import DeleteDialog from '../../components/DeleteDialog';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  onEdit: (artist: FormData, id?: string) => void;
  onDelete: (id: string) => void;
}

const ArtistList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const dispatch = useAppDispatch();
  const { artists, fetching, deleting, mutuated, error } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (fetching) return <LoadingPage />;
  if (error) return <MessageContainer>Error: {error}</MessageContainer>;
  if (!artists || artists.length === 0) return <MessageContainer>No artists found</MessageContainer>;

  return (
    <ListContainer>
      {artists.map((artist) => (
        <StyledCard key={artist._id}>
          <CardBody>

            <InfoBlock>
              <ArtistName>{artist.name}</ArtistName>
              <Bio>{artist.bio?.toLowerCase() || 'No bio provided.'}</Bio>
            </InfoBlock>
            <ProfileWrapper>
              <ProfileImage
                src={artist.profilePicture || '/artist.png'}
                alt={artist.name}
                onError={(e) => (e.currentTarget.src = '/artist.png')}
              />
            </ProfileWrapper>
          </CardBody>
          <StyledButtonRow>
            <AddArtist
              editingArtist={artist}
              onSubmit={onEdit}
              triggerContent={<OutlineButton><Pencil size={16} /></OutlineButton>}
            />
            <DeleteDialog
              triggerContent={<OutlineDeleteButton><Trash2 size={18} /></OutlineDeleteButton>}
              dialogId={`delete-artist-${artist._id}`}
              itemName="Artist"
              deleteStatus={{ deleted: mutuated, error, deleting }}
              onDelete={() => onDelete(artist._id)}
            />
          </StyledButtonRow>
        </StyledCard>
      ))}
    </ListContainer>
  );
};

export default ArtistList;
const ListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const StyledCard = styled(Card)`
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${({ theme }) => theme.cardBg || '#fff'};
  transition: transform 0.2s ease-in-out;

`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const ProfileWrapper = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.border || '#ddd'};
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: .5rem;
`;

const ArtistName = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary || '#1f2937'};
  margin:0 0.5rem ;
`;

const Bio = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textMuted || '#6b7280'};
  background-color: ${({ theme }) => theme.mutedHighlight};
  padding: 0.3rem 1rem;  
  border-radius: 1rem;
  font-style: italic;
  margin: 0.5rem;
`;

const StyledButtonRow = styled(ButtonRow)`
  margin-top: auto;
  gap: 0.5rem;
  width: 100%;
  justify-content: start;
`;

const MessageContainer = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted || '#6b7280'};
  margin-top: 3rem;
`;
