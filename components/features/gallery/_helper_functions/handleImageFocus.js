import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

// adds focus class to current gallery-item element
const handleImageFocus = (arr = [], states = {}, funcs = {}) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex, isAdVisible,
  } = states;
  const {
    prev, next,
  } = funcs;

  let prevIndex = currentIndex - 1;
  let nextIndex = currentIndex + 1;

  if (prevIndex < 0) prevIndex = maxIndex;
  if (nextIndex > maxIndex) nextIndex = 0;

  const finalElements = arr.map((element) => {
    // if it's an ad, return it
    if (element.props.adSlot) return element;

    const elementItemData = { ...element.props.data };
    const parentStates = {
      isStickyVisible,
      isMobile,
      isCaptionOn,
      isAdVisible,
    };

    let functionToPass = null;

    if (element.props.data.index === prevIndex) {
      functionToPass = prev;
    } else if (element.props.data.index === nextIndex) {
      functionToPass = next;
    }

    elementItemData.states = { ...parentStates };

    elementItemData.states.isFocused = (currentIndex === element.props.data.index);

    return (
      <GalleryItem
      data={elementItemData}
      key={`gallery-item-${elementItemData.url}`}
      func={functionToPass}
      />
    );
  });

  return finalElements;
};

export default handleImageFocus;
