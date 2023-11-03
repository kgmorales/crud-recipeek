export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), wait);
  };
};
