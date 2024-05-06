import { BaseAnswer } from '@/data/types';
import { Box } from '@mui/material';
import { FC } from 'react';
import { AnswerButton } from '@@/components/AnswerButton';
import { answersBoxStyle } from '@@/components/Answer/styles';

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  handleAnswer: (answer: BaseAnswer | string | string[]) => void
};

export const SingleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  handleAnswer,
}: Props) => {
  return (
    <Box sx={answersBoxStyle}>
      {answers.map((answer) => (
        <AnswerButton
          key={answer.title}
          answer={answer}
          isSelected={answerTitles?.includes(answer.title)}
          onClick={() => handleAnswer(answer)}
        />
      ))}
    </Box>
  );
};
