import React from 'react';
import { Text } from '../Typography/Text';
import { styled } from '../../styles/stitches.config';
import { Col } from '../Flex/Flex';

const MiniStatisticWrapper = styled(Col, {
  padding: '$sm',
  backgroundColor: '$transparent60',
  borderRadius: '$md',
  fontSize: '$md',
  width: '100px',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    compact: {
      true: {
        fontSize: '$2xs',
        width: '60px',
      },
    },
  },
});

const MiniStatisticNumber = styled(Col, {
  padding: '$xs',
  fontSize: '$2xl',
  backgroundColor: '$transparent60',
  width: '60px',
  height: '60px',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    compact: {
      true: {
        fontSize: '$sm',
        width: '25px',
        height: '25px',
      },
    },
  },
});

interface MiniStatisticProps {
  title?: string;
  value?: number;
  compact?: boolean;
}

const MiniStatistic: React.FC<MiniStatisticProps> = ({ title, value, compact }) => {
  return (
    <MiniStatisticWrapper gap="sm" compact={compact}>
      <Text>{title}</Text>
      <MiniStatisticNumber circle compact={compact}>
        {value}
      </MiniStatisticNumber>
    </MiniStatisticWrapper>
  );
};

export default MiniStatistic;
