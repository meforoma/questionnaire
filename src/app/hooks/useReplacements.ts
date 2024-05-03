import { useAppSelector } from '@@/redux/store';
import { applyReplacements } from '@/utils/getWithReplacements';

export const useReplacements = (
  textToProcess: string,
) => {
  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  return applyReplacements(persistedAnswers, textToProcess);
};
