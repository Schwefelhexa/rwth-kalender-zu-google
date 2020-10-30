import { toGoogleApiFormat } from '../data/event';
import Color from '../model/Color';
import CsvEvent from '../model/CsvEvent';
import GoogleApiEvent from '../model/GoogleApiEvent';

const buildBatchRequestItem = (
  url: string,
  method: 'GET' | 'POST' | 'DELETE',
  body: string | null,
  boundary: string
) => `--${boundary}
Content-Type: application/http

${method} ${url}
${
  body
    ? `
Content-Type: application/json
Content-Length: ${body.length}

${body}

`
    : ''
}`;

export const createEvent = (event: CsvEvent, color: Color, token: string): Promise<void> =>
  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(toGoogleApiFormat(event, color)),
  }).then();

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
        .map((json) =>
          buildBatchRequestItem(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            'POST',
            json,
            boundary
          )
        )
        .join('') + `--${boundary}--`,
  })
    .then((res) => console.log(res))
    .catch(console.error);
};

const getAllEventsRecursive = async (
  token: string,
  base: GoogleApiEvent[],
  nextPageToken?: string
): Promise<GoogleApiEvent[]> => {
  interface Response {
    items: GoogleApiEvent[];
    nextPageToken?: string;
  }

  const data = (await (
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=2500${
        nextPageToken ? `&pageToken=${nextPageToken}` : ''
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).json()) as Response;

  if (data.nextPageToken) return getAllEventsRecursive(token, [...base, ...data.items], data.nextPageToken);
  return [...base, ...data.items];
};
export const getAllEvents = async (token: string): Promise<GoogleApiEvent[]> => getAllEventsRecursive(token, []);

export const batchDeleteEvents = (ids: string[], token: string): Promise<void> => {
  const boundary = 'BOUNDARY';
  return fetch('https://www.googleapis.com/batch/calendar/v3/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/mixed;  boundary=${boundary}`,
    },
    body:
      ids
        .map((id) =>
          buildBatchRequestItem(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
            'DELETE',
            null,
            boundary
          )
        )
        .join('') + `--${boundary}--`,
  }).then();
};
