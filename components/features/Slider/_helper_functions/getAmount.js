export default function getAmount(limit, changeAmount, operation) {
  if (operation === 'ADD') {
    const result = limit + changeAmount;
    if (result > limit) {
      return Math.abs(limit - result);
    }

    if (result < limit) {
      return changeAmount;
    }
  } else if (operation === 'SUB') {
    const result = limit - changeAmount;

    if (result < 0) {
      return Math.abs(limit - result);
    }

    if (result > 0) {
      return changeAmount;
    }
  }
  return null;
}
