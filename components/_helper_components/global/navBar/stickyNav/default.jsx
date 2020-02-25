import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import StickyDesktopNav from './desktop/default';
import StickyMobileNav from './mobile/default';
import './default.scss';
import logo from '../../../../../resources/images/stickyNav-logo.svg';
import renderImage from '../../../../layouts/_helper_functions/getFeaturedImage.js';

const StickyNav = ({
  articleURL, headlines, comments = false, resolution, visible,
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

  if (resolution > 1023 && visible) {
    return (
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
    );
  }
  if (resolution <= 1023 && visible) {
    return (
        <StickyMobileNav
          commentsEnabled={commentsEnabled}
          shareLinkFacebook={shareLinkFacebook}
          shareLinkTwitter={shareLinkTwitter}
          shareLinkPinterest={shareLinkPinterest}
          shareLinkReddit={shareLinkReddit}
          shareLinkEmail={shareLinkEmail}
        />
    );
  }
  return null;
};

StickyNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  visible: PropTypes.bool,
  resolution: PropTypes.number,
};

export default StickyNav;
