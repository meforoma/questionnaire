import { SxProps } from '@mui/material/styles';
import { CSSProperties } from 'react';

export const headerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const noHoverStyle: SxProps = {
  ':hover': {
    background: 'none',
  },
};

export const centeredFlex: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
};
