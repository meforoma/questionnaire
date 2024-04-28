import { replacements } from "@/data/questions";
import { useAppSelector } from "@@/redux/store";
import { toSentenceCase } from "./toSentenceCase";

export const useReplacements = (
  textToProcess: string,
) => {
  const persistedState = useAppSelector((state) => (state));

  const regexp = /{{.+?}}/g;
  const matches = Array.from(
    textToProcess.matchAll(regexp),
    (match) => match[0],
  );

  const substitutes: Record<string, string> = {};

  matches.forEach((match) => {
    const replacementKey = match.slice(2, -2);
    const replacementAnswer = persistedState
      .persistedAnswers[replacementKey]?.titles[0];

    if (!replacements[replacementKey]) {
      console.log(replacementKey);

      substitutes[match] = replacementAnswer;
    } else {
      substitutes[match] = replacements[replacementKey][replacementAnswer];
    }
  })

  const withReplacements = textToProcess.replace(
    regexp,
    (match) => substitutes[match],
  );

  return toSentenceCase(withReplacements);
};
