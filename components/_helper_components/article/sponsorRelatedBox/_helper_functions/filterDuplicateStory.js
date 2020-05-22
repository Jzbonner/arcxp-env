export default function filterDuplicateStory(baseElements, refId) {
  const newBaseElements = [...baseElements];

  baseElements.forEach((el, i) => {
    if (el._id === refId) newBaseElements.splice(i, 1);
  });

  return newBaseElements;
}
