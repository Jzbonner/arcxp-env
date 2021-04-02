import resizer from '../resizer';

export default (arcSite, apiData, width, height, useSrcSet, srcSetSizes) => {
  if (apiData && apiData.length) {
    const newData = apiData;
    newData.forEach((el, e) => {
      if (el.teaseImageObject) {
        const {
          url, height: originalHeight, width: originalWidth, additional_properties: additionalProperties,
        } = el.teaseImageObject || {};
        const { focal_point: focalPoint } = additionalProperties || {};
        const { min: focalMin = [], max: focalMax = [] } = focalPoint || {};
        const focalCoords = focalMin || focalMax || [];

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

        newData[e].teaseImageObject.useSrcSet = useSrcSet;
        newData[e].teaseImageObject.resized_obj = img || null;
      }
    });
    return newData;
  }
  return apiData;
};
