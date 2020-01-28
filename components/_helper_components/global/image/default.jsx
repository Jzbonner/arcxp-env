import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const Image = ({
  width, height, src, imageMarginBottom,
}) => {
  const { url, caption, credits } = src || null;
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setImageSrc(imageResizer(url, width, height));
  }, []);

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

  return (
    <div className={`c-image-component ${imageMarginBottom}`}>
      <div className="image-component-image">
        <img src={imageSrc} alt={caption} />
        <Caption src={src} />
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
};
export default Image;
