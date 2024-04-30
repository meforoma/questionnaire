import { BaseAnswer } from '@/data/types';
import { Input } from '@mui/material';
import { FC, useState } from 'react';
import { NextButton } from '@@/components/NextButton';

type Props = {
  answers?: BaseAnswer[]
  submitAndNext: (value: string) => void
  answerTitles: string[]
};

export const TextAnswer: FC<Props> = ({
  submitAndNext,
  answerTitles,
}: Props) => {
  const [value, setValue] = useState((answerTitles || []).join(''));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAndNext(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const formId = 'text-answer-form';

  return (
    <form
      onSubmit={onSubmit}
      id={formId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
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
