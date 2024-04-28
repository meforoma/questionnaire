import { QuestionTypes } from "@/data/types";
import { MultipleAnswer } from "@@/components/MultipleAnswer";
import { SingleAnswer } from "@@/components/SingleAnswer";
import { TextAnswer } from "@@/components/TextAnswer";

const componentsMap = {
  [QuestionTypes.singleChoice]: SingleAnswer,
  [QuestionTypes.multipleChoice]: MultipleAnswer,
  [QuestionTypes.text]: TextAnswer,
};

export const useGetQuestionComponent = (
  questionType: QuestionTypes,
) => {
  return componentsMap[questionType];
};
