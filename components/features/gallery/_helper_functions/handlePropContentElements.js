export default function handlePropContentElements(contentElements) {
  console.log('handlePropContent', contentElements);
  if (!contentElements) return null;
  let relevantData = null;
  // if(Array.isArray(contentElements)) relevantData
  contentElements.forEach((element) => {
    if (element.type === 'gallery') relevantData = element;
    // if (element.type === 'image')
  });
  return relevantData;
}
