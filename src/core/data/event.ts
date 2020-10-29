import Color from '../model/Color';
import CsvEvent from '../model/CsvEvent';
import GoogleApiEvent from '../model/GoogleApiEvent';
import { toRFC3339 } from './time';

export const toGoogleApiFormat = (event: CsvEvent, color: Color): GoogleApiEvent => ({
  summary: `[${event.lv_type}] ${event.title}`,
  description: `${event.note ? `Anmerkung ${event.note}<br />` : ''}LV-Nummer: ${
    event.lv_id
  }<br />Automatisch erstellt mit <a href="https://rwthkalender.baronalexander.com">RWTH Kalender zu Google</a>`,

  start: {
    dateTime: toRFC3339(event.date, event.start_time, 1),
  },
  end: {
    dateTime: toRFC3339(event.date, event.end_time, 1),
  },

  colorId: color.id,
  location: event.location,
});
