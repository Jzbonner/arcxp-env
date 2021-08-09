export default (data = [], length, isInnerData = false) => {
  let counter = 0;
  let pagesData;
  if (isInnerData) {
    pagesData = data;
  } else {
    pagesData = data?.pages || [];
  }
  pagesData.forEach((page) => {
    if (!page.title) {
      counter += 1;
    }
  });

  if ((length - counter) >= 5) {
    return false;
  }
  return true;
};
