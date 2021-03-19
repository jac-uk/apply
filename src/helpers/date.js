const isDate = (date) => date instanceof Date;

const isDateInFuture = (date) => {
  if (date == null){
    return false;
  } else if (!isDate(date)) {
    throw `Supplied date (${date}) must be a Date object`;
  }

  const today = new Date();

  date = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
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

  if (type && type === 'month') {
    return `${month} ${date.getFullYear()}`;
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
  /*
    obj: {
      duration: {
        testDurationAdjusted: minutes
      },
      statusLog {
        completed: timestamp,
        started: timestamp,
    }
  */
  if (obj) {
    // if (obj.statusLog && obj.statusLog.completed) {
    //   return 0;
    // }
    if (obj.duration) {
      const minute = 60 * 1000;
      const duration = obj.duration.testDurationAdjusted;
      const startTime = obj.statusLog && obj.statusLog.started;

      if (startTime === null || startTime === undefined) {
        return duration * minute;
      }
      const endTime = new Date(startTime.getTime() + duration * minute);
      if (endTime < Date.now()) {
        return 0;
      }
      return (endTime - Date.now());
    }
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

export {
  isDate,
  isDateInFuture,
  formatDate,
  parseEstimatedDate,
  validateYear,
  isToday,
  helperTimeLeft,
  validateFinancialYear
};
