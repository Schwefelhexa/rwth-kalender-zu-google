export const parseUrlFragment = (): { [key: string]: string } =>
  window.location.hash
    .substr(1)
    .split('&')
    .reduce<{ [key: string]: string }>((all, pair) => ({ ...all, [pair.split('=')[0]]: pair.split('=')[1] }), {});

export const setQueryParameters = (url: string, params: { [key: string]: string }): string =>
  url +
  '?' +
  Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
