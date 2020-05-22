export default function filterDuplicateStory(baseElements, refId) {
  return baseElements.map((el) => {
    if (el.id === refId) return null;
    return el;
  });
}
