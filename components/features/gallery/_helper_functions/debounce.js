// resolving git issue
const debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = this;
    const args = [func, wait, immediate];
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default debounce;
