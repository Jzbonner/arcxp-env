const insertGalleryAd = (galleryElements = [], ad = {}) => {
  const elements = [...galleryElements];
  console.log('starting elements', elements);

  galleryElements.forEach((element, i) => {
    if (element.props.data.states.isFocused) elements.splice(i, 0, ad());
  });
  console.log('ad inserted', elements);
  return elements;
};

export default insertGalleryAd;
