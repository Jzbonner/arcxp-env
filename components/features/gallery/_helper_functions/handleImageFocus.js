// resolving git issue
import React from 'react';
import GalleryItem from '../../../_helper_components/global/gallery/galleryItem.jsx';

// adds focus class to current gallery-item element
const handleImageFocus = (arr = [], states = {}) => {
  const {
    isStickyVisible, isMobile, isCaptionOn, currentIndex,
  } = states;

  const finalElements = arr.map((element) => {
    const elementItemData = { ...element.props.data };
    const parentStates = {
      isStickyVisible,
      isMobile,
      isCaptionOn,
    };

    elementItemData.states = { ...parentStates };

    elementItemData.states.isFocused = (currentIndex === element.props.data.index);

    return (
      <GalleryItem data={elementItemData} key={`gallery-item-${elementItemData.url}`} />
    );
  });

  return finalElements;
};

export default handleImageFocus;
