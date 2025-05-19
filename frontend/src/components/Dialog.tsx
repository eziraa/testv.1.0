import React, { type ReactNode, use, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDialog } from '../contexts/dialog.context';

interface DialogProps {
  triggerContent: ReactNode;
  children: ReactNode;
  dialogId: string;
}

const Dialog: React.FC<DialogProps> = ({ triggerContent,dialogId, children }) => {

  const { openDialog, openedDialogs, closeDialog } = useDialog()
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setIsOpen(openedDialogs.includes(dialogId));
  }, [openedDialogs]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    else {
      document.body.style.overflow = ""
    }

    return (() => {
      document.body.style.overflow = ""

    })

  }, [isOpen])

  return (
    <>
      <TriggerWrapper onClick={() => openDialog(dialogId)}>
        {triggerContent}
        {/* {
          isDanger
            ?
            outLined
            ?
            (
              <OutlineDeleteButton onClick={() => openDialog(dialogId)}>{icon} {triggerText}</OutlineDeleteButton>
            )
            :
            (
              <DeleteButton onClick={() => openDialog(dialogId)}>{icon} {triggerText}</DeleteButton>
            )
            :
            outLined
            ?
            (
              <OutlineButton onClick={() => openDialog(dialogId)}>{icon} {triggerText}</OutlineButton>
            )
            :
            (
              <Button onClick={() => openDialog(dialogId)}>{icon} {triggerText}</Button>
            )
        } */}
      </TriggerWrapper>
      {isOpen && (
        <>
          <Overlay
            onClick={() => {
              closeDialog(dialogId);
            }
            } >
            <Content onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
              {children}
              <CloseButton style={dialogId.includes('delete') ? { color: "red" } : {}} onClick={() => closeDialog(dialogId)} aria-label="Close modal">&times;</CloseButton>
            </Content>
          </Overlay>
        </>
      )}
    </>
  );
};

export default Dialog;

// Styled Components

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  animation: ${fadeIn} 0.25s ease forwards;
  background-color: ${() => "rgba(0, 0, 0, 0.2)"};
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
`;

const Content = styled.div`
  background: ${({ theme }) => theme.dialogBackground || 'white'};
  border-radius: 12px;
  width: 90vw;
  max-width: fit-content;
  position: relative;
  box-shadow: ${({ theme }) => theme.dialogBoxShadow || '0 10px 30px rgba(0, 0, 0, 0.1)'};
  animation: ${slideIn} 0.25s ease forwards;
  box-sizing: border-box;
  position: relative;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.dialogBoxShadowHover || '0 14px 30px rgba(0, 0, 0, 0.12)'};
  }
`;

const TriggerWrapper = styled.button`
  display: inline-block;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
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
  top: 0.7rem;
  right: 1rem;
  position: absolute;
  z-index: 1001;
  background: transparent;
  border: none;
  @media (max-width: 768px) {
    display: block !important;
  }
`;


export { Dialog, TriggerWrapper, Overlay, Content, CloseButton };