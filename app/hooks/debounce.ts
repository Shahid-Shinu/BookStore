import { useState, useEffect } from 'react';

export const useDebounce = (initialValue = "" , delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(initialValue);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(initialValue);
      }, delay);
      return () => clearTimeout(handler);
    }, [initialValue, delay]);
    return debouncedValue;
  }