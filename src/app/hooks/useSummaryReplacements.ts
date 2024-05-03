import { useAppSelector } from '@@/redux/store';
import { applyReplacements } from '@/utils/getWithReplacements';

export const useSummaryReplacements = (
  arrayToProcess: string[][],
) => {
  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  return arrayToProcess.map(([question, answer]) => ([
    applyReplacements(persistedAnswers, question),
    applyReplacements(persistedAnswers, answer),
  ]));
};
