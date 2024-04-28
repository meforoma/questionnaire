export const toSentenceCase = (string: string) => {
  const lowerCase = string.toLowerCase();
  const parts = lowerCase.split('.');

  const sentenceCased = parts.map((part) => (
    part.trim().charAt(0).toUpperCase()
    + part.trim().slice(1)
  ));

  return sentenceCased.join('. ');
};