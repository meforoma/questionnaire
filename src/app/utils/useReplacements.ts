import { useAppSelector } from "@@/redux/store";
import { getWithReplacements } from "@/utils/getWithReplacements";

export const useReplacements = (
  textToProcess: string,
) => {
  const persistedAnswers = useAppSelector((state) => (state.persistedAnswers));

  return getWithReplacements(persistedAnswers, textToProcess);
};
