import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../../../_helper_components/global/caption/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const Image = ({ src }) => {
  const { url, caption, credits } = src || null;
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    setImageSrc(imageResizer(url, 200, 200));
  }, []);

  let mainCredit = null;
  let secondaryCredit = null;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation.length ? credits.affiliation[0].name : '';
    secondaryCredit = credits.by && credits.by.length ? credits.by[0].name : '';
  }

  let giveCredit = '';
  if (mainCredit.length > 1) {
    giveCredit = `Photo: ${mainCredit}`;
  } else if (secondaryCredit.length > 1) {
    giveCredit = `Photo: ${secondaryCredit}`;
  }

  return (
    <div className="c-image-component">
      <div className="image-component-image">
        <img src={imageSrc} alt={caption} />
        <Caption src={src} />
      </div>
      <p className="photo-credit-text">{giveCredit}</p>
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.object,
};
export default Image;
