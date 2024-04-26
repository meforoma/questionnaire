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
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string[] }>
    ) => {
      const { questionId, answer } = action.payload;

      const answerTitles = state[questionId]?.titles;
      const isAnswerPristine = (
        answerTitles && answerTitles.join() === answer.join()
      );

      if (isAnswerPristine) {
        return state;
      }

      if (!answerTitles) {
        return {
          ...state,
          [questionId]: {
            titles: answer,
            answerOrder: Object.keys(state).length,
          },
        };
      }

      const chainedOnwardQuestionIds = Object.entries(state)
        .reduce<string[]>((ids, [id, values]) => {
          if (values.answerOrder >= state[questionId].answerOrder) {
            ids.push(id);
          }

          return ids;
        }, []);

      const newState = { ...state };
      chainedOnwardQuestionIds.forEach((id) => {
        delete newState[id];
      });

      return {
        ...newState,
        [questionId]: {
          titles: answer,
          answerOrder: Object.keys(newState).length,
        },
      };
    },
    resetAnswers: () => initialState,
  },
});

export const {
  updateAnswer,
  resetAnswers,
} = answers.actions;

export default answers.reducer;
