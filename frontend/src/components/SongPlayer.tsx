import { Pause, Play } from "lucide-react";
import  { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/store";

const MiniPlayer = () => {
  const {song} = useAppSelector(state => state.songs)
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(()=>{
    audioRef.current?.pause()
    setIsPlaying(false);
    setProgress(0)
  }, [song])
  if(!song )return ;
  
  return (
    <PlayerContainer>
      <audio ref={audioRef} src={song.audioUrl} />
      <Info>
        <Title>{song.title}</Title>
        <Artist>{song.artist?.name}</Artist>
      </Info>
      <Controls>
        <Button onClick={togglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      </Controls>
      <ProgressBar>
        <Progress style={{ width: `${progress}%` }} />
      </ProgressBar>
    </PlayerContainer>
  );
};

export default MiniPlayer;


const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textPrimary};
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primaryButtonHoverBg || theme.primary};
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: ${({ theme }) => theme.border};
`;

const Progress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.primary};
  transition: width 0.2s ease;
`;
