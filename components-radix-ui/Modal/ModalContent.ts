import * as DialogRadix from '@radix-ui/react-dialog';
import { keyframes, styled } from '../../styles/stitches.config';
import Stitches from '@stitches/react';

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const ModalContent = styled(DialogRadix.Content, {
  backgroundColor: '$white',
  borderRadius: 6,
  boxShadow: '$lg',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  minWidth: '450px',
  minHeight: '200px',
  maxHeight: '85vh',
  padding: 25,
  zIndex: 10,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },

  variants: {
    size: {
      full: {
        width: '90vw',
        minWidth: '450px',
      },
      xs: {
        width: '20vw',
        minWidth: '200px',
      },
      sm: {
        width: '30vw',
        minWidth: '300px',
      },
      md: {
        width: '40vw',
        minWidth: '450px',
      },
      lg: {
        width: '50vw',
        minWidth: '450px',
      },
      xl: {
        width: '60vw',
        minWidth: '450px',
      },
    },
  },

  defaultVariants: {
    size: 'full',
  },
});

export type ModalSizeVariants = Stitches.VariantProps<typeof ModalContent>;
