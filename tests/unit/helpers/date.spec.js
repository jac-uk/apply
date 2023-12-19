import * as dateHelper from '@/helpers/date';
import { vi } from 'vitest';

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
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    expect(dateHelper.isDateInFuture(date)).toBe(true);
  });

  it('returns false if date is in the past', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);

    expect(dateHelper.isDateInFuture(date)).toBe(false);
  });

  it('returns false if date is null', () => {
    expect(dateHelper.isDateInFuture(null)).toBe(false);
  });
});

describe('helpers/date/formatDate', () => {
  it('throws an error if the value passed is not an instance of Date', () => {
    expect(() => dateHelper.formatDate('string')).toThrow();
  });

  it('returns null if date is null', () => {
    expect(dateHelper.formatDate(null)).toBe(null);
  });

  it('returns date in format "dd month year" if `type` is not passed', () => {
    expect(dateHelper.formatDate(new Date('Fri Mar 01 2013 00:00:00 GMT+0000 (Greenwich Mean Time)'))).toBe('1 March 2013');
  });

  it.skip('returns date in 12-hour time format "hh:mm am/pm" if `type` is equal to "time"', () => {
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

describe('helpers/date/isToday', () => {
  it('returns null if value is null', () => {
    expect(dateHelper.isToday(null)).toBe(null);
  });

  it('returns null if value is not a number', () => {
    expect(dateHelper.isToday('one thousand eighty four')).toBe(null);
  });

  it('returns true if date is today', () => {
    expect(dateHelper.isToday(new Date())).toBeTruthy();
  });

  it('returns false if date is in the past', () => {
    expect(dateHelper.isToday(new Date(1999, 1, 1))).toBeFalsy();
  });

  it('returns false if date is one day in the future', () => {
    const testDate = new Date();
    testDate.setDate(testDate.getDate + 1);
    expect(dateHelper.isToday(testDate)).toBeFalsy();
  });

  it('returns false if date is one day in the past', () => {
    const testDate = new Date();
    testDate.setDate(testDate.getDate - 1);
    expect(dateHelper.isToday(testDate)).toBeFalsy();
  });

  it('returns false if date is in the future', () => {
    expect(dateHelper.isToday(new Date(2040, 1, 1))).toBeFalsy();
  });
});

describe('helpers/date/helperTimeLeft', () => {
  const minutesAgo = (minutes) => new Date(Date.now() - (minutes * 60 * 1000));
  beforeAll(() => {
    vi.spyOn(Date, 'now').mockImplementation(() => (new Date(2021, 4, 4)).getTime()); // mock Date.now()
  });
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('returns 0 if value is empty', () => {
    expect(dateHelper.helperTimeLeft()).toBe(0);
  });

  it('returns 0 if value is null', () => {
    expect(dateHelper.helperTimeLeft()).toBe(0);
  });

  it('returns 0 if value is object without duration', () => {
    expect(dateHelper.helperTimeLeft({ something: 'goes here' })).toBe(0);
  });

  it('returns time remaining in milliseconds', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
    })).toBe(30 * 60 * 1000);
  });

  it('returns time remaining since test was started', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(20),
      },
    })).toBe(10 * 60 * 1000);
  });

  it('is not effected by zero client time difference', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(20),
      },
      lastUpdated: minutesAgo(5),
      lastUpdatedClientTime: minutesAgo(5),
    })).toBe(10 * 60 * 1000);
  });

  it('correctly adjusts time remaining when client time is ahead of server', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(20),
      },
      lastUpdated: minutesAgo(10),
      lastUpdatedClientTime: minutesAgo(5),  // => client time is 5 minutes ahead of server
    })).toBe(15 * 60 * 1000);
  });

  it('correctly adjusts time remaining when client time is behind server', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(20),
      },
      lastUpdated: minutesAgo(5),
      lastUpdatedClientTime: minutesAgo(10),  // => client time is 5 minutes behind server
    })).toBe(5 * 60 * 1000);
  });

  it('returns zero if a test is just out of time', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(30),
      },
    })).toBe(0);
  });

  it('returns zero if a test is way out of time', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(60),
      },
    })).toBe(0);
  });

  it('returns zero if a test is just out of time (with zero client time difference)', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(30),
      },
      lastUpdated: minutesAgo(5),
      lastUpdatedClientTime: minutesAgo(5),
    })).toBe(0);
  });

  it('returns zero if a test is just out of time (with client time ahead of server)', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(35),
      },
      lastUpdated: minutesAgo(10),
      lastUpdatedClientTime: minutesAgo(5),  // => client is 5 minutes ahead of server
    })).toBe(0);
  });

  it('returns zero if a test is just out of time (with client time behind server)', () => {
    expect(dateHelper.helperTimeLeft({
      duration: {
        testDurationAdjusted: 30,
      },
      statusLog: {
        started: minutesAgo(25),
      },
      lastUpdated: minutesAgo(5),
      lastUpdatedClientTime: minutesAgo(10),  // => client is 5 minutes behind server
    })).toBe(0);
  });
});
