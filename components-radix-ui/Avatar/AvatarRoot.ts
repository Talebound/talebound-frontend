import { styled } from '../../styles/stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { blackA } from '@radix-ui/colors';

export const AvatarRoot = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  borderRadius: '100%',
  border: '1px solid $primary500',
  backgroundColor: blackA.blackA3,

  variants: {
    size: {
      xs: {
        width: 16,
        height: 16,
      },
      sm: {
        width: 24,
        height: 24,
      },
      md: {
        width: 36,
        height: 36,
      },
      lg: {
        width: 48,
        height: 48,
      },
      xl: {
        width: 100,
        height: 100,
      },
      '2xl': {
        width: 200,
        height: 200,
      },
    },
  },
});
