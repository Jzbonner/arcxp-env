export default function prioritizeThumbnail(baseElements, refId) {
  // if (!baseElements.content_elements) return null;
  const newBaseGallery = [...baseElements];
  let thumbnailData = null;

  baseElements.forEach((element, i) => {
    if (!thumbnailData && element._id === refId) {
      thumbnailData = { content: { ...element }, index: i };
      console.log('thumbnail data', thumbnailData);
    }
  });

  if (thumbnailData) {
    newBaseGallery.splice(thumbnailData.index, 1);
    newBaseGallery.unshift(thumbnailData.content);
  }

  console.log('new new gallery', newBaseGallery);
  return newBaseGallery;
}
