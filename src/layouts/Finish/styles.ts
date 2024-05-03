import { SxProps } from '@mui/material';

export const listStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  ':not(:last-child):after': {
    content: '""',
    display: 'block',
    height: '1px',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
};

export const scrollableListStyle: SxProps = {
  maxHeight: 'calc(100vh - 80px)',
  overflowY: 'auto',
};