import { BaseAnswer } from '@/data/types';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { ListItemButton } from '@mui/material';
import { FC } from 'react';
import {
  defaultAnswerButtonStyle,
  selectedAnswerButtonStyle,
} from '@@/components/AnswerButton/styles';

export const AnswerButton: FC<{
  answer: BaseAnswer;
  isSelected: boolean;
  onClick: () => void;
}> = ({ answer, isSelected, onClick }) => {
  const selectedStyle = isSelected
    ? selectedAnswerButtonStyle
    : {};

  const sx = {
    ...defaultAnswerButtonStyle,
    ...selectedStyle
  };

  return (
    <ListItemButton
      sx={sx}
      onClick={onClick}
    >
      {toSentenceCase(answer.title)}
    </ListItemButton>
  );
};
