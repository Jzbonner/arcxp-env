export default (data, length) => {
  let counter = 0;
  const { pages } = data;
  pages.forEach((page) => {
    if (!page.title) {
      counter += 1;
    }
  });

  if ((length - counter) >= 5) {
    return false;
  }
  return true;
};
