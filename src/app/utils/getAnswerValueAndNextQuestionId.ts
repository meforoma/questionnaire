import { BaseAnswer, BaseQuestion, QuestionIds } from '@/data/types';

export const getAnswerValueAndNextQuestionId = (
  answer: BaseAnswer | string | string[],
  question: BaseQuestion,
): [string[], QuestionIds | undefined] => {
  if (typeof answer === 'string') {
    return [[answer], question.nextQuestionId];
  }

  if (Array.isArray(answer)) {
    return [answer, question.nextQuestionId];
  }

  return [[answer.title], answer.nextQuestionId || question.nextQuestionId];
};
