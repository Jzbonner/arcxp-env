const getFinalDimensionsForGalleryImages = (isEmbed, isWidth, isPbArticle) => {
  if (isEmbed && typeof window !== 'undefined') {
    if (isWidth) {
      if (window.innerWidth > 1023 && isPbArticle) {
        return 647;
      }

      if (window.innerWidth > 1023 && !isPbArticle) {
        return 405;
      }

      if (window.innerWidth < 1023 && window.innerWidth > 768) {
        return 730;
      }

      if (window.innerWidth < 768) {
        return 350;
      }
    }

    // if isWidth is falsy, then we'll calculate height..

    if (window.innerWidth > 1023 && isPbArticle) {
      return 393;
    }

    if (window.innerWidth > 1023 && !isPbArticle) {
      return 263;
    }

    if (window.innerWidth < 1023 && window.innerWidth > 768) {
      return 474;
    }

    if (window.innerWidth < 768) {
      return 227;
    }
  }

  // if this is not an image from an embedded gallery..

  if (isWidth) {
    return 720;
  }

  return 468;
};

export default getFinalDimensionsForGalleryImages;
