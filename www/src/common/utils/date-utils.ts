import moment from "moment";

export function formatDate(date: Date | number | string, format: DateFormats, isNano?: boolean): string {
  if (date instanceof Date || Number(date)) {
    return moment(date).format(format);
  }
  return "";
}

export enum DateFormats {
  DateOnly = "YYYY-MM-DD",
  DateTimeAmPm = "YYYY-MM-DD  hh:mm a",
  DateTimeMillis = "YYYY-MM-DD  hh:mm:ss.SSS"
}
