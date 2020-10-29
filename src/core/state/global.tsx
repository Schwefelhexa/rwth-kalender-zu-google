import { createContext, useEffect, useState } from 'react';
import GlobalState from '../model/GlobalState';

type Setters = 'setToken' | 'setEvents' | 'setColors';
export const GlobalContext = createContext<GlobalState>({
  setToken: () => {},
  setEvents: () => {},
  setColors: () => {},
});

interface Props {
  children: React.ReactNode;
  token: string;
}
export const GlobalContextProvider: React.FC<Props> = ({ children, token }) => {
  const [global, setGlobal] = useState<Omit<GlobalState, Setters>>({ token });
  useEffect(() => {
    setGlobal((old) => ({ ...old, token }));
  }, [token, setGlobal]);

  const setters: Pick<GlobalState, Setters> = {
    setToken: (token) => setGlobal((old) => ({ ...old, token })),
    setColors: (colors) => setGlobal((old) => ({ ...old, colors })),
    setEvents: (events) => setGlobal((old) => ({ ...old, events })),
  };

  return <GlobalContext.Provider value={{ ...global, ...setters }}>{children}</GlobalContext.Provider>;
};
