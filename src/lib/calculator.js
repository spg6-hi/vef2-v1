/**
 * Stats for a given set of numbers. All numbers are rounded to at max 4 decimals
 * @typedef {object} Stats
 * @property {number} sum - sum of the set
 * @property {number | undefined} min - min of the set or undefined if empty set
 * @property {number | undefined} max - max of the set or undefined if empty set
 * @property {number | undefined} range - range of the set or undefined if empty set
 * @property {number | undefined} mean - mean of the set or undefined if empty set
 * @property {number | undefined} variance - variance of the set or undefined if empty set
 * @property {number | undefined} median - median of the set or undefined if empty set
 * @property {number | undefined} standardDeviation - Standard deviation of the set or undefined if empty set
 */

function calculateMedian(numbers) {
  const sorted = numbers.sort();
  const len = numbers.length;

  // even number in set
  if (len > 0 && len % 2 === 0) {
    const a = sorted[len / 2 - 1];
    const b = sorted[len / 2];
    return (a + b) / 2;
  }

  // odd number
  return numbers[(len + 1) / 2 - 1];
}

function round(num) {
  return +num.toFixed(4);
}

/**
 * Calulates statistics for given numbers and returns a Stats object
 * @param {numbers[]} numbers Array of numbers to calculate stats for
 * @returns {Stats | null} Stats for the number set or null if invalid input
 */
export function calculate(numbers) {
  if (!Array.isArray(numbers)) {
    return null;
  }

  // If there is at least one item in the array that isn't a number—throw it all away
  if (!numbers.every((i) => typeof i === 'number')) {
    return null;
  }

  // Special case for empty set
  if (numbers.length === 0) {
    return {
      sum: 0,
      min: undefined,
      max: undefined,
      range: undefined,
      mean: undefined,
      variance: undefined,
      median: undefined,
      standardDeviation: undefined,
    };
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const range = max - min;
  const mean = round(sum / numbers.length);
  const median = round(calculateMedian(numbers));

  const ss = numbers.reduce((a, b) => (b - mean) ** 2 + a, 0);

  const variance = round(ss / (numbers.length - 1));

  const standardDeviation = round(Math.sqrt((1 / (numbers.length - 1)) * ss));

  return {
    sum,
    min,
    max,
    range,
    mean,
    variance,
    median,
    standardDeviation,
  };
}
