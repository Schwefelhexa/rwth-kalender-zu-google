import { useCallback, useEffect, useRef, useState } from 'react';

export const usePromise = <T>(promise: () => Promise<T> | null, params: any[] = []): [T | null, boolean] => {
  const create_promise = useCallback(promise, params);
  const [data, setData] = useState<T | null>(null);
  const done = useRef(false);

  useEffect(() => {
    create_promise()?.then((res) => {
      if (res === null) return;

      done.current = true;
      setData(res);
    });
  }, [create_promise, setData]);

  return [data, done.current];
};
