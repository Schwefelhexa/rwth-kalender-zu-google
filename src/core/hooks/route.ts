import { useEffect, useRef, useState } from 'react';
import { parseUrlFragment } from '../util/route';

type KeyValue = { [key: string]: string };
export const useUrlFragment = (): [KeyValue, boolean] => {
  const [parsed, setParsed] = useState<KeyValue>({});
  const loaded = useRef(false);

  useEffect(() => {
    loaded.current = true;
    setParsed(parseUrlFragment());
  }, [setParsed]);

  return [parsed, loaded.current];
};
