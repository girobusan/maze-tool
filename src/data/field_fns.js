function isOdd(n) {
  return n % 2 == 0;
}
export function isBlack(x, y) {
  if (isOdd(x)) {
    return isOdd(y);
  }
  return !isOdd(y);
}

export const FieldSize = [10, 6];
