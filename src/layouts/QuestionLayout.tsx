'use client';

import { FC } from 'react';
import { BaseAnswer, BaseQuestion } from '@/data/types';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@@/redux/store';
import { updateAnswer } from '@@/redux/features/answersSlice';
import { useLocalStorage } from '@/utils/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useReplacements } from '@/utils/useReplacements';
import { getAnswerValueAndNextQuestionId } from '@/utils/getAnswerValueAndNextQuestionId';
import { useGetQuestionComponent } from '@/utils/useGetQuestionComponent';
import { Header } from '@@/components/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, GlobalStyles, SxProps, Typography } from '@mui/material';

type Props = {
  question: BaseQuestion;
}

export const containerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px 0 0',
  maxWidth: '330px',
};
export const boxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  width: '100%',
};
export const infoBodyStyle = (
  <GlobalStyles
    styles={{
      body: {
        height: '100vh',
        background: `linear-gradient(
          to bottom,
          #141333 0%,
          #202261 44%,
          #543C97 80%,
          #6939A1 97%
        )`,
        color: 'white',
      },
    }}
  />
);
export const bodyGlobalStyle = (
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: '#FFF0F0',
        height: '100vh',
      },
    }}
  />
);

export const QuestionLayout: FC<Props> = ({
  question,
}) => {
  const router = useRouter();
  const [
    storedNextQuestionId,
    storeNextQuestionId,
  ] = useLocalStorage(LOCAL_STORAGE_KEYS.nextQuestionId, '');

  const dispatch = useDispatch<AppDispatch>();

  const navigateToNext = (nextQuestionId?: string) => {
    router.push(`/question/${
      question.nextInfoId
      || nextQuestionId
      || storedNextQuestionId
    }`);
  };

  const submitAndNext = (answer: BaseAnswer | string | string[]) => {
    const [answerValue, nextQuestionId] = getAnswerValueAndNextQuestionId(
      answer,
      question,
    );

    dispatch(updateAnswer({
      questionId: question.id,
      answer: answerValue,
    }));

    if (nextQuestionId) {
      storeNextQuestionId(nextQuestionId);
    }

    if (question?.isFinalQuestion) {
      router.push(`/finish`);

      return;
    }

    navigateToNext(nextQuestionId);
  };

  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  const answerTitles = persistedAnswers[question.id]?.titles;

  const normalisedTitle = useReplacements(question.title);
  const normalisedSubTitle = useReplacements(question.subTitle || '');

  const Component = useGetQuestionComponent(
    question.questionType,
  );
  const isInfo = question.id.includes('info');

  return (
    <>
      <CssBaseline />
      {
        isInfo
          ? infoBodyStyle
          : bodyGlobalStyle
      }

      <Container
        sx={containerStyle}
      >
        <Box sx={boxStyle}>
          <Header />

          <Typography
            fontSize={24}
            fontWeight={700}
            textAlign={'center'}
          >
            {normalisedTitle}
          </Typography>

          {normalisedSubTitle && (
            <Typography
              fontSize={14}
              fontWeight={400}
              lineHeight={'25px'}
              textAlign={'center'}
            >
              {normalisedSubTitle}
            </Typography>
          )}

          <Component
            answers={question.answers || []}
            answerTitles={answerTitles}
            submitAndNext={submitAndNext}
          />
        </Box>
      </Container>
    </>
  );
};
