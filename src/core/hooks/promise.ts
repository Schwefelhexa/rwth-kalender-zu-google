import { useCallback, useEffect, useRef, useState } from 'react';

export const usePromise = <T>(promise: () => Promise<T>): [T | null, boolean] => {
  const create_promise = useCallback(promise, []);
  const [data, setData] = useState<T | null>(null);
  const done = useRef(false);

  useEffect(() => {
    create_promise().then((res) => {
      done.current = true;
      setData(res);
    });
  }, [create_promise, setData]);

  return [data, done.current];
};
