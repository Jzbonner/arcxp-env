import React from 'react';
import PropTypes from 'prop-types';
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
  logo,
}) => (
    <div className="c-stickyNav-desktop">
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
      </ul>
    </div>
);

StickyDesktopNav.propTypes = {
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
