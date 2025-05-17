import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

interface Props {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<Props> = ({ isDark, toggle }) => {
  return (
    <ToggleButton onClick={toggle} aria-label="Toggle theme">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </ToggleButton>
  );
};

export default ThemeToggle;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
    background: ${({ theme }) => theme.cardBackground};
  }
`;
