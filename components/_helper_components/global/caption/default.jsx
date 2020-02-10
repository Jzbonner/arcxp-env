import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Caption = ({ src, isLeadVideo, videoCaption }) => {
  const { caption, credits } = src || null;
  const [toggleButton, setToggle] = useState(false);

  const toggle = () => {
    setToggle(!toggleButton);
  };

  let captionContent = caption;
  if (isLeadVideo) {
    captionContent = videoCaption;
  }

  let mainCredit = {};
  let secondaryCredit = {};
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation.length ? credits.affiliation[0].name : '';
    secondaryCredit = credits.by && credits.by.length ? credits.by[0].name : '';
  }

  let giveCredit = '';
  if (!isLeadVideo) {
    if (mainCredit.length > 1) {
      giveCredit = `Credit: ${mainCredit}`;
    } else if (secondaryCredit.length > 1) {
      giveCredit = `Credit: ${secondaryCredit}`;
    }
  }
  if (isLeadVideo) {
    giveCredit = `Credit: ${mainCredit}`;
  }
  return (
    <div className={`c-caption ${toggleButton ? 'is-active' : ''}`}>
      <div className="photo-caption-btn" onClick={toggle}>
        <div className="fill-line fill-line-long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line-long"></div>
        <div className="fill-line"></div>
        <div className="fill-line fill-line-long"></div>
      </div>
      <div className="photo-caption">
        <div className="photo-caption-text">{captionContent}</div>
        <p className="photo-credit-text">{giveCredit}</p>
      </div>
    </div>
  );
};

Caption.propTypes = {
  src: PropTypes.object,
  isLeadVideo: PropTypes.bool,
  videoCaption: PropTypes.string,
};

export default Caption;
