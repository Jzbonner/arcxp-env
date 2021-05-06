import resizer from '../resizer';
import setFocalCoords from './setFocalCoords';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes, squareImageSize, useSquareImageAfter, isGalleryFetch = false) => {
  let isGallery = isGalleryFetch;
  const addResizedData = (elsToFetch) => {
    const imageQueries = [];
    const originalEls = elsToFetch;
    elsToFetch.forEach((el, i) => {
      const {
        url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties, focal_point: rootFocalPoint,
      } = el || {};
      const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);
      let finalWidth = width;
      let finalHeight = height;
      if (squareImageSize && i >= useSquareImageAfter) {
        finalWidth = squareImageSize;
        finalHeight = squareImageSize;
      }

      imageQueries.push({
        src: url,
        height: finalHeight,
        width: finalWidth,
        srcSetSizes,
        originalHeight,
        originalWidth,
        focalCoords,
      });
    });

    const imageResponses = resizer.fetch({
      srcArray: imageQueries,
      arcSite,
      isGallery,
    });

    if (imageResponses.length) {
      imageResponses.forEach((img, i) => {
        originalEls[i].useSrcSet = useSrcSet;
        originalEls[i].resized_obj = img || null;
      });
    }

    return originalEls;
  };

  const imagesToFetch = [];

  if (apiData && apiData.type === 'gallery') {
    const newGallData = apiData;
    const { content_elements: newContentElements = [] } = newGallData;
    isGallery = true;
    newContentElements.forEach((el) => {
      imagesToFetch.push(el);
    });

    const fetchedImages = addResizedData(imagesToFetch);

    fetchedImages.forEach((fetchedImageObj, e) => {
      if (fetchedImageObj) {
        newGallData.content_elements[e] = fetchedImageObj;
      }
    });
    return newGallData;
  }

  if (apiData && apiData.length) {
    const newArrData = apiData;

    newArrData.forEach((el) => {
      const imageEl = el.teaseImageObject || el;
      imagesToFetch.push(imageEl);
    });

    const fetchedImages = addResizedData(imagesToFetch);

    fetchedImages.forEach((fetchedImageObj, e) => {
      if (fetchedImageObj) {
        newArrData[e].teaseImageObject = fetchedImageObj;
      }
    });
    return newArrData;
  }

  return apiData;
};
