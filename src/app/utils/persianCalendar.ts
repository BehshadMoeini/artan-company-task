import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

export const getCurrentPersianDate = (): string => {
  return moment().format("jYYYY/jMM/jDD");
};

export const getCurrentPersianDateTime = (): string => {
  return moment().format("jYYYY/jMM/jDD - HH:mm");
};

export const formatToPersianDate = (date: Date | string): string => {
  return moment(date).format("jYYYY/jMM/jDD");
};

export const getPersianDayName = (date: Date | string): string => {
  return moment(date).format("dddd");
};
