'use client'

import { FC } from "react";
import { BaseAnswer, BaseQuestion } from "@/data/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@@/redux/store";
import { updateAnswer } from "@@/redux/features/answersSlice";

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
      console.log('route to pre-submit summary page');
    }

    dispatch(updateAnswer({
      questionId: question.id,
      answer: answer.title,
    }));

    navigateToNextQuestion(answer);
  }

  const currentAnswer = useAppSelector((state) => (
    state.answers
  ))[question.id];

  return (
    <div>
      {/*
        router back button
        highlight current answer from redux store
      */}
      {isFinalQuestion && `heads up, final question!`}
      <h1>{question.title}</h1>
      <p>{question.subTitle}</p>
      <ul>
        {question.answers.map((answer) => (
          <div key={answer.title}>
            <button
              onClick={() => onClick(answer)}
              style={
                answer.title === currentAnswer
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
