'use client';

import { FC } from 'react';
import { useAppSelector } from '@@/redux/store';
import { configPool } from '@/data/config';
import { QuestionIds } from '@/data/types';
import { useSummaryReplacements } from '@/hooks/useSummaryReplacements';
import { List, ListItem, Typography } from '@mui/material';
import { listStyle, scrollableListStyle } from './styles';

export const FinishLayout: FC = () => {
  const persistedAnswers = useAppSelector((state) => (
    state.persistedAnswers
  ));

  const rawSummary = Object.entries(persistedAnswers)
    .map(
      ([questionId, values]) => ([
        configPool[questionId as QuestionIds]?.title,
        values.titles?.join('. '),
      ])
    ).filter(([questionTitle]) => Boolean(questionTitle));

  const normalisedSummary = useSummaryReplacements(rawSummary);

  return (
    <List
      component='article'
      sx={scrollableListStyle}
    >
      {normalisedSummary.map(([question, answer]) => (
        <ListItem
          key={question}
          sx={listStyle}
        >
          <Typography
            fontSize={16}
            fontWeight={700}
          >
            {question}
          </Typography>

          <Typography variant='subtitle1'>
            {answer}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};
