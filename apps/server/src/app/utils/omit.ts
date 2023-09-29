// A utility function to extract properties except for some specified keys
export const omit = (obj: Record<string, unknown>, keysToOmit: string[]) =>
  Object.keys(obj)
    .filter((key) => !keysToOmit.includes(key))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
