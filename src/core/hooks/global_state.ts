import { useContext } from 'react';
import CsvEvent from '../model/CsvEvent';
import { Colors } from '../model/GlobalState';
import { GlobalContext } from '../state/global';

export const useGoogleToken = () => useContext(GlobalContext).token ?? null;
export const useCalendarEvents = () => useContext(GlobalContext).events ?? null;
export const useEventColors = () => useContext(GlobalContext).colors ?? null;

export const useSetGoogleToken = () => {
  const context = useContext(GlobalContext);
  return (token: string) => context.setToken(token);
};
export const useSetCalendarEvents = () => {
  const context = useContext(GlobalContext);
  return (events: CsvEvent[]) => context.setEvents(events);
};
export const useSetEventColors = () => {
  const context = useContext(GlobalContext);
  return (colors: Colors) => context.setColors(colors);
};
