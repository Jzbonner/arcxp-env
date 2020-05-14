import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

const createBaseGallery = (elements = [], states = {}, isWindowMobile, funcs = {}) => {
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
      const { affiliation, by } = credits || {};

      if (currentIndex === i) isFocused = true;

      isNext = (i === 1);
      isPrev = (i === elements.length - 1);
      const lastItemClass = i === elements.length - 1 ? ' last-item-height-fix' : '';

      const galleryItem = {
        url,
        alt,
        by,
        width,
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
          key={`gallery-item-${url}`}
          data={galleryItem}
          func={functionToPass}
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
