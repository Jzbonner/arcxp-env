import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({
  data, refHook, func,
}) => {
  const {
    url, alt, index, id, by = [], captionObj, states, lastItemClass,
  } = data;
  const { caption } = captionObj;
  const {
    isFocused, isStickyVisible, isCaptionOn, isMobile,
  } = states;
  console.log('lastItemCalss', lastItemClass);
  return (
    <div
      ref={refHook}
      id={id}
      data-index={index}
      key={url}
      onClick={func}
      className={`${isStickyVisible ? `gallery-full-item ${lastItemClass}` : 'gallery-image'}
      ${!isStickyVisible && isMobile ? 'mosaic-container' : ''}`}>
      <img
        className={`${!isStickyVisible && isMobile ? 'mosaic-image' : ''} ${isFocused ? 'is-focused' : ''}`}
        src={url}
        alt={alt ? `${alt}` : ''}
      />
      {
        isStickyVisible
          ? <div>
            <div className="gallery-credit">
              {by[0] && by[0].name ? by[0].name : null}
            </div>
            {
              isCaptionOn
                ? <div className="gallery-caption">
                  {caption || null}
                </div>
                : null
            }
          </div> : null
      }

    </div>
  );
};

GalleryItem.propTypes = {
  data: PropTypes.object,
  refHook: PropTypes.object,
  url: PropTypes.string,
  alt: PropTypes.string,
  index: PropTypes.number,
  focus: PropTypes.bool,
  id: PropTypes.string,
  isStickyVisible: PropTypes.bool,
  isCaptionOn: PropTypes.bool,
  captionObj: PropTypes.object,
  func: PropTypes.func,
  lastItemClass: PropTypes.string,
};

export default GalleryItem;
