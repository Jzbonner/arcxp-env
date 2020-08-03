import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import Comments from '../comments/comments';
import Login from '../../global/navBar/login/default';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import '../../global/navBar/default.scss';
import '../../../../src/styles/container/_c-headerNav.scss';

const StickyNav = ({
  headlines, comments = false, setStickyNavVisibility, stickyNavVisibility,
  isMobileVisibilityRef, logoRef, setToggle, paddingRef, type, sections, articleUrl,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    facebookURL, twitterURL, pinterestURL, redditURL, mail, siteName, logoShort, pinterestShareLogo, cdnOrg, cdnSite,
  } = getProperties(arcSite);
  const appContext = useAppContext();
  const { deployment, contextPath, layout } = appContext;
  const { basic: articleHeadline } = headlines || {};
  const { allow_comments: commentsEnabled } = comments || {};
  let articleShareUrl = articleUrl;
  let site = siteName.toLowerCase();
  if (articleShareUrl && articleShareUrl.indexOf('.com') === -1) {
    const env = fetchEnv();
    // we must fully-qualify the url for sharing
    if (env === 'prod') {
      site = handleSiteName(site);
      articleShareUrl = `https://${site}.com${articleShareUrl}`;
    } else if (env !== 'prod') {
      articleShareUrl = `https://${cdnOrg}-${site}-${env}.cdn.arcpublishing.com${articleShareUrl}`;
    }
  }

  const shareLinkFacebook = `${facebookURL}${articleShareUrl}`;
  const shareLinkTwitter = `${twitterURL}${articleShareUrl}&text=${articleHeadline}`;
  const shareLinkPinterest = `${pinterestURL}${articleShareUrl}&media=${renderImage().indexOf('/resources/logos/') > -1
    ? pinterestShareLogo : renderImage()}&description=${articleHeadline}`;
  const shareLinkReddit = `${redditURL}${articleShareUrl}&title=${articleHeadline}`;
  const shareLinkEmail = `${mail}${articleHeadline}&body=${articleShareUrl}`;

  const logoPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoShort}`)}`;

  const siteNameLower = siteName.toLowerCase();

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
      setDropdownVisibility(false);
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

  const isNonShareablePage = !articleUrl || !type || type === 'homepage-basic' || type === 'section-basic';

  return (
    <>
      <div className={`stickyNav ${stickyVisibilityRef.current ? 'is-visible' : ''}`}>
        <ul className={`c-stickyNav-list ${siteNameLower}`}>
        <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
          <div className='nav-flyout-button'>
          </div>
        </div>
          <li className="stickyNav-item mobile-hidden">
            <a href="/">
              <img className={`sticky-logo ${siteNameLower}`} src={logoPath} alt={`${siteName} logo`} />
            </a>
          </li>
          <div className={`stickyNav-social ${isNonShareablePage ? 'hidden' : ''}`}>
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
                    <span className="fb-comments-count" data-href={articleShareUrl}></span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </ul>
        <div className='b-flexRow c-stickyLogin'>
          <div className={`sticky-logo-homepage ${siteNameLower} ${isNonShareablePage ? '' : 'hidden'}`}>
            <a href="/">
              <img src={logoPath} className={siteNameLower} alt={`${siteName} logo`} />
            </a>
          </div>
          <div className={`stickyNav-homepage ${isNonShareablePage ? '' : 'hidden'}`}>
            {sections}
          </div>
          <Login isMobile={isMobileVisibilityRef.current} isFlyout={false} isSticky={stickyVisibilityRef.current}/>
        </div>
      </div>
              { !isNonShareablePage
              && <Comments
              commentVisibility={commentVisibility}
              toggleCommentsWindow={toggleCommentsWindow}
              articleUrl={articleShareUrl} /> }
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
