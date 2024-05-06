import { SxProps } from '@mui/material';

export const selectedAnswerButtonStyle: SxProps = {
  color: 'white',
  background: `linear-gradient(
    to bottom,
    #141333 0%,
    #202261 44%,
    #543C97 80%,
    #6939A1 97%
  )`,
};

export const defaultAnswerButtonStyle: SxProps = {
  color: 'black',
  backgroundColor: '#EAEEF7',
  minHeight: '64px',
  maxWidth: '330px',

  border: '1px solid #E0E0E0',
  borderRadius: '16px',
  boxShadow: '2px 2px 6px rgba(84, 60, 151, 0.25)',
  textAlign: 'center',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 20px',
  '&:hover': {
    scale: '1.02',
    backgroundColor: 'lightgray',
  },
};
