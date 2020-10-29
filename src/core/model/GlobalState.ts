import Color from './Color';
import CsvEvent, { LvType } from './CsvEvent';

export type Colors = { [key in LvType]: Color };
interface GlobalState {
  token?: string;
  events?: CsvEvent[];
  colors?: Colors;

  setToken: (token: string) => void;
  setEvents: (events: CsvEvent[]) => void;
  setColors: (colors: Colors) => void;
}
export default GlobalState;
