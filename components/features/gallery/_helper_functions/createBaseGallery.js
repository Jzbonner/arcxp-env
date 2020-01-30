import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

const createBaseGallery = (elements = [], states = {}, refHook, isWindowMobile, funcs = {}) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex,
  } = states;
  const {
    prev, next,
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
        url, copyright, caption, alt, credits, width,
      } = element || {};
      const { by } = credits || {};

      if (currentIndex === i) isFocused = true;

      isNext = (i === 1);
      isPrev = (i === elements.length - 1);

      const galleryItem = {
        url,
        alt,
        by,
        width,
        index: i,
        id: `gallery-item-${i}`,
        captionObj: {
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
        },
      };

      if (!isWindowMobile) desktopCaptionData.push(galleryItem.captionObj);

      if (isPrev) {
        functionToPass = prev;
      } else if (isNext) {
        functionToPass = next;
      }

      return (
        <GalleryItem
          refHook={i === 0 ? refHook : null}
          data={galleryItem}
          func={functionToPass}
          key={`gallery-item-${url}`}
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
