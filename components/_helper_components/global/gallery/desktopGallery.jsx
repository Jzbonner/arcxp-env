import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DesktopGallery = (props) => {
  const { data, translateX, handlers } = props;

  useEffect(() => {
    if (typeof translateX !== 'number') {
      // fallback for initial load when the passed-in translateX hasn't yet been calculated
      const galleryContainers = document.querySelectorAll('.gallery-container');
      galleryContainers.forEach((gallery) => {
        if (gallery) {
          const focusElement = gallery.querySelector('#gallery-item-0');
          if (focusElement) {
            // we adjust the offset value by 1/2 the difference between the gallery wrapper's width & the first photo (to center in the container)
            const containerAdjustment = (document.querySelector('.gallery-wrapper').offsetWidth - focusElement.offsetWidth) / 2;
            let focusElementOffset = 0;
            if (!focusElement.offsetLeft) {
              // the inherent offsetLeft is invalid for some reason, so let's calculate it
              let stopCounting = false;
              gallery.querySelectorAll('.gallery-image').forEach((image) => {
                // we loop through the images to add up the total left offset based on preceding images's widths & margins
                if (image.getAttribute('data-index') === '0') {
                  stopCounting = true;
                  const style = image.currentStyle || window.getComputedStyle(image);
                  // and we also include the focus element's left margin as well
                  focusElementOffset += parseFloat(style.marginLeft);
                } else if (!stopCounting) {
                  const style = image.currentStyle || window.getComputedStyle(image);
                  const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                  focusElementOffset += image.offsetWidth + margin;
                }
              });
            } else {
              // the inherent offsetLeft is fine, so use it
              focusElementOffset = focusElement.offsetLeft;
            }
            // eslint-disable-next-line no-param-reassign
            gallery.style.transform = `translateX(${containerAdjustment - focusElementOffset}px)`;
          }
        }
      });
    }
  }, [translateX]);

  return (
    <div className='gallery-container' style={{ transform: `translateX(${translateX}px)`, touchAction: 'pan-x', width: '-webkit-fit-content' }} {...handlers}>
      {data}
    </div>
  );
};

export default DesktopGallery;

DesktopGallery.propTypes = {
  data: PropTypes.array,
  translateX: PropTypes.number,
  handlers: PropTypes.object,
};
