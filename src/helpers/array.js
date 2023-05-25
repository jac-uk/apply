/**
 * Get difference between two arrays
 * 
 * @param {array} arr1
 * @param {array} arr2
 * @returns {array}
 */
const difference = (arr1, arr2) => {
  return arr1.filter(item => !arr2.includes(item));
};

export {
  difference
};
