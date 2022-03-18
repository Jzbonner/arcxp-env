export default function handlePropContentElements(contentElements) {
  if (!contentElements) return null;
  let relevantData = null;
  if (contentElements?.type === 'gallery') {
    relevantData = contentElements;
  } else {
    contentElements.forEach((element) => {
      if (element.type === 'gallery') relevantData = element;
    });
  }

  return relevantData;
}
