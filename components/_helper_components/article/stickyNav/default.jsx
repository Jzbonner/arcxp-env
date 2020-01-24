import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import StickyDesktopNav from './desktop/default';
import StickyMobileNav from './mobile/default';
import './default.scss';
import logo from '../../../../resources/images/stickyNav-logo.svg';
import tempMenu from '../../../../resources/images/tempMenu.jpg';

const StickyNav = ({
  articleURL, headlines, comments, promoItems, contentElements,
}) => {
  const {
    facebookURL, pinterestURL, twitterURL, redditURL, mail, siteDomainURL, siteName,
  } = getProperties();
  const { basic: articleHeadline } = headlines || {};
  const { allow_comments: commentsEnabled } = comments || {};
  const { url: featuredImage } = promoItems ? promoItems.basic : {};
  const { url: videoThumbnail } = promoItems.basic.promo_image ? promoItems.basic.promo_image : {};
  const { url: galleryThumbnail } = promoItems.basic.promo_items ? promoItems.basic.promo_items.basic : {};
  const { url: inlineImage } = contentElements ? contentElements[0] : {};
  const { url: inlineVideoThumbnail } = contentElements[0].promo_image ? contentElements[0].promo_image : {};
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

  const startingPoint = 200;
  const desktopWidth = 1023;
  const currentWidth = window.innerWidth;
  const [currentScroll, setCurrentScroll] = useState(0);
  let scroll;
  const handleScroll = (e) => {
    scroll = e.currentTarget.pageYOffset;
    setCurrentScroll(scroll);
  };

  useEffect(() => {
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
};

export default StickyNav;
