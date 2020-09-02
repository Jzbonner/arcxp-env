import { useEffect } from 'react';

export default (el, cb, customScrollContainerEl, imageType) => {
  let fetched = false;

  const lazyLoadImage = () => {
    if (!el.current) {
      return;
    }

    if (imageType === 'isGalleryImage') {
      // We need the calculateTranslateX function to run once first to center the focused gallery elements in the viewport,
      // so we know which images to load. Once it run, it adds an inline transform:translate style to the container div.
      // So if this inline style is not present or if it is not a mobile gallery, then we are not ready to load gallery images.
      if (!document.querySelector('.gallery-container[style*="transform"]') && !document.querySelector('#MOBILE_GALLERY')) {
        return;
      }
    }

    // These get re-assigned each time the function runs so they need to be initialized with "let".
    // Eslint wants them to be initialized with "const"
    let imagePositionTop = el.current.getBoundingClientRect().top; //eslint-disable-line
    let windowHeight = window.innerHeight; //eslint-disable-line
    let imagePositionLeft = el.current.getBoundingClientRect().left; //eslint-disable-line
    let imagePositionRight = el.current.getBoundingClientRect().right; //eslint-disable-line
    let windowWidth = window.innerWidth; //eslint-disable-line

    if (!fetched) {
      if (imagePositionLeft !== imagePositionRight) {
        // loads image if it enters a box from the bottom, left or right that is 600px larger than the viewport dimensions
        if (imagePositionTop < windowHeight + 600 && imagePositionRight > -600 && imagePositionLeft < windowWidth + 600) {
          cb();
          fetched = true;
        }
      }
    }
  };

  useEffect(() => {
    const scrollContainer = customScrollContainerEl && document.querySelector(customScrollContainerEl);
    if (scrollContainer) {
      lazyLoadImage();
      scrollContainer.addEventListener('scroll', lazyLoadImage);
      scrollContainer.addEventListener('DOMContentLoaded', lazyLoadImage);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', lazyLoadImage);
      window.addEventListener('DOMContentLoaded', lazyLoadImage);
      window.addEventListener('load', lazyLoadImage);
      window.addEventListener('click', lazyLoadImage);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', lazyLoadImage);
        window.removeEventListener('DOMContentLoaded', lazyLoadImage);
        window.removeEventListener('load', lazyLoadImage);
        window.removeEventListener('click', lazyLoadImage);
      }
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', lazyLoadImage);
        scrollContainer.removeEventListener('DOMContentLoaded', lazyLoadImage);
      }
    };
  }, []);
};
