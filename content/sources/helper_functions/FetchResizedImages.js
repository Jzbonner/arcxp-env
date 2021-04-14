import resizer from '../resizer';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes) => {
  if (apiData && apiData.length) {
    const addResizedData = (el) => {
      const {
        url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties,
      } = el || {};
      const { focal_point: focalPoint } = additionalProperties || {};
      const { min: focalMin = [], max: focalMax = [] } = focalPoint || {};
      const focalCoords = focalMin || focalMax || [];
      const newEl = el;

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


    const newData = apiData;
    if (newData.type === 'gallery') {
      // we treat galleries differently than other content
      const { content_elements: newContentElements } = newData;
      newContentElements.forEach((el, e) => {
        newData.content_elements[e] = addResizedData(el);
      });
      return newData;
    }

    newData.forEach((el, e) => {
      if (el.teaseImageObject) {
        newData[e].teaseImageObject = addResizedData(el.teaseImageObject);
      }
    });
    return newData;
  }
  return apiData;
};
