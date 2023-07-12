import * as React from 'react';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { styled } from '../../../styles/stitches.config';

const ModalTitle = styled('h2', {
  color: '$primary900',
  margin: 0,
  paddingBottom: '$4',
  borderBottom: '1px solid $white900',
});

const ModalCloseButton = styled('button', {
  border: '0px',
  position: 'absolute',
  right: '$4',
  borderRadius: '$md',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  width: '$6',
  height: '$6',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '$white700',

  '&:hover': {
    backgroundColor: '$white900',
  },
});

const ModalContent = styled('div', {
  paddingTop: '$4',
});

const ModalOverlay = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  flexDirection: 'column',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(40, 40, 40, 0.6)',
  flexGrow: 0,
  flexShrink: 1,
  zIndex: 100,
});

const ModalModal = styled('div', {
  padding: '$4',
  minHeight: '100px',
  minWidth: '300px',
  display: 'flex',
  flexGrow: 0,
  backgroundColor: '$white700',
  flexDirection: 'column',
  position: 'relative',
  boxShadow: '$md',
  borderRadius: '$md',
});

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}: {
  children: ReactNode;
  closeOnClickOutside: boolean;
  onClose: () => void;
  title: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return (
    <ModalOverlay role="dialog">
      <ModalModal tabIndex={-1} ref={modalRef}>
        <ModalTitle className="Modal__title">{title}</ModalTitle>
        <ModalCloseButton
          className="Modal__closeButton"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          X
        </ModalCloseButton>
        <ModalContent>{children}</ModalContent>
      </ModalModal>
    </ModalOverlay>
  );
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}: {
  children: ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
  title: string;
}): JSX.Element {
  return createPortal(
    <PortalImpl onClose={onClose} title={title} closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  );
}
