import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

type State = {
  [key: string]: {
    titles: string[];
    answerOrder: number;
  };
};

const initialState: State = {};

const purgeChainedOnwardAnswers = (
  state: State,
  questionId: string,
) => {
  const chainedOnwardQuestionIds = Object.entries(state)
    .filter(([id, values]) => (
      values.answerOrder >= state[questionId].answerOrder
    ))
    .map(([id]) => id);

  const newState = { ...state };
  chainedOnwardQuestionIds.forEach((id) => {
    delete newState[id];
  });

  return newState;
};

export const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    registerAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string[] }>
    ) => {
      const { questionId, answer } = action.payload;

      const storedAnswer = state[questionId];
      const storedAnswerTitles = storedAnswer?.titles;
      const isAnswerPristine = (
        storedAnswerTitles
        && storedAnswerTitles.join() === answer.join()
      );

      if (isAnswerPristine) {
        return state;
      }

      if (!storedAnswerTitles) {
        return {
          ...state,
          [questionId]: {
            titles: answer,
            answerOrder: Object.keys(state).length,
          },
        };
      }

      return purgeChainedOnwardAnswers(state, questionId);
    },
    resetAnswers: () => initialState,
  },
});

export const {
  registerAnswer,
  resetAnswers,
} = answers.actions;

export default answers.reducer;
