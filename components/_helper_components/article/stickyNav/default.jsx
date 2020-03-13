import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import './default.scss';
import tempMenu from '../../../../resources/images/tempMenu.jpg';
import logo from '../../../../resources/images/stickyNav-logo.svg';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import Comments from '../comments/comments';

const StickyNav = ({ articleURL, headlines, comments = false }) => {
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

  // Handles comments window visibility.
  // This state is managed in this component because the window's visibility is controlled
  // by a click on the comment button in the sticky nav bar
  const [commentVisibility, _setCommentVisibility] = useState(false);
  const commentVisibilityRef = React.useRef(commentVisibility);

  const setCommentVisibility = (data) => {
    commentVisibilityRef.current = data;
    _setCommentVisibility(data);
  };

  const toggleCommentsWindow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCommentVisibility(!commentVisibilityRef.current);
  };

  // Handles stick nav visibility
  const [stickyNavVisibility, setStickyNavVisibility] = useState(false);

  const handleScroll = (e) => {
    if (e.currentTarget.pageYOffset > 100) {
      setStickyNavVisibility(true);
    } else if (!commentVisibilityRef.current) {
      setStickyNavVisibility(false);
    }
  };

  // Handles mobile dropdown visibility
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const toggleMobileDropdownMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownVisibility(prev => !prev);
  };

  // Sets event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', () => {
      setDropdownVisibility(false);
      if (commentVisibilityRef.current) {
        setCommentVisibility(false);
      }
    });
  }, []);

  return (
    <>
      <nav className={`c-stickyNav ${stickyNavVisibility ? 'is-visible' : ''}`}>
        <div className="stickyNav">
          <img src={tempMenu} alt="temp-burger-menu" className="desktop-hidden" style={{ maxWidth: '50px', marginRight: '6px' }} />
          <ul className="c-stickyNav-list">
            <li className="stickyNav-item mobile-hidden">
              <a href={siteDomainURL}>
                <img className="logo" src={logo} alt={`${siteName} logo`} />
              </a>
            </li>
            <li className="stickyNav-item">
              <a href={shareLinkFacebook} className="sticky-nav-icon btn-facebook" target="__blank"></a>
            </li>
            <li className="stickyNav-item">
              <a href={shareLinkTwitter} className="sticky-nav-icon btn-twitter" target="__blank"></a>
            </li>
            <ul className={`c-stickyNav-list dropdown-stickyNav ${dropdownVisibility ? 'is-open' : ''}`}>
              <li className="stickyNav-item arrow-icon desktop-hidden" onClick={e => toggleMobileDropdownMenu(e)}>
                <a href="#" className="sticky-nav-icon btn-arrow-up" target="__blank"></a>
              </li>
              <li className="stickyNav-item">
                <a href={shareLinkPinterest} className="sticky-nav-icon btn-pinterest" target="__blank"></a>
              </li>
              <li className="stickyNav-item">
                <a href={shareLinkReddit} className="sticky-nav-icon btn-reddit" target="__blank"></a>
              </li>
              <li className="stickyNav-item">
                <a href={shareLinkEmail} className="sticky-nav-icon btn-mail" target="__blank"></a>
              </li>
              {commentsEnabled ? (
                <li className="stickyNav-item">
                  <a href="#" className="sticky-nav-icon btn-comments" onClick={e => toggleCommentsWindow(e)}>
                    <span className="fb-comments-count" data-href={window.location.href}></span>
                  </a>
                </li>
              ) : null}
            </ul>
          </ul>
        </div>
      </nav>
      <Comments commentVisibility={commentVisibility} toggleCommentsWindow={toggleCommentsWindow} />
    </>
  );
};

StickyNav.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
};

export default StickyNav;
