import React, { useEffect } from 'react';
import Dialog from './Dialog';
import {  CancelButton, DeleteButton } from './Button';
import styled from 'styled-components';
import { useDialog } from '../contexts/dialog.context';

interface DeleteDialogProps {
  dialogId: string;
  triggerContent: React.ReactNode;
  itemName: string;
  onDelete: () => void;
  deleteStatus?: { deleted: boolean, deleting: boolean, error: string | null };
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  dialogId,
  triggerContent,
  itemName,
  onDelete,
  deleteStatus,
}) => {

  const { closeDialog } = useDialog()
  const { deleting } = deleteStatus || {};

  useEffect(() => {
    if (!deleting) return;
    if (deleteStatus?.deleted) {
      closeDialog(dialogId);
    }
    if (deleteStatus?.error) {
    }
  }, [deleteStatus]);

  return (
    <Dialog   dialogId={dialogId}  triggerContent={triggerContent}>
      <Container>
        <Header>Delete {itemName}?</Header>
        <Message>
          This action cannot be undone. Are you sure you want to permanently delete{' '}
          <strong>{itemName}</strong>?
        </Message>
        <ButtonRow>
          <CancelButton disabled={deleting} onClick={() => closeDialog(dialogId)}>
            Cancel
          </CancelButton>
          <DeleteButton
            disabled={deleting}
            onClick={onDelete}
            style={{
              padding: '0.6rem 1rem',
              fontSize: '0.875rem',
              borderRadius: '8px',
              cursor: deleting ? 'not-allowed' : 'pointer'
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </DeleteButton>
        </ButtonRow>
      </Container>
    </Dialog>
  );
};

export default DeleteDialog;

// Styled Components
const Container = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.dialogBoxShadow || '0 10px 30px rgba(0, 0, 0, 0.1)'};
  max-width: 350px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0rem;
`;

const Header = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textDanger || '#d32f2f'};
  margin-bottom: 0rem;
`;

const Message = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary || '#333'};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
`;


