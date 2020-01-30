import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const StickyMobileNav = ({
  commentsEnabled, shareLinkFacebook, shareLinkTwitter, shareLinkPinterest, shareLinkReddit, shareLinkEmail,
}) => {
  const [isClicked, clickArrow] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    clickArrow(!isClicked);
  };

  return (
    <nav className="c-stickyNav-mobile">
      <ul className="c-stickyNav-list">
        <li className="stickyNav-item">
          <a href={shareLinkFacebook} className="sticky-nav-icon btn-facebook" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkTwitter} className="sticky-nav-icon btn-twitter" target="__blank"></a>
        </li>
        <li className={`stickyNav-item arrow-icon ${isClicked ? 'is-hidden' : ''}`} onClick={e => handleClick(e)}>
          <a href="#" className="sticky-nav-icon btn-arrow-down" target="__blank"></a>
        </li>
        {isClicked ? (
          <li className="stickyNav-item">
            <ul className="stickyNav-list-is-hidden">
              <li className="stickyNav-item is-visible arrow-icon" onClick={e => handleClick(e)}>
                <a href="#" className="sticky-nav-icon btn-arrow-up" target="__blank"></a>
              </li>
              <li className="stickyNav-item is-visible">
                <a href={shareLinkPinterest} className="sticky-nav-icon btn-pinterest" target="__blank"></a>
              </li>
              <li className="stickyNav-item is-visible">
                <a href={shareLinkReddit} className="sticky-nav-icon btn-reddit" target="__blank"></a>
              </li>
              <li className="stickyNav-item is-visible">
                <a href={shareLinkEmail} className="sticky-nav-icon btn-mail" target="__blank"></a>
              </li>
              {commentsEnabled ? (
                <li className="stickyNav-item is-visible">
                  <a href="#" className="sticky-nav-icon btn-comments"></a>
                </li>
              ) : null}
            </ul>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

StickyMobileNav.propTypes = {
  commentsEnabled: PropTypes.bool,
  shareLinkFacebook: PropTypes.string,
  shareLinkTwitter: PropTypes.string,
  shareLinkPinterest: PropTypes.string,
  shareLinkReddit: PropTypes.string,
  shareLinkEmail: PropTypes.string,
};

export default StickyMobileNav;
