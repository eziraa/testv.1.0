import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/store';
import LoadingPage from '../../components/LoadingPage';
import { ErrorMessage } from '../../components/Form';
import { EmptyMessage, MutedElement } from '../songs/SongList';
import { useEffect } from 'react';
import { fetchStats } from '../../features/stats/stat.slice';
import { Disc2, ListMusic, Music2, Users2 } from 'lucide-react';

const DashboardStats = () => {
  const dispatch = useAppDispatch()
  const { stats: data, fetchError, fetching } = useAppSelector(state => state.stats)
  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])
  if (fetching) return <LoadingPage />;
  if (fetchError) return <ErrorMessage>Error: {fetchError}</ErrorMessage>;
  if (!data) return <EmptyMessage>No songs found.</EmptyMessage>;

  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <Content>
            <h3>Songs</h3>
            <p>{data.totalSongs}</p>
          </Content>
          <IconWrapper><Music2 size={40} /></IconWrapper>
        </StatCard>
        <StatCard>
          <Content>
            <h3>Artists</h3>
            <p>{data.totalArtists}</p>
          </Content>
          <IconWrapper><Users2 size={40} /></IconWrapper>
        </StatCard>
        <StatCard>
          <Content>
            <h3>Albums</h3>
            <p>{data.totalAlbums}</p>
          </Content>
          <IconWrapper><Disc2 size={40} /></IconWrapper>
        </StatCard>
        <StatCard>
          <Content>
            <h3>Playlists</h3>
            <p>{data.totalPlaylists}</p>
          </Content>
          <IconWrapper><ListMusic size={40} /></IconWrapper>
        </StatCard>
      </StatsGrid>

      <Section>
        <SectionTitle>Latest Songs</SectionTitle>
        <CardGrid>
          {data.latestSongs.map(song => (
            <MediaCard key={song._id}>
              <Cover src={song.artist?.profilePicture || ""} alt={song.title} />
              <Info>
                <h4>{song.title}</h4>
                <ArtistRow>
                  <Avatar src={song.artist?.profilePicture || ""} />
                  <Column>
                    <span>{song.artist?.name}</span>
                    <MutedElement style={{marginLeft:"0"}}><i>@artist</i></MutedElement>
                  </Column>
                </ArtistRow>
              </Info>
            </MediaCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionTitle>Latest Albums</SectionTitle>
        <CardGrid>
          {data.latestAlbums.map(album => (
            <MediaCard key={album._id}>
              <Cover src={album.coverImage} alt={album.title} />
              <Info>
                <h4>{album.title}</h4>
                <ArtistRow>
                  <Avatar src={album.artist?.profilePicture} />
                  <Column>
                    <span>{album.artist?.name}</span>
                    <MutedElement style={{marginLeft:"0"}}><i>@artist</i></MutedElement>
                  </Column>
                </ArtistRow>
              </Info>
            </MediaCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionTitle>Latest Playlists</SectionTitle>
        <CardGrid>
          {data.latestPlaylists.map(playlist => (
            <MediaCard key={playlist._id}>
              {playlist.coverImage && <Cover src={playlist.coverImage} alt={playlist.name} />}
              <Info>
                <h4>{playlist.name}</h4>
                    By:<MutedElement style={{marginLeft:"0"}}> <i>{playlist.user?.username}</i></MutedElement>
                
              </Info>
            </MediaCard>
          ))}
        </CardGrid>
      </Section>
    </Container>
  );
};
const Section = styled.section`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textPrimary};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const MediaCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`
const Cover = styled.img`
  width: 100%;
  height: 140px;
  object-fit: fill;
`;

const Info = styled.div`
  padding: 1rem;

  h4 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }
`;

const ArtistRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.95rem;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;


const Container = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textPrimary};
`;

const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  justify-content: space-between;
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.accent};
`;

const Content = styled.div`
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.25rem 0 0;
  }
`;


export default DashboardStats;