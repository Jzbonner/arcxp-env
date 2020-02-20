import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const Image = ({
  width, height, src, imageMarginBottom, isInlineImage, isLeadImage, maxTabletViewWidth,
}) => {
  const { url, caption, credits } = src || {};
  const [imageSrc, setImageSrc] = useState('');
  const imageALT = caption && caption.length > 1 ? caption : 'story page inline image';

  useEffect(() => {
    setImageSrc(imageResizer(url, width, height));
  }, []);

  const screenSize = checkWindowSize();

  let mainCredit;
  let secondaryCredit;
  if (credits) {
    mainCredit = credits.affiliation
    && credits.affiliation[0]
    && credits.affiliation[0].name ? credits.affiliation[0].name : null;
    secondaryCredit = credits.by
    && credits.by.length && credits.by[0] && credits.by[0].name ? credits.by[0].name : null;
  }

  let giveCredit;
  if (mainCredit) {
    giveCredit = `Credit: ${mainCredit}`;
  } else if (secondaryCredit) {
    giveCredit = `Credit: ${secondaryCredit}`;
  }

  const smartChecker = () => {
    if (
      (isLeadImage && !giveCredit && !caption)
      || (isInlineImage && !caption)
      || (isLeadImage && giveCredit && !caption && screenSize.width > maxTabletViewWidth)
    ) {
      return null;
    }
    if (isLeadImage && giveCredit && !caption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} />;
    }
    return <Caption src={src} />;
  };

  return (
    <div className={`c-image-component ${imageMarginBottom}`}>
      <div className="image-component-image">
        <img src={imageSrc} alt={imageALT} />
        {smartChecker()}
      </div>
      <p className="photo-credit-text">{giveCredit}</p>
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageMarginBottom: PropTypes.string,
  isInlineImage: PropTypes.bool,
  isLeadImage: PropTypes.bool,
  maxTabletViewWidth: PropTypes.number,
};
export default Image;
