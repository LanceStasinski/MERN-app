import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([] as AbortController[]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any = null,
      headers: any = null
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

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        return responseData;
      } catch (error: any) {
        setError(error.message);
      }
      setIsLoading(false);
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
