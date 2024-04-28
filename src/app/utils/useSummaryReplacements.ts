import { useAppSelector } from "@@/redux/store";
import { getWithReplacements } from "@/utils/getWithReplacements";

export const useSummaryReplacements = (
  arrayToProcess: string[][],
) => {
  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  return arrayToProcess.map(([question, answer]) => ([
    getWithReplacements(persistedAnswers, question),
    getWithReplacements(persistedAnswers, answer),
  ]));
};
