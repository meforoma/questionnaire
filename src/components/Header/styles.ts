import { SxProps } from '@mui/material/styles';

export const headerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const noHoverStyle: SxProps = {
  ':hover': {
    background: 'none',
  },
};
