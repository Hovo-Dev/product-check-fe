import { useState } from "react";

const useAsync = <T extends object, U = object>(asyncFunction: (...args: U[]) => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  const executeFn = async (...payload: U[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await asyncFunction(...payload);


      setIsLoading(false);

      setData(result);
    } catch (error: any) {
      setIsLoading(false);
      setData(null);
      setError(error);
    }
  };

  return { isLoading, error, data, executeFn };
};


export default useAsync;