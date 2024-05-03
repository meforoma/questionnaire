import { SxProps } from '@mui/material/styles';
import { CSSProperties } from 'react';

export const answersBoxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
  position: 'relative',
};

export const multipleAnswerFormStyle: CSSProperties = {
  padding: '6px',
  maxHeight: 'calc(100vh - 270px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'thin',
};

export const textAnswerFormStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
};
