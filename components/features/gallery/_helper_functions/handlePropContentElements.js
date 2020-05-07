export default function handlePropContentElements(contentElements) {
  if (!contentElements) return null;
  let relevantData = null;
  contentElements.forEach((element) => {
    if (element.type === 'gallery') relevantData = element;
  });
  return relevantData;
}
