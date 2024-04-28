'use client'

import { FC } from "react";
import { BaseAnswer, BaseQuestion, QuestionIds, QuestionTypes } from "@/data/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@@/redux/store";
import { updateAnswer, resetAnswers } from "@@/redux/features/answersSlice";
import {
  IconButton,
} from "@mui/material";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";
import { useReplacements } from "@/utils/useReplacements";
import { getAnswerValueAndNextQuestionId } from "@/utils/getAnswerValueAndNextQuestionId";
import { useGetQuestionComponent } from "@/utils/useGetQuestionComponent";
import { Header } from "@@/components/Header";

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

  const navigateToEntryQuestion = () => {
    router.push(`/question/${QuestionIds.entry}`);
  }

  const navigateToNext = (nextQuestionId?: string) => {
    router.push(`/question/${
      question.nextInfoId
      || nextQuestionId
      || storedNextQuestionId
    }`)
  }

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
  }

  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  const answerTitles = persistedAnswers[question.id]?.titles;

  const normalisedTitle = useReplacements(question.title);
  const normalisedSubTitle = useReplacements(question.subTitle || '');

  const Component = useGetQuestionComponent(
    question.questionType,
  )

  return (
    <div>
      <Header />

      <h1>{normalisedTitle}</h1>
      {normalisedSubTitle && (
        <p>{normalisedSubTitle}</p>
      )}

      <Component
        answers={question.answers || []}
        answerTitles={answerTitles}
        submitAndNext={submitAndNext}
      />
    </div>
  )
}
