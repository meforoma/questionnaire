'use client'

import { FC } from "react";
import { BaseAnswer, BaseQuestion, QuestionIds } from "@/data/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@@/redux/store";
import { updateAnswer, resetAnswers } from "@@/redux/features/answersSlice";
import { IconButton, ListItemButton } from "@mui/material";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";
import { useReplacements } from "@/utils/useReplacements";
import { toSentenceCase } from "@/utils/toSentenceCase";

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

  const submitAndNext = (answer: BaseAnswer) => {
    const nextQuestionId = (
      question.nextQuestionId || answer.nextQuestionId
    );

    if (nextQuestionId) {
      console.log('nextQuestionId', nextQuestionId, `dispatch answer and setLocalStore`);

      dispatch(updateAnswer({
        questionId: question.id,
        answer: [answer.title],
      }));

      storeNextQuestionId(nextQuestionId);
    }

    if (question?.isFinalQuestion) {
      router.push(`/finish`);

      return;
    }

    navigateToNext(nextQuestionId);
  }

  const persistedState = useAppSelector((state) => (state));

  const answerTitles = (
    persistedState.persistedAnswers[question.id]?.titles
  );

  const normalisedTitle = useReplacements(question.title);
  const normalisedSubTitle = useReplacements(question.subTitle || '');
console.log('normalisedSubTitle', !!normalisedSubTitle);

  return (
    <div>
      <IconButton
        onClick={() => router.back()}
      >
        {'<'}
      </IconButton>

      <button onClick={() => {
        dispatch(resetAnswers());
        navigateToEntryQuestion();
      }}>
        reset
      </button>

      <h1>{normalisedTitle}</h1>
      {normalisedSubTitle && (
        <p>{normalisedSubTitle}</p>
      )}

      {/*
        +QuestionTypes.singleAnswer
        QuestionTypes.multipleAnswers: onClick -> setState string[]; onSubmit
        QuestionTypes.text: form + submit button
      */}
        {question.answers.map((answer) => (
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
                  color: "white",
                }
                : {}}
            >
              {toSentenceCase(answer.title)}
            </ListItemButton>
          </div>
        ))}
    </div>
  )
}
