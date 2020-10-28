import { useEffect, useState } from 'react';
import { parseUrlFragment } from '../util/route';

type KeyValue = { [key: string]: string };
export const useUrlFragment = (): KeyValue => {
  const [parsed, setParsed] = useState<KeyValue>({});
  useEffect(() => {
    setParsed(parseUrlFragment());
  }, [setParsed]);

  return parsed;
};
