import { toGoogleApiFormat } from '../data/event';
import Color from '../model/Color';
import CsvEvent from '../model/CsvEvent';
import GoogleApiEvent from '../model/GoogleApiEvent';

export const createEvent = (event: CsvEvent, color: Color, token: string): Promise<void> =>
  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toGoogleApiFormat(event, color)),
  }).then();

const buildHttpRequest = (json: string, boundary: string) =>
  `--${boundary}
Content-Type: application/http

POST https://www.googleapis.com/calendar/v3/calendars/primary/events
Content-Type: application/json
Content-Length: ${json.length}

${json}

`;

export const batchCreateEvents = (events: { event: CsvEvent; color: Color }[], token: string): Promise<void> => {
  const max = 50;
  if (events.length > max)
    return Promise.all([
      batchCreateEvents(events.slice(0, max), token),
      batchCreateEvents(events.slice(max), token),
    ]).then();

  // Build batch request
  const boundary = 'BOUNDARY';
  return fetch('https://www.googleapis.com/batch/calendar/v3/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/mixed;  boundary=${boundary}`,
    },
    body:
      events
        .map(({ event, color }) => toGoogleApiFormat(event, color))
        .map((event) => JSON.stringify(event))
        .map((json) => buildHttpRequest(json, boundary))
        .join('') + `--${boundary}--`,
  })
    .then((res) => console.log(res))
    .catch(console.error);
};
