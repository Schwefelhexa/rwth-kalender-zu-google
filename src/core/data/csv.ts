import Papa from 'papaparse';
import CsvEvent, { DayOfWeek, LvType } from '../model/CsvEvent';

const parseCalendarLine = (line: string[]): CsvEvent | null => {
  if (line.length !== 14) return null;

  if (
    line[0] === 'WOCHENTAG' ||
    line[1] === 'DATUM' ||
    line[2] === 'VON' ||
    line[3] === 'BIS' ||
    line[4] === 'DAUER_IN_MINUTEN' ||
    line[5] === 'LV_NUMMBER' ||
    line[6] === 'TITEL' ||
    line[7] === 'LV_ART' ||
    line[8] === 'LV_GRUPPE' ||
    line[9] === 'ORT' ||
    line[13] === 'ANMERKUNG'
  )
    return null;

  return {
    dayOfWeek: line[0] as DayOfWeek,
    date: line[1],
    start_time: line[2],
    end_time: line[3],
    duration: Number.parseInt(line[4]),
    lv_id: Number.parseInt(line[5]),
    title: line[6],
    lv_type: line[7] as LvType,
    lv_group: line[8],
    location: line[9],
    note: line[13].length > 0 ? line[13] : undefined,
  };
};

export const parseCalendar = (source: File): Promise<CsvEvent[]> =>
  new Promise((resolve) => {
    Papa.parse(source, {
      complete: ({ data }) => {
        resolve(data.map((item) => parseCalendarLine(item as string[])).filter((item) => item !== null) as CsvEvent[]);
      },
      encoding: 'ISO-8859-1',
    });
  });
