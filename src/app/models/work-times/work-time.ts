export interface WorkTime {
  id: string;
  startTime: string;
  endTime: string;
  day: DayOfWeek;
}

export enum DayOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
