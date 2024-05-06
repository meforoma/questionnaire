import { BaseAnswer } from '@/data/types';
import { Input } from '@mui/material';
import { FC, useState } from 'react';
import { NextButton } from '@@/components/NextButton';
import styles from '@@/components/Answer/styles.module.css';

type Props = {
  answers?: BaseAnswer[]
  handleAnswer: (value: string) => void
  answerTitles: string[]
};

export const TextAnswer: FC<Props> = ({
  handleAnswer,
  answerTitles,
}: Props) => {
  const [value, setValue] = useState((answerTitles || []).join(''));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAnswer(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const formId = 'text-answer-form';

  return (
    <form
      onSubmit={onSubmit}
      id={formId}
      className={styles.textAnswerForm}
    >
      <Input
        required
        type="text"
        placeholder="..."
        onChange={onChange}
        value={value}
      />

      <NextButton
        formId={formId}
        disabled={!value}
      />
    </form>
  );
};
