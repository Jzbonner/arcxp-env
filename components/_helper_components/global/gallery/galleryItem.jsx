import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/default';

const GalleryItem = ({
  data, func, modalFunc, isMobileGallery = false,
}) => {
  const {
    url, width, height, focal_point: focalPoint, alt, index, id, by = [], captionObj = {}, states = {}, lastItemClass, resized_obj: resizedObj,
  } = data;
  const { affiliation = [], caption = [] } = captionObj;

  const {
    isFocused, isStickyVisible, isCaptionOn, isMobile, isAdVisible, isModalVisible,
  } = states;

  let affiliationCredit = affiliation[0] && affiliation[0].name ? affiliation[0].name : null;

  if (affiliationCredit && !affiliationCredit.includes('Credit:')) affiliationCredit = `Credit: ${affiliationCredit}`;

  const finalWidth = 720;
  const finalHeight = 480;

  const imageProps = {
    width: finalWidth,
    height: finalHeight,
    imageType: 'isGalleryImage',
    noLazyLoad: isMobileGallery,
    ampPage: false,
    src: {
      url,
      height,
      width,
      alt_text: alt,
      resized_obj: resizedObj,
      focal_point: focalPoint,
    },
  };
  let calculatedWidth = 'auto';
  if (!isMobile) {
    // we go ahead and determine what the width of the vertical images will be based on a scaling of height to final height ratio and then set that as the min-width style of each gallery item, to ensure that positioning & overall gallery width is properly calculated (prior to lazyloading of images)
    calculatedWidth = `${height > width ? Math.floor(width * (finalHeight / height)) : finalWidth}px`;
  }

  return (
    <div
      id={id}
      data-index={index}
      key={url}
      onClick={func}
      className={`${isStickyVisible ? `gallery-full-item ${isCaptionOn ? lastItemClass : ''}` : 'gallery-image'} ${lastItemClass && isStickyVisible && !isCaptionOn ? 'last-item-height-fix-no-caption' : ''} ${!isStickyVisible && isMobile ? 'mosaic-container' : ''} ${!isMobile ? 'desktop-image' : ''}`}
      style={{ minWidth: calculatedWidth }}
    >
      {url && <Image
        {...imageProps}
        additionalClasses={`${!isStickyVisible && isMobile ? 'mosaic-image' : ''} ${(isFocused && !isAdVisible) ? 'is-focused' : ''}`}
        onClickRun={modalFunc ? () => modalFunc(url, isModalVisible) : null}
      />}
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
  isMobileGallery: PropTypes.bool,
};

export default GalleryItem;
