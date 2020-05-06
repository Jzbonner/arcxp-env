export default function prioritizeThumbnail(baseElements, refId) {
  const newBaseGallery = [...baseElements];
  let thumbnailData = null;

  baseElements.forEach((element, i) => {
    if (!thumbnailData && element._id === refId) thumbnailData = { content: { ...element }, index: i };
  });

  if (thumbnailData) {
    newBaseGallery.splice(thumbnailData.index, 1);
    newBaseGallery.unshift(thumbnailData.content);
  }

  return newBaseGallery;
}
