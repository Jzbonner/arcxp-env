import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

const createBaseGallery = (elements = [], states = {}) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex,
  } = states;
  let isWindowMobile = false;
  let galleryData = null;

  if (window.innerWidth <= 1023) isWindowMobile = true;

  const desktopCaptionData = [];

  if (elements) {
    galleryData = elements.map((element, i) => {
      let isFocused = false;
      const {
        url, copyright, caption, alt, credits, width,
      } = element || {};
      const { by } = credits || {};

      if (currentIndex === i) isFocused = true;

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

      return (
        <GalleryItem data={galleryItem} key={`gallery-item-${url}`} />
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
