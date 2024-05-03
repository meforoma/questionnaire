'use client';

import { FC } from 'react';
import { BaseAnswer, BaseQuestion } from '@/data/types';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@@/redux/store';
import { registerAnswer } from '@@/redux/features/answersSlice';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useReplacements } from '@/hooks/useReplacements';
import { getAnswerValueAndNextQuestionId } from '@/utils/getAnswerValueAndNextQuestionId';
import { useGetQuestionComponent } from '@/hooks/useGetQuestionComponent';
import { Typography } from '@mui/material';
import { BaselineContainer } from '@@/components/BaselineContainer';

type Props = {
  question: BaseQuestion;
}

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

  // TODO: rename to comply with singleResponsibility
  const handleAnswer = (answer: BaseAnswer | string | string[]) => {
    const [answerValue, nextQuestionId] = getAnswerValueAndNextQuestionId(
      answer,
      question,
    );

    dispatch(registerAnswer({
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

  // TODO: not reliable, refactor
  const isInfo = question.id.includes('info');

  return (
    <BaselineContainer>
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
        handleAnswer={handleAnswer}
      />
    </BaselineContainer>
  );
};
