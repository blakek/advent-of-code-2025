export enum SortDirection {
  Ascending,
  Descending,
}

export function sortNumbers(
  numbers: Iterable<number>,
  direction: SortDirection = SortDirection.Ascending
): number[] {
  const comparator =
    direction === SortDirection.Ascending
      ? (a: number, b: number) => a - b
      : (a: number, b: number) => b - a;

  return [...numbers].sort(comparator);
}
