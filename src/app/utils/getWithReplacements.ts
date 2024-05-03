import { PersistedAnswers } from '@@/redux/store';
import { toSentenceCase } from '@/utils/toSentenceCase';
import { replacements } from '@/data/config';

const taggedReplacementRegexp = /{{.+?}}/g;

const getTaggedReplacements = (textToProcess: string) => {
  return Array.from(
    textToProcess.matchAll(taggedReplacementRegexp),
    (match) => match[0],
  );
};

const getReplacementsMap = (
  taggedReplacements: string[],
  persistedAnswers: PersistedAnswers,
) => {
  const replacementsMap = new Map<string, string>();

  taggedReplacements.forEach((match) => {
    const replacementKey = match.slice(2, -2);
    const replacementAnswer = persistedAnswers[replacementKey]?.titles[0];
    const configuredReplacement = replacements[replacementKey];

    if (!configuredReplacement) {
      replacementsMap.set(match, replacementAnswer);
    } else {
      replacementsMap.set(match, configuredReplacement[replacementAnswer]);
    }
  });

  return replacementsMap;
};

export const applyReplacements = (
  persistedAnswers: PersistedAnswers,
  textToProcess: string,
) => {
  const taggedReplacements = getTaggedReplacements(textToProcess);

  if (!taggedReplacements.length) {
    return toSentenceCase(textToProcess);
  }

  const replacementsMap = getReplacementsMap(
    taggedReplacements,
    persistedAnswers,
  );

  const withReplacements = textToProcess.replace(
    taggedReplacementRegexp,
    (match) => replacementsMap.get(match) || '',
  );

  return toSentenceCase(withReplacements);
};
