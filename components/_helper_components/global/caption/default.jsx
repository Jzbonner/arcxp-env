import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import createID from '../../../layouts/_helper_functions/createID';
import LeftArrow from '../../../../resources/icons/slider/left-arrow.svg';
import './default.scss';

const Caption = (
  {
    src, isLeadVideo, videoCaption, imageType, ampPage,
  },
) => {
  const { caption, credits } = src || null;
  const [toggleButton, setToggle] = useState(false);
  const captionID = `captionID-${createID()}`;
  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;


  const toggle = (e) => {
    e.preventDefault();
    setToggle(!toggleButton);
  };

  let captionContent = caption;
  if (isLeadVideo) {
    captionContent = videoCaption;
  }

  let mainCredit;
  let secondaryCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
    secondaryCredit = credits.by && credits.by.length && credits.by[0] && credits.by[0].name ? credits.by[0].name : null;
  }

  let giveCredit;
  if (!isLeadVideo) {
    if (mainCredit) {
      if (imageType === 'isLeadImage') {
        giveCredit = '';
      } else {
        giveCredit = `Credit: ${mainCredit}`;
      }
    } else if (secondaryCredit) {
      giveCredit = `Credit: ${secondaryCredit}`;
    }
  }
  if (isLeadVideo) {
    if (mainCredit) {
      giveCredit = `Credit: ${mainCredit}`;
    }
  }

  return (
    <div
      className={`c-caption ${toggleButton ? 'is-active' : ''}`}
      id={captionID}
      on={`tap:${captionID}.toggleClass(class='is-active'),amp-arrow.toggleClass(class='rotate-right')`}
      role="button"
      tabIndex="0"
    >
      <div className="photo-caption-btn" onClick={toggle}>
        { ampPage ? <amp-img class='amp-arrow' id='amp-arrow' src={`${deployment(`${contextPath}/resources/icons/slider/left-arrow.svg`)}`} height='9px' width='11px' alt='caption arrow'></amp-img> : <img className="caption-arrow" src={LeftArrow} alt='caption arrow'/>}
        <span>Caption</span>
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
  imageType: PropTypes.string,
  ampPage: PropTypes.bool,
};

export default Caption;
