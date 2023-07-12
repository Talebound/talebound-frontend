import * as DialogRadix from '@radix-ui/react-dialog';
import { styled } from '../../styles/stitches.config';

export const ModalClose = styled(DialogRadix.Close, {
  position: 'absolute',
  top: 10,
  right: 10,
  cursor: 'pointer',
  borderRadius: '50%',
  color: '$primary',
  padding: '$xs',

  '&:hover': {
    backgroundColor: '$primary200',
  },
});
