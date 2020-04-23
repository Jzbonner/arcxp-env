import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import getTeaseIcon from './_helper_functions/getTeaseIcon';

const Image = ({
  width, height, src, imageMarginBottom, imageType, maxTabletViewWidth, teaseContentType, ampPage,
}) => {
  const {
    url, height: originalHeight, width: originalWidth, caption, credits,
  } = src || {};
  const [imageSrc, setImageSrc] = useState('');
  const imageALT = caption && caption.length > 1 ? caption : 'story page inline image';

  useEffect(() => {
    setImageSrc(imageResizer(url, width, height));
  }, []);

  const screenSize = checkWindowSize();

  let mainCredit;
  let secondaryCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
    secondaryCredit = credits.by && credits.by.length && credits.by[0] && credits.by[0].name ? credits.by[0].name : null;
  }

  let giveCredit;
  if (mainCredit) {
    giveCredit = `Credit: ${mainCredit}`;
  } else if (secondaryCredit) {
    giveCredit = `Credit: ${secondaryCredit}`;
  }

  const renderCaption = () => {
    if (
      (imageType === 'isLeadImage' && !giveCredit && !caption)
      || (imageType === 'isInlineImage' && !caption)
      || (imageType === 'isLeadImage' && giveCredit && !caption && screenSize.width > maxTabletViewWidth)
      || teaseContentType
    ) {
      return null;
    }
    if (imageType === 'isLeadImage' && giveCredit && !caption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} />;
    }
    return <Caption src={src} />;
  };

  return (
    <div className={`c-image-component ${imageMarginBottom || ''}`}>
      <div className="image-component-image">
        <>
          {!ampPage ? (
            <img src={imageSrc} alt={imageALT} className={teaseContentType ? 'tease-image' : ''} />
          ) : (
            <amp-img
              src={imageResizer(url, width, height)}
              alt={imageALT}
              width={width}
              height={height !== 0 ? height : (width / originalWidth) * originalHeight}
              layout="responsive"
              class={teaseContentType ? 'tease-image' : ''}
            />
          )}
          {teaseContentType && getTeaseIcon(teaseContentType, url)}
        </>
        {imageType !== 'isHomepageImage' && renderCaption()}
      </div>
      {imageType !== 'isHomepageImage' && <p className="photo-credit-text">{giveCredit}</p>}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageMarginBottom: PropTypes.string,
  imageType: PropTypes.oneOf(['isLeadImage', 'isInlineImage', 'isHomepageImage']).isRequired,
  maxTabletViewWidth: PropTypes.number,
  teaseContentType: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ampPage: PropTypes.bool.isRequired,
};
export default Image;
