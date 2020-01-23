import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../../../resources/images/stickyNav-avatar.svg';
import './default.scss';

const StickyDesktopNav = ({
  commentsEnabled,
  siteDomainURL,
  siteName,
  shareLinkFacebook,
  shareLinkTwitter,
  shareLinkPinterest,
  shareLinkReddit,
  shareLinkEmail,
  loginLink,
  logo,
}) => (
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

StickyDesktopNav.propTypes = {
  articleURL: PropTypes.string,
  comments: PropTypes.object,
  promoItems: PropTypes.object,
  contentElements: PropTypes.array,
  siteDomainURL: PropTypes.string,
  shareLinkFacebook: PropTypes.string,
  shareLinkTwitter: PropTypes.string,
  shareLinkPinterest: PropTypes.string,
  shareLinkReddit: PropTypes.string,
  shareLinkEmail: PropTypes.string,
  loginLink: PropTypes.string,
  siteName: PropTypes.string,
  logo: PropTypes.string,
  commentsEnabled: PropTypes.bool,
};

export default StickyDesktopNav;
