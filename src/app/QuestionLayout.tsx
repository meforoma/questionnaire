'use client'

import { FC } from "react";
import { BaseAnswer, BaseQuestion, QuestionIds } from "@/data/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@@/redux/store";
import { updateAnswer, resetAnswers } from "@@/redux/features/answersSlice";

type Props = {
  question: BaseQuestion;
}

export const QuestionLayout: FC<Props> = ({
  question,
}) => {
  const isFinalQuestion = (
    !question?.nextQuestionId
    && question.answers.every((answer) => !answer?.nextQuestionId)
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const navigateToEntryQuestion = () => {
    router.push(`/question/${QuestionIds.entry}`);
  }

  const navigateToNextQuestion = (answer: BaseAnswer) => {
    if (question.nextQuestionId) {
      router.push(`/question/${question.nextQuestionId}`)
    }

    if (answer.nextQuestionId) {
      router.push(`/question/${answer.nextQuestionId}`)
    }
  }

  const onClick = (answer: BaseAnswer) => {
    if (isFinalQuestion) {
      // route to pre-submit summary page
      router.push(`/question/finish`)
      console.log('route to pre-submit summary page');
    }

    dispatch(updateAnswer({
      questionId: question.id,
      answer: [answer.title],
    }));

    navigateToNextQuestion(answer);
  }

  const persistedAnswers = useAppSelector((state) => (
    state.persistedAnswers
  ));

  const answerTitles = persistedAnswers[question.id]?.titles;

  return (
    <div>
      {isFinalQuestion && `heads up, final question!`}

      <button onClick={() => router.back()}>
        back
      </button>

      <button onClick={() => {
        dispatch(resetAnswers());
        navigateToEntryQuestion();
      }}>
        reset
      </button>

      <h1>{question.title}</h1>
      <p>{question.subTitle}</p>
      <ul>
        {question.answers.map((answer) => (
          <div key={answer.title}>
            <button
              onClick={() => onClick(answer)}
              style={
                answerTitles?.includes(answer.title)
                  ? { backgroundColor: 'lightblue' }
                  : {}
              }
            >
              {answer.title}
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}
