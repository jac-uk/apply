let countdownTimer = null;    // Holds the setTimeout reference
let countdownInterval = null; // Holds the setInterval reference
let timeLeft = 30;            // Time left in seconds
let timerActive = false;      // Flag to indicate if the timer is running
let removeEventListeners = null; // To store the reference to remove event listeners

// Function to start the 30-second timeout
const startTimeout = (displayCallback, timeoutCallback) => {
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);

  // Reset the time left to 30 seconds
  timeLeft = 30;
  timerActive = true;

  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      displayCallback(timeLeft);
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);

  countdownTimer = setTimeout(() => {
    clearInterval(countdownInterval);
    timerActive = false;
    displayCallback(0);
    console.log('Timeout completed!');
    if (timeoutCallback) timeoutCallback();
  }, 30000);
};

// Function to reset the timeout
const resetTimeout = (displayCallback, timeoutCallback) => {
  if (timerActive) {
    startTimeout(displayCallback, timeoutCallback);
  }
};

// Function to get the current value of the remaining time
const getTimeLeft = () => {
  return timeLeft;
};

// Function to clear timeout and interval
const clearTimeoutAndInterval = () => {
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);
  timerActive = false;
  console.log('Timeout and countdown cleared.');
};

// Function to add user activity event listeners
const addEventListeners = (displayCallback, timeoutCallback) => {
  const resetOnActivity = () => {
    resetTimeout(displayCallback, timeoutCallback);
  };

  window.addEventListener('mousemove', resetOnActivity);
  window.addEventListener('keydown', resetOnActivity);
  window.addEventListener('click', resetOnActivity);

  // Return a function to remove the event listeners
  return () => {
    window.removeEventListener('mousemove', resetOnActivity);
    window.removeEventListener('keydown', resetOnActivity);
    window.removeEventListener('click', resetOnActivity);
    console.log('Activity event listeners removed.');
  };
};

// Function to start the activity monitor (timer + listeners)
const startActivityMonitor = (displayCallback, timeoutCallback) => {
  console.log('Starting activity monitor...');

  // Start the timeout and add listeners
  startTimeout(displayCallback, timeoutCallback);

  // Add activity event listeners
  removeEventListeners = addEventListeners(displayCallback, timeoutCallback);
};

// Function to stop the activity monitor (clears timer + removes listeners)
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
  getTimeLeft // Include the function to get remaining time
};
