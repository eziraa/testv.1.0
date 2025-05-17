import styled from 'styled-components';
import { color, space, layout } from 'styled-system';

export const ButtonRoot = styled.button`
  ${color}
  ${space}
  ${layout}
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 1.5px solid ${({ theme }) => theme.focusOutline || '#0070f3'};
    outline-offset: 2px;
  }

  &:disabled{
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled(ButtonRoot)`
  background-color: ${({ theme }) => theme.buttonPrimaryBackground || '#0070f3'};
  color: ${({ theme }) => theme.buttonPrimaryColor || 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.4rem;
  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHoverBackground || '#005bb5'};
  }

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.3rem;
    padding: 0.45rem;
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.buttonDeleteBackground || '#ff4d4f'};

  &:hover {
    background-color: ${({ theme }) => theme.buttonDeleteHoverBackground || '#d9363e'};
  }
`;

export { Button, DeleteButton, ButtonRow };
