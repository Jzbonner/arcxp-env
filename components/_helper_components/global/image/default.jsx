import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/video_image_utils/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const Image = ({
  width, height, src, imageMarginBottom, isInlineImage, isLeadImage,
}) => {
  const { url, caption, credits } = src || null;
  const [imageSrc, setImageSrc] = useState('');
  const imageALT = caption && caption.length > 1 ? caption : 'story page inline image';

  useEffect(() => {
    setImageSrc(imageResizer(url, width, height));
  }, []);

  const screenSize = checkWindowSize();

  let mainCredit = {};
  let secondaryCredit = {};
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation.length ? credits.affiliation[0].name : '';
    secondaryCredit = credits.by && credits.by.length ? credits.by[0].name : '';
  }

  let giveCredit = '';
  if (mainCredit.length > 1) {
    giveCredit = `Credit: ${mainCredit}`;
  } else if (secondaryCredit.length > 1) {
    giveCredit = `Credit: ${secondaryCredit}`;
  }

  const smartChecker = () => {
    if (isLeadImage && !giveCredit && !caption) {
      return null;
    }
    if (isInlineImage && !caption) {
      return null;
    }
    if (isLeadImage && giveCredit && !caption && screenSize.width < 1024) {
      return <Caption src={src} />;
    }

    if (isLeadImage && giveCredit && !caption && screenSize.width > 1024) {
      return null;
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
};
export default Image;
