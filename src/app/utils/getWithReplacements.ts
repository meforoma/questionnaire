import { PersistedAnswers, RootState } from "@@/redux/store";
import { toSentenceCase } from "@/utils/toSentenceCase";
import { replacements } from "@/data/questions";

export const getWithReplacements = (
  persistedAnswers: PersistedAnswers,
  textToProcess: string,
) => {
  const regexp = /{{.+?}}/g;
  const matches = Array.from(
    textToProcess.matchAll(regexp),
    (match) => match[0],
  );

  if (!matches.length) {
    return toSentenceCase(textToProcess);
  }

  const substitutes: Record<string, string> = {};

  matches.forEach((match) => {
    const replacementKey = match.slice(2, -2);
    const replacementAnswer = persistedAnswers[replacementKey]?.titles[0];
    const configuredReplacement = replacements[replacementKey];

    if (!configuredReplacement) {
      substitutes[match] = replacementAnswer;
    } else {
      substitutes[match] = configuredReplacement[replacementAnswer];
    }
  })

  const withReplacements = textToProcess.replace(
    regexp,
    (match) => substitutes[match],
  );

  return toSentenceCase(withReplacements);
};
