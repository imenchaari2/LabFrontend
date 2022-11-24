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

export class CalendarEventDB {
  private colors: any = {
    red: {
      primary: '#f44336',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#247ba0 ',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#ffd97d',
      secondary: '#FDF1BA'
    }
  };

  public events:  any[] = [{
    _id: '100',
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: this.colors.red
  }, {
    _id: '101',
    startDate: '2022-02-02',
    endDate: endOfDay(new Date()),
    title: 'An event with no end date',
    color: this.colors.yellow
  },
    {
    _id: '102',
    startDate: subDays(endOfMonth(new Date()), 3),
    endDate: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: this.colors.blue
  },
    {
    _id: '103',
    startDate: addHours(startOfDay(new Date()), 2),
    endDate: new Date(),
    title: 'A draggable and resizable event',
    color: this.colors.yellow,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }];
}
