import { styled } from '@nextui-org/react';
import React, { MutableRefObject, useCallback } from 'react';

const InputFileStyled = styled('input', {
  width: '350px',
  maxWidth: '100%',
  color: '#444',
  padding: '$sm',
  background: '$white700',
  borderRadius: '$md',

  ['&::file-selector-button']: {
    marginRight: '20px',
    border: 'none',
    background: '$primary700',
    padding: '10px 20px',
    borderRadius: '10px',
    color: '$white',
    cursor: 'pointer',
    transition: 'background .2s ease-in-out',
  },

  ['&::file-selector-button:hover']: {
    background: '$primary900',
    color: '$white300',
  },
});

const InputFileDropTitle = styled('span', {
  color: '$text',
  fontSize: '$lg',
  fontWeight: '$bold',
  textAlign: 'center',
  transition: 'color .2s ease-in-out',
});

const InputFileLabel = styled('label', {
  position: 'relative',
  display: 'flex',
  gap: '$sm',
  flexDirection: 'column',
  width: '20rem',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$md',
  color: '$text',
  cursor: 'pointer',
  transition: 'background .2s ease-in-out, border .2s ease-in-out',

  variants: {
    showBorder: {
      true: {
        border: '2px dashed $text',
        background: '$white100',
      },
      false: {
        border: 'none',
        background: 'transparent',
      },
    },
    showTitle: {
      true: {
        padding: '$sm',
      },
      false: {
        padding: '0',
      },
    },
  },

  ['&:hover']: {
    background: '$white400',
    borderColor: '#111',
  },

  [`&:hover ${InputFileDropTitle}`]: {
    borderColor: '#222',
  },
});

interface InputFileProps {
  multiple?: boolean;
  showBorder?: boolean;
  showTitle?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: MutableRefObject<HTMLInputElement | null>;
}

const InputFile: React.FC<InputFileProps> = ({
  multiple = false,
  showBorder = true,
  showTitle = true,
  onChange,
  ref,
}) => {
  return (
    <InputFileLabel showBorder={showBorder} showTitle={showTitle} htmlFor="images">
      {showTitle && (
        <>
          <InputFileDropTitle>Drop file{multiple && 's'} here</InputFileDropTitle>
          or
        </>
      )}
      <InputFileStyled
        ref={ref}
        onChange={onChange}
        type="file"
        id="images"
        accept="image/*"
        required
      />
    </InputFileLabel>
  );
};

export default InputFile;
