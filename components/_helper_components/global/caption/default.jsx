import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Caption = ({ src }) => {
  const { caption, credits } = src || null;
  const [toggleButton, setToggle] = useState(false);

  const toggle = () => {
    setToggle(!toggleButton);
  };

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
        <p className="photo-credit-text">{giveCredit}</p>
      </div>
    </div>
  );
};

Caption.propTypes = {
  src: PropTypes.obj,
};

export default Caption;
