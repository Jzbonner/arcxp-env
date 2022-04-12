// organizes element array, where last element is right before the first
// VISIBLE GALLERY = |semi-last ,last, [first], second, third...|
const reorganizeElements = (arr = []) => {
  const elemArray = [...arr];
  const middle = Math.floor(elemArray.length / 2);
  const temp = [];

  for (let i = elemArray.length - 1; i >= 0; i -= 1) {
    if (i > middle) {
      temp.unshift(elemArray[i]);
    }
  }

  for (let i = 0; i < elemArray.length; i += 1) {
    if (i <= middle) {
      temp.push(elemArray[i]);
    }
  }
  // debugger;
  return temp;
};

export default reorganizeElements;
