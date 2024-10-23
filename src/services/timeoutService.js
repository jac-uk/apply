// src/services/timeoutService.js

let countdownTimer = null;    // Holds the setTimeout reference
let countdownInterval = null; // Holds the setInterval reference
let timeLeft = 30;            // Time left in seconds
let timerActive = false;      // Flag to indicate if the timer is running

// Function to start the 30-second timeout
const startTimeout = (displayCallback, timeoutCallback) => {
  // Clear any existing timeout and interval
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);

  // Reset the time left to 30 seconds
  timeLeft = 30;
  timerActive = true; // Set timer as active

  // Start the interval to update the countdown display every second
  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      displayCallback(timeLeft); // Always call displayCallback while active
    } else {
      clearInterval(countdownInterval); // Stop the interval when time is up
    }
  }, 1000);

  // Start the 30-second timeout
  countdownTimer = setTimeout(() => {
    clearInterval(countdownInterval); // Stop updating when the timeout is done
    timerActive = false; // Set timer as inactive
    displayCallback(0); // Show 0 when timeout completes
    console.log('Timeout completed!');
    if (timeoutCallback) timeoutCallback(); // Call the timeout callback if provided
  }, 30000); // 30 seconds
};

// Function to reset the timeout (and start again)
const resetTimeout = (displayCallback, timeoutCallback) => {
  console.log('Resetting the timeout?');
  console.log(`timerActive: ${timerActive}`);
  if (timerActive) { // Only reset if the timer is active
    startTimeout(displayCallback, timeoutCallback);
  }
};

// Function to get the current value of the remaining time
const getTimeLeft = () => {
  return timeLeft;
};

// Function to clear the timeout and stop the countdown
const clearTimeoutAndInterval = () => {
  clearTimeout(countdownTimer);
  clearInterval(countdownInterval);
  timerActive = false; // Set timer as inactive
  console.log('Timeout and countdown cleared.');
};

// Function to add event listeners to reset the timeout
const addEventListeners = (displayCallback, timeoutCallback) => {
  const handleEvent = () => {
    console.log('Mouse moved or window clicked.');
    resetTimeout(displayCallback, timeoutCallback); // Reset timeout on event
  };

  // Add both mouse move and click event listeners
  window.addEventListener('mousemove', handleEvent);
  window.addEventListener('click', handleEvent);
  window.addEventListener('keydown', handleEvent);
  window.addEventListener('scroll', handleEvent);

  // Return a function to remove the event listeners
  return () => {
    window.removeEventListener('mousemove', handleEvent);
    window.removeEventListener('click', handleEvent);
    window.removeEventListener('keydown', handleEvent);
    window.removeEventListener('scroll', handleEvent);
    console.log('Mouse move and click event listeners removed.');
  };
};

export {
  startTimeout,
  resetTimeout,
  getTimeLeft,
  clearTimeoutAndInterval,
  addEventListeners
};
