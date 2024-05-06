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

export const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    registerAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string[] }>
    ) => {
      const { questionId, answer } = action.payload;

      return {
        ...state,
        [questionId]: {
          titles: answer,
          answerOrder: Object.keys(state).length,
        },
      };
    },
    purgeOnwardsChainedAnswers: (
      state,
      action: PayloadAction<{ questionId: string }>
    ) => {
      const { questionId } = action.payload;

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
    },
    resetAnswers: () => initialState,
  },
});

export const {
  registerAnswer,
  purgeOnwardsChainedAnswers,
  resetAnswers,
} = answers.actions;

export default answers.reducer;
