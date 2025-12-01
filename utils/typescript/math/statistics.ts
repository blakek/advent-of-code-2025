import { sortNumbers } from "./sort";

export function sum(numbers: Iterable<number>): number {
  let total = 0;

  for (const num of numbers) {
    total += num;
  }

  return total;
}

export function average(numbers: Iterable<number>): number {
  let total = 0;
  let count = 0;

  for (const num of numbers) {
    total += num;
    count++;
  }

  return total / count;
}

export function min(numbers: Iterable<number>): number {
  let min = Infinity;

  for (const num of numbers) {
    if (num < min) {
      min = num;
    }
  }

  return min;
}

export function max(numbers: Iterable<number>): number {
  let max = -Infinity;

  for (const num of numbers) {
    if (num > max) {
      max = num;
    }
  }

  return max;
}

export function percentile(numbers: Iterable<number>, p: number): number {
  const sortedNumbers = sortNumbers(numbers);
  const index = Math.floor((sortedNumbers.length - 1) * p);
  return sortedNumbers[index];
}
