import { BaseAnswer, BaseQuestion } from "@/data/types";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { ListItemButton } from "@mui/material";
import { FC, useState } from "react";

type Props = {
  answers: BaseAnswer[];
  answerTitles: string[];
  submitAndNext: (answer: BaseAnswer | string | string[]) => void
};

export const MultipleAnswer: FC<Props> = ({
  answers,
  answerTitles,
  submitAndNext,
}: Props) => {
  const [answersArray, setAnswersArray] = useState<string[]>(answerTitles || []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAndNext(answersArray);
  };

  const onClick = (answer: BaseAnswer) => {
    if (answersArray.includes(answer.title)) {
      setAnswersArray(
        answersArray.filter((title) => title !== answer.title)
      );
    } else {
      setAnswersArray([...answersArray, answer.title]);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {answers.map((answer) => (
        <div key={answer.title} style={{ margin: '12px 0' }}>
          <ListItemButton
            onClick={() => onClick(answer)}
            style={answersArray?.includes(answer.title)
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

      <button
        type="submit"
        disabled={!answersArray.length}
      >
        next
      </button>
    </form>
  );
};
