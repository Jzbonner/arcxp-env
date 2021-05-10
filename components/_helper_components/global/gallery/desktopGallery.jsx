import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const DesktopGallery = (props) => {
  const { data, translateX, handlers } = props;

  useEffect(() => {
    if (typeof translateX !== 'number') {
      const galleryContainers = document.querySelectorAll('.gallery-container');
      galleryContainers.forEach((gallery) => {
        if (gallery) {
          const focusElement = gallery.querySelector('#gallery-item-0');
          if (focusElement) {
            const translateXValue = parseInt(gallery.offsetWidth, 10) / 2 - parseInt(focusElement.offsetWidth, 10) / 2 - parseInt(focusElement.offsetLeft, 10);
            // eslint-disable-next-line no-param-reassign
            gallery.style.transform = `translateX(${translateXValue}px)`;
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
