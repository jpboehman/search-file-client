// import { useState, useEffect } from "react";
// import axios from "axios";

// React custom hooks are functions that allow you to use state and other React features in functional components.
// They are a way to REUSE stateful logic between different components.
// Custom hooks are prefixed with `use` and can call other hooks if needed.

/**
 * useApi: Custom hook for fetching data from an API.
 * - Automatically handles loading, errors, and cleanup.
 * - Uses a cleanup function to avoid state updates on unmounted components.
 *
 * @param {string} url - API endpoint
 * @returns {Object} { data, isLoading, error }
 */
export const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevents state updates if unmounted - key for custom hooks

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates on unmounted components
    return () => (isMounted = false);
  }, [url]);

  return { data, isLoading, error };
};
