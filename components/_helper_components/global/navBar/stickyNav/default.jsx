import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import StickyDesktopNav from './desktop/default';
import StickyMobileNav from './mobile/default';
import './default.scss';
import logo from '../../../../../resources/images/stickyNav-logo.svg';

const StickyNav = ({
  articleURL, headlines, comments = false, promoItems, contentElements = [], visible, resolution,
}) => {
  const {
    facebookURL, pinterestURL, twitterURL, redditURL, mail, siteDomainURL, siteName,
  } = getProperties();
  const { basic: articleHeadline } = headlines || {};
  const { allow_comments: commentsEnabled } = comments || {};
  const { url: featuredImage } = promoItems ? promoItems.basic : {};
  const { url: videoThumbnail } = promoItems && promoItems.basic.promo_image ? promoItems.basic.promo_image : {};
  const { url: galleryThumbnail } = promoItems && promoItems.basic.promo_items ? promoItems.basic.promo_items.basic : {};
  const { url: inlineImage } = contentElements && contentElements[0] ? contentElements[0] : {};
  const { url: inlineVideoThumbnail } = contentElements
  && contentElements[0] && contentElements[0].promo_image ? contentElements[0].promo_image : {};
  // secondary / inline video thumbnail
  // Pinterest Image rendering logic
  const renderImage = () => {
    if (featuredImage) {
      return featuredImage;
    }
    if (videoThumbnail) {
      return videoThumbnail;
    }
    if (galleryThumbnail) {
      return galleryThumbnail;
    }
    if (inlineImage) {
      return inlineImage;
    }
    if (inlineVideoThumbnail) {
      return inlineVideoThumbnail;
    }
    return logo;
  };

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
  promoItems: PropTypes.object,
  contentElements: PropTypes.array,
  siteName: PropTypes.string,
  shareLinkFacebook: PropTypes.string,
  shareLinkTwitter: PropTypes.string,
  shareLinkPinterest: PropTypes.string,
  shareLinkReddit: PropTypes.string,
  shareLinkEmail: PropTypes.string,
  loginLink: PropTypes.string,
  commentsEnabled: PropTypes.bool,
  visible: PropTypes.bool,
  resolution: PropTypes.number,
};

export default StickyNav;
