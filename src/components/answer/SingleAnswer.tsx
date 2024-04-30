import { BaseAnswer } from '@/data/types';
import { Box, SxProps } from '@mui/material';
import { FC } from 'react';
import { AnswerButton } from '@@/components/AnswerButton';

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  submitAndNext: (answer: BaseAnswer | string | string[]) => void
};

export const answersBoxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '20px',
  position: 'relative',
};

export const SingleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  submitAndNext,
}: Props) => {
  return (
    <Box sx={answersBoxStyle}>
      {answers.map((answer) => (
        <AnswerButton
          key={answer.title}
          answer={answer}
          isSelected={answerTitles?.includes(answer.title)}
          onClick={() => submitAndNext(answer)}
        />
      ))}
    </Box>
  );
};
