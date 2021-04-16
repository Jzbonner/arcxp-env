import resizer from '../resizer';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes) => {
  const addResizedData = (el) => {
    const {
      url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties,
    } = el || {};
    const { focal_point: focalPoint } = additionalProperties || {};
    const { min: focalMin = [], max: focalMax = [] } = focalPoint || {};
    const focalCoords = focalMin || focalMax || [];
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
