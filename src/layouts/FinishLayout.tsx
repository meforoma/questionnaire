'use client';

import { FC } from 'react';
import { useAppSelector } from '@@/redux/store';
import { configPool } from '@/data/config';
import { QuestionIds } from '@/data/types';
import { useSummaryReplacements } from '@/utils/useSummaryReplacements';
import { Header } from '@@/components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, List, ListItem, Typography } from '@mui/material';
import { bodyGlobalStyle, boxStyle, containerStyle } from '@@/layouts/QuestionLayout';

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  ':not(:last-child):after': {
    content: '""',
    display: 'block',
    height: '1px',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
};
const scrollableListStyle = {
  maxHeight: 'calc(100vh - 80px)',
  overflowY: 'auto',
};

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
    <>
      <CssBaseline />
      {bodyGlobalStyle}
      <Container
        sx={containerStyle}
      >
        <Box sx={boxStyle}>
          <Header />
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
        </Box>
      </Container>
    </>
  );
};
