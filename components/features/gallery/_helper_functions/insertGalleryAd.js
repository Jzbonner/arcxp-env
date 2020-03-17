const insertGalleryAd = (galleryElements = [], ad = {}) => {
  const elements = [...galleryElements];

  galleryElements.forEach((element, i) => {
    if (element.props.data.states.isFocused) elements.splice(i, 0, ad());
  });

  return elements;
};

export default insertGalleryAd;
