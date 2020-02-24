import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import StickyDesktopNav from './desktop/default';
import StickyMobileNav from './mobile/default';
import './default.scss';
import tempMenu from '../../../../resources/images/tempMenu.jpg';
import logo from '../../../../resources/images/stickyNav-logo.svg';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';

const StickyNav = ({
  articleURL, headlines, comments = false,
}) => {
  const {
    facebookURL, pinterestURL, twitterURL, redditURL, mail, siteDomainURL, siteName,
  } = getProperties();
  const { basic: articleHeadline } = headlines || {};
  const { allow_comments: commentsEnabled } = comments || {};

  const shareLinkFacebook = `${facebookURL}${siteDomainURL}${articleURL}`;
  const shareLinkTwitter = `${twitterURL}${siteDomainURL}${articleURL}&text=${articleHeadline}`;
  const shareLinkPinterest = `${pinterestURL}${siteDomainURL}${articleURL}&media=${renderImage()}&description=${articleHeadline}`;
  const shareLinkReddit = `${redditURL}${siteDomainURL}${articleURL}&title=${articleHeadline}`;
  const shareLinkEmail = `${mail}${articleHeadline}&body=${siteDomainURL}${articleURL}`;
  const loginLink = `${siteDomainURL}/login`;

  const startingPoint = 200;
  const desktopWidth = 1023;
  let scroll;
  const [currentWidth, setWidth] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const handleScroll = (e) => {
    scroll = e.currentTarget.pageYOffset;
    setCurrentScroll(scroll);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [currentScroll]);

  if (currentScroll > startingPoint && currentWidth > desktopWidth) {
    return (
      <div className="c-stickyNav">
        <StickyDesktopNav
          siteDomainURL={siteDomainURL}
          shareLinkFacebook={shareLinkFacebook}
          shareLinkTwitter={shareLinkTwitter}
          shareLinkPinterest={shareLinkPinterest}
          shareLinkReddit={shareLinkReddit}
          shareLinkEmail={shareLinkEmail}
          loginLink={loginLink}
          siteName={siteName}
          logo={logo}
          commentsEnabled={commentsEnabled}
        />
      </div>
    );
  }
  if (currentScroll > startingPoint && currentWidth < desktopWidth) {
    return (
      <div className="c-stickyNav">
        <img src={tempMenu} alt="temp-burger-menu" style={{ maxWidth: '50px' }}/>
        <StickyMobileNav
          commentsEnabled={commentsEnabled}
          shareLinkFacebook={shareLinkFacebook}
          shareLinkTwitter={shareLinkTwitter}
          shareLinkPinterest={shareLinkPinterest}
          shareLinkReddit={shareLinkReddit}
          shareLinkEmail={shareLinkEmail}
        />
      </div>
    );
  }
  return null;
};

StickyNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  siteName: PropTypes.string,
  shareLinkFacebook: PropTypes.string,
  shareLinkTwitter: PropTypes.string,
  shareLinkPinterest: PropTypes.string,
  shareLinkReddit: PropTypes.string,
  shareLinkEmail: PropTypes.string,
  loginLink: PropTypes.string,
  commentsEnabled: PropTypes.bool,
};

export default StickyNav;
