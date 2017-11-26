/**
 *
 *
 * Function that compares two arrays
 * @param {array} arr1
 * @param {array} arr2
 * @returns {boolean} - True if arr1 is subset of arr2
 */

export default (arr1, arr2) => arr1.every(element => arr2.includes(element));
