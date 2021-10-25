import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([] as AbortController[]);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = undefined
    ) => {
      setIsLoading(true);
      const httpAbortCrtl = new AbortController();
      activeHttpRequests.current.push(httpAbortCrtl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCrtl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCrtl
        ); // remove abort controllers from completed requests

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(undefined);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort()); // clean-up function that aborts a request if user clicks a new component while request is still being fetched
    };
  }, []);
  return { isLoading, error, sendRequest, clearError };
};
