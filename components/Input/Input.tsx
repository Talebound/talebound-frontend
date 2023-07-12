import { styled } from '../../styles/stitches.config';
import React, { useMemo } from 'react';
import Stitches from '@stitches/react';
import { Col, Flex } from '../Flex/Flex';
import { Label } from '../Typography/Label';
import { Text } from '../Typography/Text';

export const StyledInput = styled('input', {
  fontFamily: '$heading',
  padding: '$4',
  borderRadius: '$md',
  cursor: 'pointer',
  fontSize: '$md',
  transition: 'all 0.2s ease-in-out',
  color: '$primary900',
  border: '1px solid transparent',

  '&:focus': {
    outline: 'none',
    boxShadow: '$md',
  },

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },

    mode: {
      transparent: {
        background: '$transparent40',
        '&:hover': { backgroundColor: '$transparent70' },
        '&:focus': { backgroundColor: '$transparent70' },
      },
      grey: {
        backgroundColor: '$white700',
        '&:focus': { border: '1px solid $white900' },
      },
      white: {
        borderColor: '$primary300',
        backgroundColor: '$white200',
        '&:focus': {
          border: '1px solid $primary500',
          backgroundColor: '$white100',
        },
      },
    },
  },

  defaultVariants: {
    mode: 'white',
  },
});

export type InputVariants = Stitches.VariantProps<typeof StyledInput>;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {
  id: string;
  label?: string;
  labelDirection?: 'row' | 'column';
  helperText?: string;
  helperType?: 'danger' | 'warning' | 'info';
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  labelDirection = 'column',
  helperText,
  helperType,
  ...otherProps
}) => {
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;

  const input = useMemo(
    () => (
      <StyledInput aria-labelledby={`${labelId} ${helperId}`} id={id} name={id} {...otherProps} />
    ),
    [helperId, id, labelId, otherProps],
  );

  return (
    <Col alignItems="end" fullWidth gap="xs">
      <Flex gap="xs" fullWidth direction={labelDirection}>
        {label && <Label id={labelId}>{label}</Label>}
        {input}
      </Flex>
      <Text color={helperType} size="xs" id={helperId}>
        &nbsp;{helperText}
      </Text>
    </Col>
  );
};

export default Input;
