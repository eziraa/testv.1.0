// src/components/Dialog.tsx
import React, { useState, type ReactNode, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface DialogProps {
  trigger: ReactNode;
  children: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ trigger, children, onOpenChange }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onOpenChange?.(open);
    if (open) {
      document.body.style.overflow = 'hidden'; // disable scroll
    } else {
      document.body.style.overflow = ''; // restore scroll
    }
    return () => {
      document.body.style.overflow = ''; // cleanup
    };
  }, [open, onOpenChange]);

  const close = () => setOpen(false);

  return (
    <>
      <TriggerWrapper onClick={() => setOpen(true)}>{trigger}</TriggerWrapper>
      {open && (
        <>
          <Overlay onClick={close} >
            <Content onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
              {children}
              <CloseButton onClick={close} aria-label="Close modal">&times;</CloseButton>
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
  background: ${({ theme }) => theme.overlayBackground || 'rgba(0, 0, 0, 0.5)'};
  animation: ${fadeIn} 0.25s ease forwards;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const Content = styled.div`
  background: ${({ theme }) => theme.dialogBackground || 'white'};
  border-radius: 12px;
  width: 90vw;
  max-width: 550px;
  position: relative;
  box-shadow: ${({ theme }) => theme.dialogBoxShadow || '0 10px 30px rgba(0, 0, 0, 0.2)'};
  animation: ${slideIn} 0.25s ease forwards;
  box-sizing: border-box;
  position: relative;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.dialogBoxShadowHover || '0 14px 30px rgba(0, 0, 0, 0.2)'};
  }
`;

const TriggerWrapper = styled.span`
  display: inline-block;
  cursor: pointer;
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