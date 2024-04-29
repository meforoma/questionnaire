import { BaseAnswer } from '@/data/types';
import { FC, useState } from 'react';

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

  return (
    <form onSubmit={onSubmit}>
      <input
        required
        type="text"
        placeholder="..."
        onChange={onChange}
        value={value}
      />

      <button
        type="submit"
        disabled={!value}
      >
        next
      </button>
    </form>
  );
};
