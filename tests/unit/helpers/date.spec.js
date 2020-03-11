import * as dateHelper from '@/helpers/date';

describe('helpers/date/isDate', () => {
  it('returns true if value passed is an instance of Date', () => {
    expect(dateHelper.isDate(new Date())).toBe(true);
  });

  it('returns false if value passed is not an instance of Date', () => {
    expect(dateHelper.isDate(null)).toBe(false);
  });
});

describe('helpers/date/isDateInFuture', () => {
  it('throws an error if the value passed is not an instance of Date', () => {
    expect(() => dateHelper.isDateInFuture('string')).toThrow();
  });

  it('returns true if date is in the future', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    expect(dateHelper.isDateInFuture(date)).toBe(true);
  });

  it('returns false if date is in the past', () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    expect(dateHelper.isDateInFuture(date)).toBe(false);
  });
});

describe('helpers/date/formatDate', () => {
  it('throws an error if the value passed is not an instance of Date', () => {
    expect(() => dateHelper.formatDate('string')).toThrow();
  });

  it('returns date in format "dd month year" if `type` is not passed', () => {
    expect(dateHelper.formatDate(new Date('Fri Mar 01 2013 00:00:00 GMT+0000 (Greenwich Mean Time)'))).toBe('1 March 2013');
  });

  it('returns date in 12-hour time format "hh:mm am/pm" if `type` is equal to "time"', () => {
    expect(dateHelper.formatDate(new Date('Fri Mar 01 2013 15:06:00 GMT+0000 (Greenwich Mean Time)'), 'time')).toBe('3:06 pm');
  });

  it('returns date in format "month year" if `type` is equal to "month"', () => {
    expect(dateHelper.formatDate(new Date('Fri Mar 01 2013 15:06:00 GMT+0000 (Greenwich Mean Time)'), 'month')).toBe('March 2013');
  });
});

describe('helpers/date/validateYear', () => {
  it('returns null if value is null', () => {
    expect(dateHelper.validateYear(null)).toBe(null);
  });

  it('returns null if value is not a number', () => {
    expect(dateHelper.validateYear('one thousand eighty four')).toBe(null);
  });

  it('returns null if length of the val is not equal to 4', () => {
    expect(dateHelper.validateYear(290)).toBe(null);
  });

  it('returns value if valid', () => {
    expect(dateHelper.validateYear(1980)).toBe(1980);
  });
});
