import React from 'react';
import getProperties from 'fusion:properties';
import logo from '../../../../../resources/images/stickyNav-logo.svg';
import './default.scss';

const StickyDesktopNav = () => {
  const {
    facebookURL, instagramURL, twitterURL, siteDomainURL, siteName,
  } = getProperties();

  return (
    <div className="c-stickyNav stickyNav-desktop">
      <ul className="c-stickyNav-list">
        <li>
          <a href={siteDomainURL}>
            <img src={logo} alt={`${siteName} logo`} />
          </a>
        </li>
        <li>
          <a href={facebookURL}>Facebook</a>
        </li>
        <li>
          <a href={twitterURL}>Twitter</a>
        </li>
        <li>
          <a href={instagramURL}>Instagram</a>
        </li>
        <li>
          <a href="#">Reddit</a>
        </li>
        <li>
          <a href="#">Mail</a>
        </li>
        <li>
          <a href="#">Comments Section</a>
        </li>
      </ul>
    </div>
  );
};

export default StickyDesktopNav;
