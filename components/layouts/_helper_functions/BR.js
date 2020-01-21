const brContent = ['<br>', '<br/>', '</br>'];

export default (element) => {
  if (!element.content) {
    return true;
  }
  return !brContent.includes(element.content);
};
