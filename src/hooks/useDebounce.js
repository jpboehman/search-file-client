// import { useState, useEffect } from "react";

// /**
//  * useDebounce: Custom hook for debouncing input
//  * @param {any} value - The value to debounce
//  * @param {number} delay - Delay in milliseconds
//  * @returns {any} Debounced value
//  */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // Cleanup timeout on unmount or value change
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
