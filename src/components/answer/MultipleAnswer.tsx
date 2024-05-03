import { BaseAnswer } from '@/data/types';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { AnswerButton } from '@@/components/AnswerButton/AnswerButton';
import { NextButton } from '@@/components/NextButton/NextButton';
import { answersBoxStyle, multipleAnswerFormStyle } from '@@/components/Answer/styles';

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  handleAnswer: (answer: BaseAnswer | string | string[]) => void
};

export const MultipleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  handleAnswer,
}: Props) => {
  const [answersArray, setAnswersArray] = useState<string[]>(answerTitles || []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAnswer(answersArray);
  };

  const setAnswers = (answer: BaseAnswer) => {
    if (answersArray.includes(answer.title)) {
      setAnswersArray(
        answersArray.filter((title) => title !== answer.title)
      );
    } else {
      setAnswersArray([...answersArray, answer.title]);
    }
  };

  const formId = 'multiple-answer-form';

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={multipleAnswerFormStyle}
        id={formId}
      >
        <Box sx={answersBoxStyle}>
          {answers.map((answer) => (
            <AnswerButton
              key={answer.title}
              answer={answer}
              isSelected={answersArray?.includes(answer.title)}
              onClick={() => setAnswers(answer)}
            />
          ))}
        </Box>
      </form>

      <NextButton
        formId={formId}
        disabled={!answersArray.length}
      />
    </>
  );
};
