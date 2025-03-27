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
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setState({ data: response.data, isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, isLoading: false, error });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
};
