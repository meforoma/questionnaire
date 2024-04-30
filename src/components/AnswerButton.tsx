import { BaseAnswer } from '@/data/types';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { ListItemButton, SxProps } from '@mui/material';
import { FC } from 'react';

export const selectedAnswerButtonStyle: SxProps = {
  background: `linear-gradient(
    to bottom,
    #141333 0%,
    #202261 44%,
    #543C97 80%,
    #6939A1 97%
  )`,
  color: 'white',
};
export const defaultAnswerButtonStyle: SxProps = {
  backgroundColor: '#EAEEF7',
  minHeight: '64px',
  maxWidth: '330px',

  border: '1px solid #E0E0E0',
  borderRadius: '16px',
  boxShadow: '2px 2px 6px rgba(84, 60, 151, 0.25)',
  textAlign: 'center',
  color: 'black',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 20px',
  '&:hover': {
    ...selectedAnswerButtonStyle,
    scale: '1.02',
  },
};

export const AnswerButton: FC<{
  answer: BaseAnswer;
  isSelected: boolean;
  onClick: () => void;
}> = ({ answer, isSelected, onClick }) => {
  const selectedStyle = isSelected
    ? selectedAnswerButtonStyle
    : {};

  return (
    <ListItemButton
      sx={{
        ...defaultAnswerButtonStyle,
        ...selectedStyle,
      }}
      onClick={onClick}
    >
      {toSentenceCase(answer.title)}
    </ListItemButton>
  );
};
