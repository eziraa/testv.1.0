import React from "react"
import styled from "styled-components"
import DashboardStats from "../stats"

const Container = styled.div`
  padding: 0 1rem 3rem;
  max-width: 1200px;
  margin: auto;
  height: fit-content;
`

const Button = styled.button`
  background: ${({ theme }) => theme.accent};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`

const Hero = styled.section`
  background: linear-gradient(to right, ${({ theme }) => theme.accent}, ${({ theme }) => theme.secondary});
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  border-radius: 16px;
  margin: 2rem 0;
`

const HeroTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
`

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`

const FeatureGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const CardText = styled.p`
  font-size: 0.95rem;
  line-height: 1.4;
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 4rem 0 1rem;
`

const SectionSubtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`

const ServiceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const LandingPage: React.FC = () => {
    return (
        <Container>
            <Hero>
                <HeroTitle>Discover the Rhythm of Melodia</HeroTitle>
                <HeroSubtitle>Stream, curate, and vibe to your favorite songs anytime, anywhere.</HeroSubtitle>
                <Button>Get Started</Button>
            </Hero>
            <DashboardStats/>

            <FeatureGrid>
                <Card>
                    <CardTitle> Personal Playlists</CardTitle>
                    <CardText>Create and customize playlists that match your mood and moments.</CardText>
                </Card>
                <Card>
                    <CardTitle> Explore Artists</CardTitle>
                    <CardText>Discover new talent and follow your favorite artists with ease.</CardText>
                </Card>
                <Card>
                    <CardTitle> Fast & Offline</CardTitle>
                    <CardText>Enjoy lightning-fast streaming and offline playback features.</CardText>
                </Card>
            </FeatureGrid>

            <SectionTitle>Premium Services at Your Fingertips</SectionTitle>
            <SectionSubtitle>Enjoying top-tier services with ease and convenience.</SectionSubtitle>

        </Container>
    )
}

export default LandingPage
