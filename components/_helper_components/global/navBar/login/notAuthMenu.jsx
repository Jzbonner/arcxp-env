import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import fetchEnv from '../../utils/environment';
import openMg2Widget from './_helper_functions/openMg2Widget';
import userIcon from '../../../../../resources/icons/login/user-icon.svg';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';

const NotAuthMenu = ({
  isMobile, isFlyout, showUserMenu, setShowUserMenu,
}) => {
  const loginEl = useRef(null);
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
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
      const expirationTime = localStorage.getItem('logoutMenuExpiration');

      // Update expiration no matter what
      const newDate = new Date();
      localStorage.setItem('logoutMenuExpiration', newDate);

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
  showUserMenu: PropTypes.string,
  setShowUserMenu: PropTypes.func,
};

export default NotAuthMenu;
