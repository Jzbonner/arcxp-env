import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Image = ({ outerComponentClassName, basicItems }) => {
  // console.log(basicItems);
  const { url } = basicItems || null;
  const [toggleButton, setToggle] = useState(false);
  const { caption } = basicItems || null;
  const name = basicItems.credits || null;
  let mainCredit = null;
  let secondaryCredit = null;
  if (name) {
    mainCredit = name.affiliation && name.affiliation.length ? name.affiliation[0].name : '';
    secondaryCredit = name.by && name.by.length ? name.by[0].name : '';
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
    <div className={`image-${outerComponentClassName} c-image-component`}>
      <div className="image-component-image">
        <img src={url} alt={caption} />
        <div className="c-mainCaption">
          <div className={`photo-caption-btn ${toggleButton ? 'is-active' : ''}`} onClick={toggle}>
            <div className="fill-line fill-line-long"></div>
            <div className="fill-line"></div>
            <div className="fill-line fill-line-long"></div>
            <div className="fill-line"></div>
            <div className="fill-line fill-line-long"></div>
          </div>
          {toggleButton ? (
            <div className="photo-caption">
              <div className="photo-caption-text">{caption}</div>
              <p className="photo-credit-text">{giveCredit}</p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="photo-credit-text">{giveCredit}</p>
    </div>
  );
};

Image.propTypes = {
  imageSource: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  outerComponentClassName: PropTypes.oneOf(['head', 'breaking', 'thumbnail']),
  // linkUrl: PropTypes.string,
  basicItems: PropTypes.object,
};
export default Image;
