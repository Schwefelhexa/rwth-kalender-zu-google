import Color from '../model/Color';

export const getEventColors = (token: string): Promise<Color[]> =>
  fetch('https://www.googleapis.com/calendar/v3/colors', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json() as Promise<{ event: { [key: string]: Color } }>)
    .then((json) =>
      Object.keys(json.event).reduce<Color[]>((arr, key) => [...arr, { ...json.event[key], id: key }], [])
    );
