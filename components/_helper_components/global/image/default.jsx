import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Image = ({ imageLocation, src, imageMarginBottom }) => {
  const [toggleButton, setToggle] = useState(false);

  const { url, caption, credits } = src || null;

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

  const toggle = () => {
    setToggle(!toggleButton);
  };

  return (
    <div className={`image-${imageLocation} c-image-component ${imageMarginBottom}`}>
      <div className="image-component-image">
        <img src={url} alt={caption} />
        <div className={`c-caption ${toggleButton ? 'is-active' : ''}`}>
          <div className="photo-caption-btn" onClick={toggle}>
            <div className="fill-line fill-line-long"></div>
            <div className="fill-line"></div>
            <div className="fill-line fill-line-long"></div>
            <div className="fill-line"></div>
            <div className="fill-line fill-line-long"></div>
          </div>
          <div className="photo-caption">
            <div className="photo-caption-text">{caption}</div>
            <p className="photo-credit-text-mobile">{giveCredit}</p>
          </div>
        </div>
      </div>
      <p className="photo-credit-text-desktop">{giveCredit}</p>
    </div>
  );
};

Image.propTypes = {
  imageLocation: PropTypes.oneOf(['head', 'breaking', 'thumbnail']),
  src: PropTypes.object,
  imageMarginBottom: PropTypes.string,
};
export default Image;
