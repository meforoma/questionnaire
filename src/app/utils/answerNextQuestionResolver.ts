import { BaseAnswer, BaseQuestion } from '@/data/types';

type Answer = BaseAnswer | string | string[];

const isBaseAnswer = (answer: any): answer is BaseAnswer => {
  return Boolean(answer.title);
};

export const resolveNextQuestionId = (
  answer: Answer,
  question: BaseQuestion
) => {
  if (!isBaseAnswer(answer)) {
    return question.nextQuestionId;
  }

  return answer?.nextQuestionId || question.nextQuestionId;
};

export const resolveAnswer = (
  answer: Answer,
) => {
  switch (true) {
    case typeof answer === 'string':
      return [answer];

    case Array.isArray(answer):
      return answer;

    case isBaseAnswer(answer):
      return [answer.title];

    default:
      throw new Error('Not covered answer type');
  }
};
