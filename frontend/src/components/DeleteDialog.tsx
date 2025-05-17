import React, { useEffect } from 'react';
import Dialog from './Dialog';
import { Button, DeleteButton } from './Button';
import styled from 'styled-components';
import { useDialog } from '../contexts/dialog.context';
import { Trash } from 'lucide-react';

interface DeleteDialogProps {
  dialogId: string;
  triggerText: string;
  itemName: string;
  onDelete: () => void;
  deleteStatus?: { deleted: boolean, deleting: boolean, error: string | null };
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  dialogId,
  triggerText,
  itemName,
  onDelete,
  deleteStatus
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
    <Dialog dialogId={dialogId} icon={<Trash size={20} />} isDanger triggerText={triggerText}>
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
  background-color: ${({ theme }) => theme.formBackground};
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
