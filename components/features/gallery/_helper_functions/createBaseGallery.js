import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';
import getAltText from '../../../layouts/_helper_functions/getAltText';

const createBaseGallery = (elements = [], states = {}, isWindowMobile, funcs = {}, isEmbed = false, isPbArticle) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex, modalVisible,
  } = states;
  const {
    prev, next, modal, nonAdjacent,
  } = funcs;

  let galleryData = null;

  const desktopCaptionData = [];

  if (elements) {
    galleryData = elements.map((element, i) => {
      let isFocused = false;
      let isPrev = false;
      let isNext = false;
      let functionToPass = null;
      const {
        url, copyright, caption, focal_point: focalPoint, alt_text: alt, credits, width, height, resized_obj: resizedObject = null,
      } = element || {};

      const { affiliation, by } = credits || {};

      if (currentIndex === i) isFocused = true;

      isNext = (i === 1);
      isPrev = (i === elements.length - 1);

      const lastItemClass = i === elements.length - 1 ? ' last-item-height-fix' : '';

      const galleryItem = {
        url,
        resized_obj: resizedObject,
        alt: getAltText(alt, caption),
        focal_point: focalPoint,
        by,
        width,
        height,
        index: i,
        lastItemClass,
        id: `gallery-item-${i}`,
        captionObj: {
          affiliation,
          copyright,
          caption,
          credit: by,
          index: i,
        },
        states: {
          isFocused,
          isStickyVisible,
          isMobile,
          isCaptionOn,
          modalVisible,
        },
      };

      if (!isWindowMobile) desktopCaptionData.push(galleryItem.captionObj);

      if (isPrev) {
        functionToPass = prev;
      } else if (isNext) {
        functionToPass = next;
      } else {
        functionToPass = nonAdjacent;
      }

      return (
        <GalleryItem
          key={`gallery-item-${url}`}
          data={galleryItem}
          func={functionToPass}
          modalFunc={isFocused ? modal : null}
          isEmbed={isEmbed}
          isPbArticle={isPbArticle}
        />
      );
    });
  } else {
    return null;
  }


  return {
    galleryData,
    desktopCaptionData,
  };
};

export default createBaseGallery;
