import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import userIcon from '../../../../../resources/icons/login/user-icon.svg';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';

const NotAuthMenu = ({
  isMobile, isFlyout, showUserMenu, setShowUserMenu, arcSite,
}) => {
  const loginEl = useRef(null);

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
      const expirationTime = localStorage.getItem(`${arcSite}_logoutMenuExpiration`);

      // Update expiration no matter what
      const newDate = new Date();
      const minutes = newDate.getMinutes();
      newDate.setMinutes(30 + minutes);
      localStorage.setItem(`${arcSite}_logoutMenuExpiration`, newDate);

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
        loginEl.current.classList.remove('fadeInOut');
        loginEl.current.classList.add('fadeInOut');
      }
    }
  }, []);

  return (
    <>
      <div onClick={() => setShowUserMenu(!showUserMenu)}>
        <img src={source} />
        <div className='nav-itemText login-text'>Log In</div>
      </div>

      <div
        ref={loginEl}
        className={`section login-menu ${
          isMobile && showUserMenu ? 'isVisible' : ''
        }`}
      >
        <div className={'section-item'}>
          <a>
            <img src={source} />
            <div className='nav-itemText login-text'>Log In</div>
          </a>
        </div>
        <div
          className={`subNav ${isMobile && showUserMenu ? 'isVisible' : ''}`}
        >
          {!isMobile && (
            <button
              className='btn-profile'
              data-mg2-action='login'
              onClick={(e) => {
                e.preventDefault();
                setShowUserMenu(!showUserMenu);
              }}
            >
              Log In
            </button>
          )}
          <ul className={'subNav-flyout'}>
            {isMobile && (
              <li className={'flyout-item'}>
                <button
                  className='btn-profile'
                  data-mg2-action='login'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  Log In
                </button>
              </li>
            )}

            {Array.isArray(children)
            && children.map((child) => {
              const destination = child._id.includes('/configsection')
                ? child.site && child.site.site_url
                : child._id;
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
  showUserMenu: PropTypes.string,
  setShowUserMenu: PropTypes.func,
  arcSite: PropTypes.string,
};

export default NotAuthMenu;
