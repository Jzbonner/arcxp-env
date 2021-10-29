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
      if (!url) {
        imageQueries.push({});
      }
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
        if (img && originalEls[i]) {
          if (!apiData.length) console.error('dave, img', img);
          originalEls[i].useSrcSet = useSrcSet;
          originalEls[i].resized_obj = img || null;
        }
      });
    }

    return originalEls;
  };

  if (apiData && apiData.type === 'gallery') {
    const imagesToFetch = [];
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

  if (apiData) {
    const imagesToFetch = [];
    const newArrData = apiData;
    const isAnImageObject = !apiData.length;

    if (!isAnImageObject) {
      newArrData.forEach((el) => {
        const imageEl = el.teaseImageObject || el.promo_items?.basic;
        imagesToFetch.push(imageEl);
      });
    } else if (apiData.type === 'image') {
      imagesToFetch.push(apiData);
    }

    const fetchedImages = addResizedData(imagesToFetch);

    if (isAnImageObject) {
      const currImageObj = fetchedImages[0];
      return {
        credits: currImageObj.credits,
        subtitle: currImageObj.subtitle,
        width: currImageObj.width,
        height: currImageObj.height,
        caption: currImageObj.caption,
        type: currImageObj.type,
        url: currImageObj.url,
        resized_obj: currImageObj.resized_obj,
      };
    }

    fetchedImages.forEach((fetchedImageObj, e) => {
      if (fetchedImageObj) {
        newArrData[e].teaseImageObject = fetchedImageObj;
      }
    });
    return newArrData;
  }

  return apiData;
};
