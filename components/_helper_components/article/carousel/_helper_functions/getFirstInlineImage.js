export default function getFirstInlineImage(inlineContentElements) {
  let inlineImage = null;

  inlineContentElements.forEach((el) => {
    if (!inlineImage && el.type && el.type === 'image' && el.url) inlineImage = el.url;
  });

  return inlineImage;
}
