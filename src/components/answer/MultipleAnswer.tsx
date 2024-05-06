import { BaseAnswer } from '@/data/types';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { AnswerButton } from '@@/components/AnswerButton';
import { NextButton } from '@@/components/NextButton';
import { answersBoxStyle } from '@@/components/answer/styles';
import styles from '@@/components/answer/styles.module.css';

type Props = {
  answers: BaseAnswer[];
  persistedAnswer: string[];
  handleAnswer: (answer: BaseAnswer | string | string[]) => void
};

export const MultipleAnswer: FC<Props> = ({
  answers,
  persistedAnswer,
  handleAnswer,
}: Props) => {
  const [answersArray, setAnswersArray] = useState<string[]>(persistedAnswer || []);

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
        className={styles.multipleAnswerForm}
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
