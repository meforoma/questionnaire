import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

const initialState: Record<string, string | string[]> = {};

export const answers = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      const { questionId, answer } = action.payload;

      return {
        ...state,
        [questionId]: answer,
      };
    },
    // resetAnswers: (state) => {
  },
});

export const { updateAnswer } = answers.actions;
export default answers.reducer;
