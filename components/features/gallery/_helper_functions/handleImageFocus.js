import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

// adds focus class to current gallery-item element
const handleImageFocus = (arr = [], states = {}, funcs = {}, isEmbed) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex, isAdVisible, currentAction, hasOpened, isModalVisible,
  } = states;
  const {
    prev, next, modal, calculateTranslateX,
  } = funcs;

  let prevIndex = null;
  let nextIndex = null;

  if (currentAction === 'PREV') {
    prevIndex = currentIndex - 1;
    nextIndex = isAdVisible ? currentIndex : currentIndex + 1;
  } else {
    prevIndex = isAdVisible ? currentIndex : currentIndex - 1;
    nextIndex = currentIndex + 1;
  }

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
      hasOpened,
      isModalVisible,
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
      modalFunc={currentIndex === element.props.data.index ? modal : null}
      calculateTranslateX={calculateTranslateX}
      isEmbed={isEmbed}
      />
    );
  });

  return finalElements;
};

export default handleImageFocus;
