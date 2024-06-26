import { SxProps } from '@mui/material';

export const nextButtonStyle: SxProps = {
  position: 'sticky',
  bottom: '0px',
  width: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  borderRadius: '16px',
  background: 'linear-gradient(90.6deg,#6a4dbc 0.47%,#f2994a 137.94%)',
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
  },
};
