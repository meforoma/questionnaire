import { BaseAnswer } from '@/data/types';
import { Box } from '@mui/material';
import { FC } from 'react';
import { AnswerButton } from '@@/components/AnswerButton';
import { answersBoxStyle } from '@@/components/answer/styles';

type Props = {
  answers: BaseAnswer[];
  persistedAnswer: string[];
  handleAnswer: (answer: BaseAnswer | string | string[]) => void
};

export const SingleAnswer: FC<Props> = ({
  answers,
  persistedAnswer,
  handleAnswer,
}: Props) => {
  return (
    <Box sx={answersBoxStyle}>
      {answers.map((answer) => (
        <AnswerButton
          key={answer.title}
          answer={answer}
          isSelected={persistedAnswer?.includes(answer.title)}
          onClick={() => handleAnswer(answer)}
        />
      ))}
    </Box>
  );
};
