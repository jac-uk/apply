/**
 * Get difference between two arrays
 *
 * @param   {array} arr1
 * @param   {array} arr2
 * @returns {array}
 */
const difference = (arr1, arr2) => {
  return arr1.filter(item => !arr2.includes(item));
};

/**
 * Transform new value if there is a match of target value
 *
 * Use case: vue watcher
 * e.g.
 * watch: {
 *   selectedList(newValue, oldValue) {
 *     this.selectedList = transformOnSelection(newValue, oldValue, 'prefer-not-to-say');
 *   }
 * }
 *
 * @param   {array}  newValue
 * @param   {array}  oldValue
 * @param   {string} targetValue
 * @returns {array|object}
 */
const transformOnSelection = (newValue, oldValue, targetValue) => {
  // ensure both are array and not the same
  if (
    Array.isArray(newValue) &&
    Array.isArray(oldValue) &&
    JSON.stringify(newValue) !== JSON.stringify(oldValue)
  ) {
    if (newValue.length > oldValue.length) {
      const newSelectedItems = difference(newValue, oldValue);
      if (newSelectedItems.includes(targetValue)) {
        return [targetValue];
      } else {
        return newValue.filter(x => x !== targetValue);
      }
    }
  }
  // return original new value
  return newValue;
};

/**
 * Check if there is a gap in the array
 * eg
 * 2,2,3 => false
 * 1,2,4 => true
 * @param   {array}  arr
 * @returns {boolean}
 */
const isGapInIntegers = (arr) => {
  arr.sort((a, b) => a - b); // Sort the array in ascending order
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] - arr[i] > 1) {
      return true; // Gap found
    }
  }
  return false;
};

export {
  difference,
  transformOnSelection,
  isGapInIntegers
};
