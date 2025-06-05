import moment from "moment-jalaali";

// Configure moment-jalaali
moment.loadPersian({ usePersianDigits: true });

export class PersianCalendar {
  /**
   * Get current Persian date and time formatted
   */
  static now(): string {
    return moment().format("jYYYY/jMM/jDD - HH:mm");
  }

  /**
   * Get Persian date for a specific number of days ago
   */
  static daysAgo(days: number): string {
    return moment().subtract(days, "days").format("jYYYY/jMM/jDD - HH:mm");
  }
}

export default PersianCalendar;
