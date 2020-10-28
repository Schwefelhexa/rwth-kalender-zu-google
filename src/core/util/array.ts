/**
 * Adds `item` between all items in `array`.
 */
export const addBetween = <A, B>(array: A[], item: B): (A | B)[] =>
  array.flatMap((val, index) => (index ? [val, item] : [item, val, item]));
