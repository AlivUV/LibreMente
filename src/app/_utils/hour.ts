export default class Hour {
  private value: number;
  public constructor(value: number) {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }

  public getString(): string {
    return this.value < 10 ? `0${this.value}:00` : `${this.value}:00`;
  }
}

export function getColombianHour() {
  let colombianHour = new Date().getUTCHours() - 5;
  if (colombianHour < 0) colombianHour = 24 + colombianHour;
  return colombianHour;
}
export function localHourToTimestamps(hour: number, ISODate: string) {
  const date = new Date(ISODate);
  const localHour = hour + 5 - date.getTimezoneOffset() / 60;
  date.setHours(localHour);
  const startTimestamp = date.getTime() / 1000;
  date.setHours(localHour + 1);
  const endTimestamp = date.getTime() / 1000;
  return { startTimestamp: startTimestamp, endTimestamp: endTimestamp };
}
