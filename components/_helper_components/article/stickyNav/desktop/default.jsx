import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import logo from '../../../../../resources/images/stickyNav-logo.svg';
import avatar from '../../../../../resources/images/stickyNav-avatar.svg';
import './default.scss';

const StickyDesktopNav = ({ articleURL, headlines }) => {
  const {
    facebookURL, pinterestURL, twitterURL, redditURL, mail, siteDomainURL, siteName,
  } = getProperties();

  const { basic: articleHeadline } = headlines;

  return (
    <div className="c-stickyNav stickyNav-desktop">
      <ul className="c-stickyNav-list">
        <li className="stickyNav-item">
          <a href={siteDomainURL}>
            <img src={logo} alt={`${siteName} logo`} />
          </a>
        </li>
        <li className="stickyNav-item">
          <a href={`${facebookURL}${siteDomainURL}${articleURL}`} className="sticky-nav-icon facebook-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href={`${twitterURL}${siteDomainURL}${articleURL}&text=${articleHeadline}`} className="sticky-nav-icon twitter-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href={`${pinterestURL}${siteDomainURL}${articleURL}&text=${articleHeadline}`} className="sticky-nav-icon pinterest-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href={`${redditURL}${siteDomainURL}${articleURL}&text=${articleHeadline}`} className="sticky-nav-icon reddit-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href={`${mail}${articleHeadline}&body=${siteDomainURL}${articleURL}`} className="sticky-nav-icon mail-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href="#" className="sticky-nav-icon comments-icon"></a>
        </li>
        <li className="stickyNav-item">
          <a href={`${siteDomainURL}/login`}>
            <img src={avatar} className="stickyNav-item login-avatar" alt={`${siteName} avatar`} />
            <span>Log In</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

StickyDesktopNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
};

export default StickyDesktopNav;
