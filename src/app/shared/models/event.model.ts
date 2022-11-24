import { CalendarEventAction, CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

export class EgretCalendarEvent implements CalendarEvent {
  _id?: string;
  start: Date;
  end?: Date;
  title: string;
  color?: {
    primary: string;
    secondary: string;
  };
  location: string;
  actions?: CalendarEventAction[];
  draggable?: boolean;

  constructor(data?) {
    data = data || {};
    this.start = new Date(data.start) || startOfDay(new Date());
    this.end = data.end ? new Date(data.end) : null;
    this._id = data._id || '';
    this.title = data.title || '';
    this.location = data.location || '';
    this.color = {
      primary: data.color && data.color.primary || '#247ba0',
      secondary: data.color && data.color.secondary || '#D1E8FF'
    };
    this.draggable = data.draggable || true;

    this.actions = data.actions || [];
  }
}
