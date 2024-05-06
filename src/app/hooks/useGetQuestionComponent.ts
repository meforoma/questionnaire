import { QuestionTypes } from '@/data/types';
import { MultipleAnswer } from '@@/components/Answer/MultipleAnswer';
import { SingleAnswer } from '@@/components/Answer/SingleAnswer';
import { TextAnswer } from '@@/components/Answer/TextAnswer';

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
