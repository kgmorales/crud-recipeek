import { useRef, useEffect, useCallback } from 'react';

// Use NodeJS.Timeout for Node.js environment or number for browser environment
type TimeoutRef = ReturnType<typeof setTimeout> | null;

// Define a generic type for the debounced function with specific argument types
export function useDebounce<F extends (...args: string[]) => unknown>() {
  const timeoutRef = useRef<TimeoutRef>(null);

  // The debounce function now uses a generic type F
  const debounce = useCallback((func: F, wait: number) => {
    return (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func(...args), wait);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounce;
}
