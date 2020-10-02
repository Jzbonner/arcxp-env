import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import fetchEnv from '../../utils/environment';
import openMg2Widget from './_helper_functions/openMg2Widget';
import triggerGtmEvent from '../../siteMetrics/_helper_functions/triggerGtmEvent';
import userIcon from '../../../../../resources/icons/login/user-icon.svg';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';

const NotAuthMenu = ({
  isMobile, isFlyout, showUserMenu, setShowUserMenu, arcSite,
}) => {
  const loginEl = useRef(null);
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const { siteCode } = connext[currentEnv] || {};

  let source;
  if (isMobile || isFlyout) {
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

  const { children } = siteContent || [];

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      loginEl.current.classList.remove('fadeInOut');
      const expirationTime = localStorage.getItem(`${arcSite}_logoutMenuExpiration`);

      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );

      const nowInMs = Date.parse(now);
      const midnightInMs = Date.parse(midnight);
      const expirationInMs = Date.parse(expirationTime);

      // Display menu if any of these are true
      if (
        !expirationTime
        || nowInMs - expirationInMs > 1000 * 60 * 30
        || (expirationInMs < midnightInMs && midnightInMs < nowInMs)
      ) {
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

  const renderLoginButton = () => <button
    className='btn-profile'
    data-mg2-action='login'
    onClick={(e) => {
      e.preventDefault();
      triggerGtmEvent('loginEvent_start', 'connextLoggedIn', 'loginEvent_complete');
      setShowUserMenu(!showUserMenu);
    }}
  >
    Log In
  </button>;

  return (
    <>
      <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <img src={source} />
        <div className='nav-itemText login-text'>Log In</div>
      </div>

      <div ref={loginEl} className={`section login-menu ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
        <div className={'section-item'}>
          <a>
            <img src={source} />
            <div className='nav-itemText login-text'>Log In</div>
          </a>
        </div>
        <div className={`subNav ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
          {!isMobile && renderLoginButton()}
          <ul className={'subNav-flyout'}>
            {isMobile && (
              <li className={'flyout-item'}>
                 {renderLoginButton()}
              </li>
            )}

            {Array.isArray(children)
            && children.map((child) => {
              const destination = child._id.includes('/configsection')
                ? child.site && child.site.site_url
                : child._id;
              if (child && child.name && child.name.toLowerCase() === 'newsletters') {
                return (
                  <li className={'flyout-item'} key={child.name}>
                    <a href="#" onClick={() => openMg2Widget(siteCode)}>
                      {child.name}
                    </a>
                  </li>
                );
              }
              return (
                  <li className={'flyout-item'} key={child.name}>
                    <a href={destination} target='_blank' rel="noopener noreferrer">
                      {child.name}
                    </a>
                  </li>
              );
            })}
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
};

export default NotAuthMenu;
