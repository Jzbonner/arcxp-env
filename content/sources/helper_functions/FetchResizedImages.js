import resizer from '../resizer';
import setFocalCoords from './setFocalCoords';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes, squareImageSize, useSquareImageAfter, isGalleryFetch = false) => {
  console.error('dave isGalleryFetch', isGalleryFetch);
  const addResizedData = (el, i = -1, isGallery = false) => {
    const {
      url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties, focal_point: rootFocalPoint,
    } = el || {};
    const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);
    const newEl = el;
    let finalWidth = width;
    let finalHeight = height;
    if (squareImageSize && i >= useSquareImageAfter) {
      finalWidth = squareImageSize;
      finalHeight = squareImageSize;
    }

    if (!url) return newEl;

    const img = resizer.fetch({
      src: url,
      height: finalHeight,
      width: finalWidth,
      srcSetSizes,
      originalHeight,
      originalWidth,
      focalCoords,
      arcSite,
      isGallery,
    });

    newEl.useSrcSet = useSrcSet;
    newEl.resized_obj = img || null;
    return newEl;
  };

  if (apiData && apiData.length) {
    const newArrData = apiData;
    let imageElIndex = 0;
    newArrData.forEach((el, e) => {
      console.error('dave has teaseImageObject', el, el.teaseImageObject);
      if (el.teaseImageObject) {
        newArrData[e].teaseImageObject = addResizedData(el.teaseImageObject, imageElIndex, isGalleryFetch);
        imageElIndex += 1;
      } else {
        newArrData[e].teaseImageObject = addResizedData(el, imageElIndex, isGalleryFetch);
        imageElIndex += 1;
      }
    });
    return newArrData;
  }

  if (apiData && apiData.type === 'gallery') {
    const newGallData = apiData;
    const { content_elements: newContentElements = [] } = newGallData;
    console.error('dave it is a gallery');
    newContentElements.forEach((el, e) => {
      newGallData.content_elements[e] = addResizedData(el, e, true);
    });
    return newGallData;
  }

  return apiData;
};
