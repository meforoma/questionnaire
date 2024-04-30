import { QuestionTypes } from '@/data/types';
import { MultipleAnswer } from '@@/components/answer/MultipleAnswer';
import { SingleAnswer } from '@@/components/answer/SingleAnswer';
import { TextAnswer } from '@@/components/answer/TextAnswer';

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
