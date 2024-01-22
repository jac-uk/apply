const isDate = (date) => date instanceof Date;

const isDateInFuture = (date) => {
  if (date == null){
    return false;
  } else if (!isDate(date)) {
    throw `Supplied date (${date}) must be a Date object`;
  }
  const today = Date.now();

  date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );

  return date > today;
};

const formatDate = (date, type) => {
  if (date == null) {
    return null;
  } else if (!isDate(date)) {
    throw `Supplied date (${date}) must be a Date object`;
  }

  if (type && type === 'time') {
    return date.toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric' }).toLowerCase();
  }

  const month = date.toLocaleString('en-GB', { month: 'long' });
  const hour = date.toLocaleString('en-GB', { hour: 'numeric', hour12: true }).toLowerCase();

  if (type && type === 'month') {
    return `${month} ${date.getFullYear()}`;
  }

  if (type && type === 'hour') {
    return `${hour} on ${date.getDate()} ${month} ${date.getFullYear()}`;
  }

  return `${date.getDate()} ${month} ${date.getFullYear()}`;
};

const parseEstimatedDate = (value) => {
  if (isDate(value)) {
    return value;
  }

  if (typeof value != 'string') {
    return;
  }
  const parts = value.split('-');

  const [year, month, day] = [...parts, 1];
  const date = new Date(Date.UTC(year, month - 1, day));

  return date;
};

const validateYear = (val) => {
  val = parseInt(val);

  if (isNaN(val) || val.toString().length !== 4) {
    return null;
  }

  return val;
};

const isToday = (val) => {
  if (!isDate(val)){
    return null;
  }

  const today = new Date();
  return val.getDate() === today.getDate() &&
    val.getMonth() === today.getMonth() &&
    val.getFullYear() === today.getFullYear();
};

const helperTimeLeft = (obj) => {
  // TODO this helper is specific to QTs, consider moving to a different helper library
  /*
    obj: {
      duration: {
        testDurationAdjusted: minutes
      },
      statusLog {
        completed: timestamp,
        started: timestamp,
        reset: timestamp,
      },
      lastUpdated: timestamp,
      lastUpdatedClientTime: timestamp (from local time)
    }
  */
  if (obj && obj.duration) {
    const minute = 60 * 1000;
    const duration = obj.duration.testDurationAdjusted;
    const startTime = obj.statusLog && obj.statusLog.started;

    if ((startTime === null || startTime === undefined) || (obj.statusLog.reset > obj.statusLog.started)) {
      return duration * minute;
    }

    let serverOffset = 0;
    if (obj.lastUpdated && obj.lastUpdatedClientTime) {
      serverOffset = obj.lastUpdated.getTime() - obj.lastUpdatedClientTime.getTime();
    }

    const endTime = new Date(startTime.getTime() + (duration * minute)).getTime();
    const now = new Date(Date.now() + serverOffset).getTime();
    const timeRemaining = endTime - now;
    return timeRemaining > 0 ? timeRemaining : 0;
  } else {
    return 0;
  }
};

const validateFinancialYear = (value) => {
  const years = value.split('/');
  if (years.length !== 2 || years[0].length !== 4 || years[1].length !== 4) {
    return false;
  }
  const date1 = Array.from(String(years[0]), Number);
  const date2 = Array.from(String(years[1]), Number);
  if (date1.includes(NaN) || date2.includes(NaN)) {
    return false;
  } else {
    if (years[0] === years[1] || years[0] > years[1]) {
      return false;
    }
  }
  return true;
};

/**
 * Get dates between two dates
 * Optionally specify a step size (in days)
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} steps
 * @returns
 */
const dateRange = (startDate, endDate, steps = 1) => {
  const dateArray = [];
  const currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
  return dateArray;
};

export {
  isDate,
  isDateInFuture,
  formatDate,
  parseEstimatedDate,
  validateYear,
  isToday,
  helperTimeLeft,
  validateFinancialYear,
  dateRange
};
