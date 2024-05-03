import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const containerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 0 0',
  maxWidth: '330px',
};

export const boxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  width: '100%',
};

export const infoBodyStyle: CSSProperties = {
  height: '100vh',
  background: `linear-gradient(
    to bottom,
    #141333 0%,
    #202261 44%,
    #543C97 80%,
    #6939A1 97%
  )`,
  color: 'white',
};

export const bodyGlobalStyle = {
  backgroundColor: '#FFF0F0',
  height: '100vh',
};
