import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import Comments from '../comments/comments';
import Login from '../../global/navBar/login/default';
import RedesignNavLinks from '../../global/navBar/redesignNavLinks/default';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import RedditIcon from './_helper_functions/RedditIcon.js';
import EmailIcon from './_helper_functions/MailIcon.js';
import FbIcon from './_helper_functions/FbIcon.js';
import TwitterIcon from './_helper_functions/TwitterIcon.js';
import PinterestIcon from './_helper_functions/PinterestIcon.js';
import CommentIcon from './_helper_functions/CommentIcon.js';
import '../../../../src/styles/container/_c-headerNav.scss';

const StickyNav = ({
  headlines, comments = false, setStickyNavVisibility, stickyNavVisibility,
  isMobileVisibilityRef, logoRef, setToggle, paddingRef, type, sections, articleUrl, hasWindowShade = false, darkMode, darkModeLogo,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    facebookURL, twitterURL, pinterestURL, redditURL, mail, siteName, logoRedesign, pinterestShareLogo, cdnOrg, cdnSite,
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

  const logoPath = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoRedesign}`)}`;

  const siteNameLower = siteName.toLowerCase();

  // Handles comments window visibility.
  // This state is managed in this component because the window's visibility is controlled
  // by a click on the comment button in the sticky nav bar
  const [commentVisibility, _setCommentVisibility] = useState(false);
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
    setCommentVisibility(!commentVisibilityRef.current);
    setStickyVisibility(!stickyShouldBeHidden());
  };

  const handleScroll = () => {
    // Handles sticky visibility if scrolling down past top(mobile) or bottom(desktop) of logo.
    if (!stickyVisibilityRef.current
      && logoRef.current
      && (stickyShouldBeVisible() || hasWindowShade)) {
      setStickyVisibility(true);
    }

    // Handles sticky visibility if scrolling up past bottom of padding between sticky nav and page content.
    if (stickyVisibilityRef.current
      && paddingRef.current
      && stickyShouldBeHidden() && !hasWindowShade) {
      setStickyVisibility(false);
    }
  };

  // Sets event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', () => {
      /* setDropdownVisibility(false); */
      if (commentVisibilityRef.current) {
        setCommentVisibility(false);
      }
    });
  }, []);

  const isNonShareablePage = !articleUrl || !type || type.includes('homepage') || type.includes('section');

  return (
    <>
      <div className={`stickyNav b-sectionHomeMaxWidth ${hasWindowShade || stickyVisibilityRef.current ? 'is-visible' : ''}`}>
        <div className='b-flexRow c-stickyLogin'>
          <RedesignNavLinks sections={sections} arcSite={arcSite} setToggle={setToggle} siteName={siteNameLower} logoPath={darkMode && siteNameLower === 'ajc' ? darkModeLogo : logoPath} isNonShareablePage={isNonShareablePage} darkMode={darkMode} />
          <ul className={`c-stickyNav-list ${siteNameLower}`}>
            <div className={`stickyNav-social ${isNonShareablePage ? 'hidden' : ''}`}>
              <li className="stickyNav-item fb-icon" >
                <a href={shareLinkFacebook} target="__blank">
                  <FbIcon />
                </a>
              </li>
              <li className="stickyNav-item twitter-icon" >
                <a href={shareLinkTwitter} target="__blank">
                  <TwitterIcon />
                </a>
              </li>
              <li className="stickyNav-item pin-icon" >
                <a href={shareLinkPinterest} target="__blank">
                  <PinterestIcon />
                </a>
              </li>
              <li className="stickyNav-item reddit-icon" >
                <a href={shareLinkReddit} target="__blank">
                  <RedditIcon />
                </a>
              </li>
              <li className="stickyNav-item mail-icon" >
                <a href={shareLinkEmail} target="__blank">
                  <EmailIcon />
                </a>
              </li>
              {commentsEnabled ? (
                <li className="stickyNav-item comment-icon">
                  <a href="#" className="sticky-nav-icon" onClick={e => toggleCommentsWindow(e)}>
                    <CommentIcon />
                    <span className="fb-comments-count" data-href={articleShareUrl}></span>
                  </a>
                </li>
              ) : null}
            </div>
          </ul>
          <div className={`${isNonShareablePage ? '' : 'hidden-mobile'}`}>
            <Login isMobile={isMobileVisibilityRef.current} isFlyout={false} isSticky={stickyVisibilityRef.current} darkMode={darkMode} />
          </div>
        </div>
      </div>
      { !isNonShareablePage
        && <Comments
          commentVisibility={commentVisibility}
          toggleCommentsWindow={toggleCommentsWindow}
          articleUrl={articleShareUrl} />}
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
  hasWindowShade: PropTypes.bool,
  darkMode: PropTypes.bool,
  darkModeLogo: PropTypes.string,
};

export default StickyNav;
