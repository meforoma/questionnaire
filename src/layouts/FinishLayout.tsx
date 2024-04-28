'use client'

import { FC } from "react";
import { useAppSelector } from "@@/redux/store";
import { configPool } from "@/data/questions";
import { QuestionIds } from "@/data/types";

export const FinishLayout: FC = () => {
    const persistedAnswers = useAppSelector((state) => (
      state.persistedAnswers
    ));

    const elementsToRender = Object.entries(persistedAnswers)
      .map(([questionId, values]) => ([
          configPool[questionId as QuestionIds]?.title,
          values.titles?.join('\n'),
        ])
      );

  return (
    <div>
      {elementsToRender.map(([question, answer]) => (
        <div key={question}>
          <h2>{question}</h2>
          <p>{answer}</p>
        </div>
      ))}
    </div>
  )
}
