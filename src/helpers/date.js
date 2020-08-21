const isDate = (date) => date instanceof Date;

const isDateInFuture = (date) => {
  // @NOTE: this is a bit silly, we should save full date instead of hardcoding the time
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
    13,
    0,
    0
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
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
  }

  const month = date.toLocaleString('en-US', { month: 'long' });

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
  if(!isDate(val)){ 
    return null;
  }
  
  const today = new Date();
  return val.getDate() === today.getDate() &&
    val.getMonth() === today.getMonth() &&
    val.getFullYear() === today.getFullYear();
};

export {
  isDate,
  isDateInFuture,
  formatDate,
  parseEstimatedDate,
  validateYear,
  isToday
};
