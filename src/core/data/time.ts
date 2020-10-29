/**
 * Takes a date and a time and transforms it to an RFC3339 DateTime
 * @param date Date in the format `dd.mm.yyyy`
 * @param time Time in the format `HH:MM`
 * @param offset UTC time zone offset in hours
 */
export const toRFC3339 = (date: string, time: string, offset: number): string => {
  const [day, month, year] = date.split('.');
  const [hour, minute] = time.split(':');

  const offsetStr = offset !== 0 ? `${offset > 0 ? '+' : '-'}${Math.abs(offset).toString(10).padStart(2, '0')}` : 'Z';

  return `${year}-${month}-${day}T${hour}:${minute}:00.00${offsetStr}`;
};
