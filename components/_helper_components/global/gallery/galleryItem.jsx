import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';


const GalleryItem = ({
  data, func, modalFunc,
}) => {
  const {
    url, width, height, alt, index, id, by = [], captionObj = {}, states = {}, lastItemClass,
  } = data;
  const { affiliation = [], caption = [] } = captionObj;

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const {
    isFocused, isStickyVisible, isCaptionOn, isMobile, isAdVisible, isModalVisible,
  } = states;

  let affiliationCredit = affiliation[0] && affiliation[0].name ? affiliation[0].name : null;

  if (affiliationCredit && !affiliationCredit.includes('Credit:')) affiliationCredit = `Credit: ${affiliationCredit}`;

  const [resizeUrl, setUrl] = useState(null);

  useEffect(() => {
    if (!isMobile) {
      const galleryHeight = 480;
      const newWidth = (width / height) * galleryHeight;
      const thumborUrl = imageResizer(url, arcSite, Math.round(newWidth), galleryHeight);
      setUrl(thumborUrl);
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
        onClick={modalFunc ? () => modalFunc(url, isModalVisible) : null}
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
