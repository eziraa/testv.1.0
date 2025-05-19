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
  justify-content: end;
  gap: 0.7rem;
  align-items: center;
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
  padding: 0.6rem 1rem;
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

const OutlineButton = styled(ButtonRoot)`
  background-color: transparent;
  color: ${({ theme }) => theme.buttonPrimaryBackground || '#0070f3'};
  border: 1px solid ${({ theme }) => theme.buttonPrimaryBackground || '#0070f3'};
  padding: 0.3rem 0.7rem; 
  font-size: 0.875rem;
  &:hover {
    background-color: ${({ theme }) => theme.buttonPrimaryHoverBackground || '#005bb5'};
    color: white;
  }
`;

const OutlineDeleteButton = styled(OutlineButton)`
  background-color: transparent;
  padding: 0.3rem 0.7rem; 
  color: ${({ theme }) => theme.buttonDeleteBackground || '#ff4d4f'};
  border: 1px solid ${({ theme }) => theme.buttonDeleteBackground || '#ff4d4f'};
  &:hover {
    background-color: ${({ theme }) => theme.buttonDeleteHoverBackground || '#d9363e'};
    color: white;
  }
`;


const CloseButton = styled.button`
  color: ${({ theme }) => theme.dialogCloseColor || '#007bffcc'};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.dialogCloseHoverColor || '#007bff'};
    background-color: ${({ theme }) => theme.background};
  }

  font-size: 1.2rem;
  z-index: 1001;
  background: transparent;
  border: none;
  display: none;
  @media (max-width: 768px) {
    top: 0.7rem;
    right: 1rem;
    position: absolute;
    display: block !important;
  }
`;


 const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.cancelButtonBackground || '#f3f3f3'};
  color: ${({ theme }) => theme.cancelButtonText || '#333'};
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  &:hover {
    background-color: ${({ theme }) => theme.cancelButtonHover || '#e0e0e0'};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.45rem;
  }
`;


export { Button,OutlineButton,  DeleteButton, OutlineDeleteButton,CancelButton, CloseButton, ButtonRow };
