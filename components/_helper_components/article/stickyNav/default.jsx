import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import './default.scss';
import logo from '../../../../resources/images/stickyNav-logo.svg';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import Comments from '../comments/comments';
import Login from '../../global/navBar/login/default';
import '../../global/navBar/default.scss';

const StickyNav = ({
  headlines, comments = false, setStickyNavVisibility, stickyNavVisibility,
  isMobileVisibilityRef, logoRef, setToggle, paddingRef, type, sections, articleUrl,
}) => {
  const {
    facebookURL, pinterestURL, twitterURL, redditURL, mail, siteName,
  } = getProperties();
  const { basic: articleHeadline } = headlines || {};
  const { allow_comments: commentsEnabled } = comments || {};
  const shareLinkFacebook = `${facebookURL}${articleUrl}`;
  const shareLinkTwitter = `${twitterURL}${articleUrl}&text=${articleHeadline}`;
  const shareLinkPinterest = `${pinterestURL}${articleUrl}&media=${renderImage()}&description=${articleHeadline}`;
  const shareLinkReddit = `${redditURL}${articleUrl}&title=${articleHeadline}`;
  const shareLinkEmail = `${mail}${articleHeadline}&body=${articleUrl}`;

  // Handles comments window visibility.
  // This state is managed in this component because the window's visibility is controlled
  // by a click on the comment button in the sticky nav bar
  const [commentVisibility, _setCommentVisibility] = useState(false);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const commentVisibilityRef = React.useRef(commentVisibility);
  const stickyVisibilityRef = React.useRef(stickyNavVisibility);

  const stickyShouldBeVisible = () => (isMobileVisibilityRef.current && logoRef.current.getBoundingClientRect().top < 17)
    || (!isMobileVisibilityRef.current && logoRef.current.getBoundingClientRect().bottom <= 1);

  const stickyShouldBeHidden = () => (isMobileVisibilityRef.current
        && paddingRef.current.getBoundingClientRect().bottom >= 90 && !commentVisibilityRef.current)
        || (!isMobileVisibilityRef.current && paddingRef.current.getBoundingClientRect().bottom >= 71 && !commentVisibilityRef.current);

  const setCommentVisibility = (data) => {
    commentVisibilityRef.current = data;
    _setCommentVisibility(data);
  };

  const setStickyVisibility = (data) => {
    stickyVisibilityRef.current = data;
    setStickyNavVisibility(data);
  };
  const toggleCommentsWindow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentVisibilityRef.current) {
      document.getElementsByTagName('body')[0].classList.add('scrollLock-mobile');
      setDropdownVisibility(false);
    } else {
      document.getElementsByTagName('body')[0].classList.remove('scrollLock-mobile');
    }
    setCommentVisibility(!commentVisibilityRef.current);
    setStickyVisibility(!stickyShouldBeHidden());
  };

  const handleScroll = () => {
    // Handles sticky visibility if scrolling down past top(mobile) or bottom(desktop) of logo.
    if (!stickyVisibilityRef.current
      && logoRef.current
      && stickyShouldBeVisible()) {
      setStickyVisibility(true);
    }

    // Handles sticky visibility if scrolling up past bottom of padding between sticky nav and page content.
    if (stickyVisibilityRef.current
      && paddingRef.current
      && stickyShouldBeHidden()) {
      setStickyVisibility(false);
    }
  };


  // Handles mobile dropdown visibility

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
      <div className={`stickyNav ${stickyVisibilityRef.current ? 'is-visible' : ''}`}>
        <ul className="c-stickyNav-list">
        <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
          <div className='nav-flyout-button'>
          </div>
        </div>
          <li className="stickyNav-item mobile-hidden">
            <a href="/">
              <img className="sticky-logo" src={logo} alt={`${siteName} logo`} />
            </a>
          </li>
          <div className={`stickyNav-social ${type === 'homepage-basic' || type === 'section-basic' ? 'hidden' : ''}`}>
            <li className="stickyNav-item">
              <a href={shareLinkFacebook} className="sticky-nav-icon btn-facebook" target="__blank"></a>
            </li>
            <li className="stickyNav-item">
              <a href={shareLinkTwitter} className="sticky-nav-icon btn-twitter" target="__blank"></a>
            </li>
            <ul className={`c-stickyNav-list dropdown-stickyNav ${dropdownVisibility ? 'is-open' : ''}`}>
              <li className="stickyNav-item arrow-icon desktop-hidden" onClick={e => toggleMobileDropdownMenu(e)}>
                <a href="#" className="sticky-nav-icon btn-arrow-down" target="__blank"></a>
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
                    <span className="fb-comments-count" data-href={articleUrl}></span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </ul>
        <div className='b-flexRow c-stickyLogin'>
          <div className={`sticky-logo-homepage ${type === 'homepage-basic' || type === 'section-basic' ? '' : 'hidden'}`}>
            <a href="/">
              <img src={logo} alt={`${siteName} logo`} />
            </a>
          </div>
          <div className={`stickyNav-homepage ${type === 'homepage-basic' || type === 'section-basic' ? '' : 'hidden'}`}>
            {sections}
          </div>
          <Login isMobile={isMobileVisibilityRef.current} isFlyout={false} isSticky={stickyVisibilityRef.current}/>
        </div>
      </div>
      <Comments commentVisibility={commentVisibility} toggleCommentsWindow={toggleCommentsWindow} articleUrl={articleUrl} />
    </>
  );
};

StickyNav.propTypes = {
  headlines: PropTypes.object,
  comments: PropTypes.object,
  setStickyNavVisibility: PropTypes.func,
  stickyNavVisibility: PropTypes.bool,
  isMobile: PropTypes.bool,
  isMobileVisibilityRef: PropTypes.object,
  logoRef: PropTypes.any,
  setToggle: PropTypes.func,
  paddingRef: PropTypes.object,
  hamburgerToggle: PropTypes.bool,
  type: PropTypes.string,
  sections: PropTypes.array,
  articleUrl: PropTypes.string,
};

export default StickyNav;
