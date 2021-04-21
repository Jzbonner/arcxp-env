import resizer from '../resizer';
import setFocalCoords from './setFocalCoords';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes) => {
  const addResizedData = (el) => {
    const {
      url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties, focal_point: rootFocalPoint,
    } = el || {};
    const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);
    const newEl = el;

    if (!url) return newEl;

    const img = resizer.fetch({
      src: url,
      height,
      width,
      srcSetSizes,
      originalHeight,
      originalWidth,
      focalCoords,
      arcSite,
    });

    newEl.useSrcSet = useSrcSet;
    newEl.resized_obj = img || null;
    return newEl;
  };

  if (apiData && apiData.length) {
    const newArrData = apiData;
    newArrData.forEach((el, e) => {
      if (el.teaseImageObject) {
        newArrData[e].teaseImageObject = addResizedData(el.teaseImageObject);
      }
    });
    return newArrData;
  }

  if (apiData && apiData.type === 'gallery') {
    const newGallData = apiData;
    const { content_elements: newContentElements = [] } = newGallData;
    newContentElements.forEach((el, e) => {
      newGallData.content_elements[e] = addResizedData(el);
    });
    return newGallData;
  }

  return apiData;
};
