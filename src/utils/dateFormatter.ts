import dayjs from 'dayjs';

export type DateFormat = 'DD-MM-YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss';

export type DateInput = string | Date | dayjs.Dayjs;

/**
 * Formats a given date to the specified format.
 * @param date - The date in Date, string, or dayjs format.
 * @param dateFormat - The desired format of the date.
 * @returns A formatted string.
 */
export const formatDate = (date: DateInput, dateFormat: DateFormat = 'YYYY-MM-DD HH:mm:ss'): string =>
	dayjs(date).format(dateFormat);
