import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import logo from '../../../../../resources/images/stickyNav-logo.svg';
import avatar from '../../../../../resources/images/stickyNav-avatar.svg';
import './default.scss';

const StickyDesktopNav = ({
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
  return (
    <div className="c-stickyNav stickyNav-desktop">
      <ul className="c-stickyNav-list">
        <li className="stickyNav-item">
          <a href={siteDomainURL}>
            <img src={logo} alt={`${siteName} logo`} />
          </a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkFacebook} className="sticky-nav-icon facebook-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkTwitter} className="sticky-nav-icon twitter-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkPinterest} className="sticky-nav-icon pinterest-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkReddit} className="sticky-nav-icon reddit-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkEmail} className="sticky-nav-icon mail-icon" target="__blank"></a>
        </li>
        {commentsEnabled ? (
          <li className="stickyNav-item">
            <a href="#" className="sticky-nav-icon comments-icon"></a>
          </li>
        ) : null}
        <li className="stickyNav-item">
          <a href={loginLink}>
            <img src={avatar} className="stickyNav-item login-avatar" alt={`${siteName} avatar`} />
            <span className="stickyNav-user">Log In</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

StickyDesktopNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  promoItems: PropTypes.object,
  contentElements: PropTypes.array,
};

export default StickyDesktopNav;
