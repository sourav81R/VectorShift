const VARIABLE_PATTERN = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

export const extractVariables = (text = '') => {
  const matches = text.matchAll(VARIABLE_PATTERN);
  return [...new Set(Array.from(matches, (match) => match[1]))];
};

export { VARIABLE_PATTERN };

