import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

// adds focus class to current gallery-item element
const handleImageFocus = (arr = [], states = {}, funcs = {}) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex,
  } = states;
  const {
    prev, next,
  } = funcs;

  let prevIndex = currentIndex - 1;
  let nextIndex = currentIndex + 1;

  console.log('previous index', prevIndex, 'next index', nextIndex);

  if (prevIndex < 0) prevIndex = maxIndex;
  if (nextIndex > maxIndex) nextIndex = 0;

  const finalElements = arr.map((element) => {
    const elementItemData = { ...element.props.data };
    const parentStates = {
      isStickyVisible,
      isMobile,
      isCaptionOn,
    };
    let functionToPass = null;

    if (element.props.data.index === prevIndex) {
      console.log('passing to prev');
      functionToPass = prev;
    } else if (element.props.data.index === nextIndex) {
      console.log('passing to next');
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
