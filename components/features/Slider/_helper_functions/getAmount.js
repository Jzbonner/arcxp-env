export default function getAmount(limit, changeAmount, currentAmount, operation) {
  if (operation === 'ADD') {
    const result = Math.abs(currentAmount) + changeAmount;

    if (limit === 0 && currentAmount === 0) {
      return result;
    }

    if (result > limit && Math.abs(currentAmount) < limit) {
      return Math.abs(limit + currentAmount);
    }

    if (result < limit) return changeAmount;

    return null;
  }

  if (operation === 'SUB') {
    if (currentAmount === 0) return null;

    const result = Math.abs(currentAmount) - changeAmount;

    if (result < 0 || result === 0) return currentAmount;
    if (result > 0) return changeAmount;
    return null;
  }

  return null;
}
