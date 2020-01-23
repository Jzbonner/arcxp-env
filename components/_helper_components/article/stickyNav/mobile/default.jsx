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
    <div className="c-stickyNav-mobile">
      <ul className="c-stickyNav-list">
        <li className="stickyNav-item">
          <a href={shareLinkFacebook} className="sticky-nav-icon facebook-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item">
          <a href={shareLinkTwitter} className="sticky-nav-icon twitter-icon" target="__blank"></a>
        </li>
        <li className="stickyNav-item arrow-icon" onClick={e => handleClick(e)}>
          <a href="#" className={`sticky-nav-icon ${isClicked ? 'arrow-up-icon' : 'arrow-down-icon'}`} target="__blank"></a>
          {isClicked ? (
            <ul className="stickyNav-list-is-hidden">
              <li className="stickyNav-item is-visible">
                <a href={shareLinkPinterest} className="sticky-nav-icon pinterest-icon" target="__blank"></a>
              </li>
              <li className="stickyNav-item is-visible">
                <a href={shareLinkReddit} className="sticky-nav-icon reddit-icon" target="__blank"></a>
              </li>
              <a className="stickyNav-item is-visible">
                <a href={shareLinkEmail} className="sticky-nav-icon mail-icon" target="__blank"></a>
              </a>
              {commentsEnabled ? (
                <li className="stickyNav-item is-visible">
                  <a href="#" className="sticky-nav-icon comments-icon"></a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

StickyMobileNav.propTypes = {
  commentsEnabled: PropTypes.object,
  shareLinkFacebook: PropTypes.string,
  shareLinkTwitter: PropTypes.string,
  shareLinkPinterest: PropTypes.string,
  shareLinkReddit: PropTypes.string,
  shareLinkEmail: PropTypes.string,
};

export default StickyMobileNav;
