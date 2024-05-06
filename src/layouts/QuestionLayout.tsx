'use client';

import { FC } from 'react';
import { BaseAnswer, BaseQuestion, QuestionIds } from '@/data/types';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@@/redux/store';
import { registerAnswer, purgeOnwardsChainedAnswers } from '@@/redux/features/answersSlice';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useReplacements } from '@/hooks/useReplacements';
import { resolveAnswer, resolveNextQuestionId } from '@/utils/answerNextQuestionResolver';
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
    if (question?.isFinalQuestion) {
      return router.push(`/${QuestionIds.finish}`);
    }

    router.push(`/question/${
      question.nextInfoId
      || nextQuestionId
      || storedNextQuestionId
    }`);
  };

  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));
  const persistedAnswer = persistedAnswers[question.id]?.titles;

  const handleAnswer = (answer: BaseAnswer | string | string[]) => {
    const answerValue = resolveAnswer(answer);
    const nextQuestionId = resolveNextQuestionId(
      answer,
      question,
    );

    const isAnswerPristine = (
      answerValue.join() === persistedAnswer?.join()
    );

    if (persistedAnswer && !isAnswerPristine) {
      dispatch(purgeOnwardsChainedAnswers({
        questionId: question.id,
      }));
    }

    dispatch(registerAnswer({
      questionId: question.id,
      answer: answerValue,
    }));

    if (nextQuestionId) {
      storeNextQuestionId(nextQuestionId);
    }

    navigateToNext(nextQuestionId);
  };

  const normalisedTitle = useReplacements(question.title);
  const normalisedSubTitle = useReplacements(question.subTitle || '');

  const Component = useGetQuestionComponent(
    question.questionType,
  );

  return (
    <BaselineContainer
      customStyleName={question?.customStyleName}
    >
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
        persistedAnswer={persistedAnswer}
        handleAnswer={handleAnswer}
      />
    </BaselineContainer>
  );
};
