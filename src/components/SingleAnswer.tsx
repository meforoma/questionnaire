import { BaseAnswer } from '@/data/types';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { ListItemButton } from '@mui/material';
import { FC } from 'react';

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  submitAndNext: (answer: BaseAnswer | string | string[]) => void
};

export const SingleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  submitAndNext,
}: Props) => {
  return (<>
    {answers.map((answer) => (
      <div key={answer.title} style={{ margin: '12px 0' }}>
        <ListItemButton
          onClick={() => submitAndNext(answer)}
          style={answerTitles?.includes(answer.title)
            ? {
              background: `linear-gradient(
                to bottom,
                #141333 0%,
                #202261 44%,
                #543C97 80%,
                #6939A1 97%
              )`,
              color: 'white',
            }
            : {}}
        >
          {toSentenceCase(answer.title)}
        </ListItemButton>
      </div>
    ))}
  </>);
};
