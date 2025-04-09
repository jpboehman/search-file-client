import { useState, useEffect } from "react";
import axios from "axios";

/**
 * useApi: Custom hook for fetching data from an API.
 * - Automatically handles loading, errors, and cleanup.
 * - Uses a cleanup function to avoid state updates on unmounted components.
 *
 * @param {string} url - API endpoint
 * @returns {Object} { data, isLoading, error }
 */
export const useApi = (url) => {
  const [responseState, setResponseState] = useState({
    data: null,
    isLoadingL: true,
    error: null,
  });

  useEffect(() => {
    // Prevents state updates on unmounted components
    let isMounted = true;

    const fetchData = async () => {
      setResponseState((prevState) => ({
        ...prevState,
        isLoading: true,
        error: null,
      }));
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setResponseState({
            data: response.data,
          });
        }
      } catch (error) {
        if (isMounted) {
          setResponseState({ data: null, isLoading: false, error });
        }
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [url]);

  return responseState;
};
