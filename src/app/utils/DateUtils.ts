

export class DateUtils {
  public static dateInputToDate(dateInput) { // 2019-04-02
    const spl = dateInput.split('-');
    return new Date(spl[0], Number(spl[1]) - 1, spl[2], 0, 0, 0, 0);
  }


  public static dateToDateInput(date: Date) { // 2019-04-02
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return [date.getFullYear(), month, day].join('-');
  }

  public static dateTimeInputToDate(dateTimeInput) { // 2019-04-02T12:11
    let [date, time] = dateTimeInput.split('T');
    date = date.split('-');
    time = time.split(':');
    return new Date(date[0], Number(date[1]) - 1, date[2], Number(time[0]), Number(time[1]), 0, 0);
  }

  public static dateToDateTimeInput(date: Date) {
    const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    const hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const dateStr = [date.getFullYear(), month, day].join('-');
    const timeStr = [hours, minutes].join(':');
    return `${dateStr}T${timeStr}`; // 2019-04-02T12:11
  }

  public static format(date: Date) {
    const dia = date.getDate().toString(),
      diaF = (dia.length === 1) ? '0' + dia : dia,
      mes = (date.getMonth() + 1).toString(),
      mesF = (mes.length === 1) ? '0' + mes : mes,
      anoF = date.getFullYear();
    return [diaF, mesF, anoF].join('/');
  }

  public static isBiggerOrEqualCurrent(date) {
    const dateOne = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 59);
    return dateOne >= new Date();
  }
}
