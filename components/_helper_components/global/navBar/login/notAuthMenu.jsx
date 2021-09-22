import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import RenderMenuLinks from './_helper_functions/renderMenuLinks';
import triggerGtmEvent from '../../siteMetrics/_helper_functions/triggerGtmEvent';
import userIcon from '../../../../../resources/icons/login/user-icon.svg';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';

const NotAuthMenu = ({
  isMobile, isFlyout, showUserMenu, setShowUserMenu, arcSite, isSidebar, darkMode,
}) => {
  const loginEl = useRef(null);

  let source;
  if (isFlyout || darkMode) {
    source = userIconWhite;
  } else {
    source = userIcon;
  }

  const siteContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'LoggedOutMenu',
    },
  });

  const { children: links = [] } = siteContent || [];

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined' && !isSidebar) {
      loginEl.current.classList.remove('fadeInOut');
      const expirationTime = localStorage.getItem(`${arcSite}_logoutMenuExpiration`);

      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const nowInMs = Date.parse(now);
      const midnightInMs = Date.parse(midnight);
      const expirationInMs = Date.parse(expirationTime);

      // Display menu if any of these are true
      if (!expirationTime || nowInMs - expirationInMs > 1000 * 60 * 30 || (expirationInMs < midnightInMs && midnightInMs < nowInMs)) {
        loginEl.current.classList.add('fadeInOut');
      }

      // Update expiration no matter what
      // Without this timeout, the logoutMenuExpiration gets set before it is read on line 37.
      // Not sure how that is happening.
      setTimeout(() => {
        const newDate = new Date();
        const minutes = newDate.getMinutes();
        newDate.setMinutes(30 + minutes);
        localStorage.setItem(`${arcSite}_logoutMenuExpiration`, newDate);
      }, 1000);
    }
  });

  const renderLoginButton = () => (
    <button
      className="btn-profile"
      data-mg2-action="login"
      onClick={(e) => {
        e.preventDefault();
        triggerGtmEvent('loginEvent_start', 'connextLoggedIn', 'loginEvent_complete');
        setShowUserMenu(!showUserMenu);
      }}
    >
      Log In
    </button>
  );

  if (isSidebar) {
    return (
      <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <img src={userIconWhite} />
        <div data-mg2-action="login" className='login-text-bmenu'>Log In</div>
        <div className="subNav">
          <ul className={`subNav-flyout itemCount-${links.length} logged-in`}>{RenderMenuLinks(links)}</ul>
        </div>
    </div>
    );
  }

  return (
    <>
      <div onClick={() => setShowUserMenu(!showUserMenu)} data-mg2-action={isMobile ? 'login' : ''}>
        <img src={source} />
        <div className='login-text'>Log In</div>
      </div>
      <div ref={loginEl} className={`section login-menu ${!isMobile && showUserMenu ? '' : ''}`}>
        <div className={'section-item'}>
          <a>
            <img src={userIcon} />
            <div className='login-text'>Log In</div>
          </a>
        </div>
        <div className={`subNav ${!isMobile && showUserMenu ? '' : ''}`}>
          {renderLoginButton()}
          <div className='login-separator'></div>
          <ul className={`subNav-flyout itemCount-${links.length} logged-in`}>
            {RenderMenuLinks(links)}
          </ul>
        </div>
      </div>
    </>
  );
};

NotAuthMenu.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  showUserMenu: PropTypes.bool,
  setShowUserMenu: PropTypes.func,
  arcSite: PropTypes.string,
  isSidebar: PropTypes.bool,
  darkMode: PropTypes.bool,
};

export default NotAuthMenu;
