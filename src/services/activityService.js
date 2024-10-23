import { USER_ACTIVITY_TIMEOUT_SECS } from '../helpers/constants';

let countdownTimer = null;
let countdownInterval = null;
const timeLeftInit = USER_ACTIVITY_TIMEOUT_SECS || 7200;  // Time left in seconds (2 hours default)
let timeLeft = timeLeftInit;
let timerActive = false;       // Flag to indicate if the timer is running
let removeEventListeners = null;

const startTimeout = (displayCallback, timeoutCallback) => {
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);

  // Reset the time left
  timeLeft = timeLeftInit;
  timerActive = true;

  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      displayCallback(timeLeft);
    } else {
      clearInterval(countdownInterval);
      timerActive = false; // Set timer as inactive when it reaches 0
    }
  }, 1000);

  // Start the timeout
  const timeoutInMilliseconds = timeLeftInit * 1000;
  countdownTimer = setTimeout(() => {
    clearInterval(countdownInterval);
    timerActive = false; // Set timer as inactive
    displayCallback(0);
    console.log('Timeout completed!');
    if (timeoutCallback) timeoutCallback();
  }, timeoutInMilliseconds);
};

const resetTimeout = (displayCallback, timeoutCallback) => {
  if (timerActive) {
    startTimeout(displayCallback, timeoutCallback);
  }
};

const getTimeLeft = () => {
  return timeLeft;
};

const clearTimeoutAndInterval = () => {
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);
  timerActive = false;
  console.log('Timeout and countdown cleared.');
};

const addEventListeners = (displayCallback, timeoutCallback) => {
  const resetOnActivity = () => {
    resetTimeout(displayCallback, timeoutCallback);
  };

  window.addEventListener('mousemove', resetOnActivity);
  window.addEventListener('keydown', resetOnActivity);
  window.addEventListener('click', resetOnActivity);
  window.addEventListener('scroll', resetOnActivity); // Add scroll event listener

  // Return a function to remove the event listeners
  return () => {
    window.removeEventListener('mousemove', resetOnActivity);
    window.removeEventListener('keydown', resetOnActivity);
    window.removeEventListener('click', resetOnActivity);
    window.removeEventListener('scroll', resetOnActivity); // Add scroll event listener

    console.log('Activity event listeners removed.');
  };
};

const startActivityMonitor = (displayCallback, timeoutCallback) => {
  console.log('Starting activity monitor...');

  // Start the timeout and add listeners
  startTimeout(displayCallback, timeoutCallback);

  // Add activity event listeners
  removeEventListeners = addEventListeners(displayCallback, timeoutCallback);
};

const stopActivityMonitor = () => {
  console.log('Stopping activity monitor...');

  // Clear the timer and interval
  clearTimeoutAndInterval();

  // Remove event listeners if they were added
  if (removeEventListeners) {
    removeEventListeners();
    removeEventListeners = null;
  }
};

export {
  startActivityMonitor,
  stopActivityMonitor,
  getTimeLeft
};
