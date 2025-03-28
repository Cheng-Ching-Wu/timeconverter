class TimeConverter {
  private timezone: string; // 時區設定

  constructor(timezone: string = 'Asia/Taipei') {
    this.timezone = timezone;
  }

  // 輸入格式判斷
  private detectInputType(time: any): string {
    // 判斷 time 的類型，例如：'iso', 'timestamp', 'date'
    if (typeof time === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(time)) {
      return 'iso';
    } else if (typeof time === 'number') {
      return 'timestamp';
    } else if (time instanceof Date) {
      return 'date';
    } else {
      return 'unknown';
    }
  }

  // 將時間轉換為 Date 物件
  private convertToDate(time: any, inputType?: string): Date {
    if (!inputType) {
      inputType = this.detectInputType(time);
    }

    switch (inputType) {
      case 'iso':
        return new Date(time);
      case 'timestamp':
        return new Date(time * 1000); // 假設是秒級時間戳
      case 'date':
        return time;
      default:
        throw new Error('Unsupported input format');
    }
  }

  // 格式化時間
  format(time: any, format: string, locale: string = 'zh-TW'): string {
    const date = this.convertToDate(time);

    const options: Intl.DateTimeFormatOptions = {
      year: format.includes('Y') ? 'numeric' : undefined,
      month: format.includes('M') ? 'numeric' : undefined,
      day: format.includes('D') ? 'numeric' : undefined,
      hour: format.includes('H') ? 'numeric' : undefined,
      minute: format.includes('m') ? 'numeric' : undefined,
      second: format.includes('s') ? 'numeric' : undefined,
      timeZone: this.timezone,
    };

    return date.toLocaleDateString(locale, options);
  }

  // 計算時間差
  timeDiff(time1: any, time2: any, unit: string = 'seconds'): number {
    const date1 = this.convertToDate(time1);
    const date2 = this.convertToDate(time2);
    const diff = date2.getTime() - date1.getTime();

    switch (unit) {
      case 'seconds':
        return diff / 1000;
      case 'minutes':
        return diff / (1000 * 60);
      case 'hours':
        return diff / (1000 * 60 * 60);
      case 'days':
        return diff / (1000 * 60 * 60 * 24);
      default:
        return diff / 1000;
    }
  }

  // 判斷是否為閏年
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }
}

export default TimeConverter;