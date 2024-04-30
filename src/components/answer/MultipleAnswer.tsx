import { BaseAnswer } from '@/data/types';
import { Box } from '@mui/material';
import { CSSProperties, FC, useState } from 'react';
import { answersBoxStyle } from '@@/components/answer/SingleAnswer';
import { AnswerButton } from '@@/components/AnswerButton';
import { NextButton } from '@@/components/NextButton';

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  submitAndNext: (answer: BaseAnswer | string | string[]) => void
};

export const formStyle: CSSProperties = {
  padding: '6px',
  maxHeight: 'calc(100vh - 270px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'thin',
};

export const MultipleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  submitAndNext,
}: Props) => {
  const [answersArray, setAnswersArray] = useState<string[]>(answerTitles || []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAndNext(answersArray);
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
        style={formStyle}
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
