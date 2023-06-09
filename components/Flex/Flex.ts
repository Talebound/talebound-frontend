import { styled } from '../../styles/stitches.config';

export const Flex = styled('div', {
  display: 'flex',
  position: 'relative',

  variants: {
    // loading: {
    //   true: {
    //     '&:after': {
    //       content: `Loading`,
    //       fontSize: '$xl',
    //       display: 'flex',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       position: 'absolute',
    //       top: '0',
    //       left: '0',
    //       width: '100%',
    //       height: '100%',
    //       backgroundColor: 'rgba(0, 0, 0, 0.05)',
    //     },
    //   },
    // },

    fullWidth: {
      true: {
        width: '100%',
      },
    },

    gap: {
      none: {
        gap: '0',
      },
      xs: {
        gap: '$xs',
      },
      sm: {
        gap: '$sm',
      },
      md: {
        gap: '$md',
      },
      lg: {
        gap: '$lg',
      },
      xl: {
        gap: '$xl',
      },
    },

    padding: {
      none: {
        gap: '0',
      },
      xs: {
        padding: '$xs',
      },
      sm: {
        padding: '$sm',
      },
      md: {
        padding: '$md',
      },
      lg: {
        padding: '$lg',
      },
      xl: {
        padding: '$xl',
      },
    },

    justifyContent: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },

    alignItems: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },

    alignSelf: {
      start: {
        alignSelf: 'flex-start',
      },
      center: {
        alignSelf: 'center',
      },
      end: {
        alignSelf: 'flex-end',
      },
      stretch: {
        alignSelf: 'stretch',
      },
      baseline: {
        alignSelf: 'baseline',
      },
    },

    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },

    wrap: {
      true: {
        flexWrap: 'wrap',
      },
    },
  },

  defaultVariants: {
    fullWidth: 'false',
    gap: 'none',
  },
});

export const Col = styled(Flex, {
  flexDirection: 'column',
});

export const Row = styled(Flex, {
  flexDirection: 'row',

  defaultVariants: {
    alignItems: 'center',
  },
});
