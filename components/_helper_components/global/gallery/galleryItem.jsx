import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageResizer from '../../../layouts/_helper_functions/Resizer';

const GalleryItem = ({
  data, func, modalFunc,
}) => {
  const {
    url, width, height, alt, index, id, by = [], captionObj, states, lastItemClass,
  } = data;
  const { affiliation = [], caption = [] } = captionObj;

  const {
    isFocused, isStickyVisible, isCaptionOn, isMobile, isAdVisible,
  } = states;

  let affiliationCredit = affiliation[0] && affiliation[0].name ? affiliation[0].name : null;

  if (affiliationCredit && !affiliationCredit.includes('Credit:')) affiliationCredit = `Credit: ${affiliationCredit}`;

  const [resizeUrl, setUrl] = useState(null);

  useEffect(() => {
    if (!isMobile) {
      const galleryHeight = 480;
      const newWidth = (width / height) * galleryHeight;
      const resizerUrl = imageResizer(url, Math.round(newWidth), galleryHeight);
      setUrl(resizerUrl);
    } else {
      setUrl(url);
    }
  }, []);

  return (
    <div
      id={id}
      data-index={index}
      key={url}
      onClick={func}
      className={`${isStickyVisible ? `gallery-full-item ${isCaptionOn ? lastItemClass : ''}` : 'gallery-image'}
      ${lastItemClass && isStickyVisible && !isCaptionOn ? 'last-item-height-fix-no-caption' : ''}
      ${!isStickyVisible && isMobile ? 'mosaic-container' : ''}
      ${!isMobile ? 'desktop-image' : ''}
      `}
      >
      <img
        className={`${!isStickyVisible && isMobile ? 'mosaic-image' : ''} ${isFocused && !isAdVisible ? 'is-focused' : ''}`}
        src={resizeUrl}
        onClick={modalFunc ? () => modalFunc(url) : null}
        alt={alt ? `${alt}` : ''}
      />
      {
        isStickyVisible
          ? <div className='gallery-subtitle'>
            <div className="gallery-credit">
              {
              (affiliationCredit) || (by && by[0] && by[0].name)
                ? (affiliationCredit) || `Credit: ${by && by[0] && by[0].name}` : null
              }
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
  url: PropTypes.string,
  alt: PropTypes.string,
  index: PropTypes.number,
  focus: PropTypes.bool,
  id: PropTypes.string,
  isAdVisible: PropTypes.bool,
  isStickyVisible: PropTypes.bool,
  isCaptionOn: PropTypes.bool,
  captionObj: PropTypes.object,
  func: PropTypes.func,
  lastItemClass: PropTypes.string,
  modalFunc: PropTypes.func,
};

export default GalleryItem;
