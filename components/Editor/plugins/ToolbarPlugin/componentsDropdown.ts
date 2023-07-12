import { styled } from '../../../../styles/stitches.config';

export const DropdownContainer = styled('div', {
  zIndex: 5,
  display: 'block',
  position: 'absolute',
  boxShadow:
    '0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
  borderRadius: '8px',
  minWidth: '100px',
  minHeight: '40px',
  backgroundColor: '#fff',
});

export const DropdownItem = styled('button', {
  margin: '0 8px 0 8px',
  padding: '8px',
  color: '#050505',
  cursor: 'pointer',
  lineHeight: '16px',
  fontSize: '15px',
  display: 'flex',
  alignContent: 'center',
  flexDirection: 'row',
  flexShrink: '0',
  justifyContent: 'space-between',
  borderRadius: '8px',
  border: '0',
  minWidth: '268px',

  variants: {
    active: {
      true: {
        backgroundColor: '$primary300',
      },
      false: {
        backgroundColor: '#fff',
      },
    },
    small: {
      true: {
        minWidth: '100px',
        width: 'calc(100% - 16px)',
      },
    },
  },

  '&:first-child': {
    marginTop: '8px',
  },

  '&:last-child': {
    marginBottom: '8px',
  },

  '&:hover': {
    backgroundColor: '$primary200',
  },
});

export const DropdownItemIcon = styled('span', {
  display: 'flex',
  width: '20px',
  height: '20px',
  userSelect: 'none',
  marginRight: '12px',
  lineHeight: '16px',
  backgroundSize: 'contain',
});

export const DropdownItemText = styled('span', {
  display: 'flex',
  lineHeight: '20px',
  flexGrow: '1',
});
