/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../utils/environment';
import GetConnextLocalStorageData from '../../connext/connextLocalStorage';
import NotAuthMenu from './notAuthMenu';
import IsAuthMenu from './isAuthMenu';

const Login = ({
  isMobile, isFlyout, isSticky, isSidebar,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, cdnSite } = getProperties(arcSite);
  const {
    isEnabled = false,
    siteCode,
    configCode,
    environment,
  } = connext[currentEnv] || {};

  if (!isEnabled) {
    return null;
  }

  let connextSite = cdnSite;
  if (arcSite === 'dayton') {
    connextSite = 'daytondailynews';
  } else if (
    arcSite === 'dayton-daily-news'
    || arcSite === 'springfield-news-sun'
  ) {
    connextSite = connextSite.replace(/-/g, '');
  }

  const accountSubdomain = `//${currentEnv !== 'prod' ? 'test-' : ''}myaccount`;

  const connextDomain = `${accountSubdomain}.${connextSite}.com/${
    siteCode ? siteCode.toLowerCase() : connextSite
  }`;
  const profileLink = `${connextDomain}/myprofile`;
  const [userState, _setUserState] = useState('');
  const [showUserMenu, _setShowUserMenu] = useState(false);
  const userStateRef = React.useRef(userState);
  const showUserMenuRef = React.useRef(showUserMenu);

  const setUserState = (data) => {
    userStateRef.current = data;
    _setUserState(data);
  };

  const setShowUserMenu = (data) => {
    if (isMobile) {
      if (userStateRef.current !== 'logged-out') {
        window.location.href = profileLink;
      }
    }
    showUserMenuRef.current = data;
    _setShowUserMenu(data);
  };

  const connextLocalStorageData = GetConnextLocalStorageData(siteCode, configCode, environment) || {};
  const { UserState, CustomerRegistrationId } = connextLocalStorageData;
  const getState = () => {
    if (typeof window !== 'undefined' && UserState) {
      let currentState;
      switch (UserState.toLowerCase()) {
        case 'logged out':
          currentState = 'logged-out';
          break;
        case 'logged in':
          currentState = 'logged-in';
          break;
        default:
          currentState = UserState;
      }
      return currentState;
    }

    return UserState;
  };
  useEffect(() => {
    setUserState(getState());
  }, [UserState]);

  const useWindowEvent = (event, trigger) => {
    const callback = () => setUserState(trigger);
    useEffect(() => {
      window.addEventListener(event, callback);
      return () => window.removeEventListener(event, callback);
    }, [event, trigger]);
  };

  useWindowEvent('connextLoggedIn', 'logged-in');
  useWindowEvent('connextLoggedOut', 'logged-out');
  useWindowEvent('connextIsSubscriber', 'authenticated');

  return (
    <div className={`${isSidebar ? 'c-login-bmenu' : `c-login ${isSticky ? 'isSticky' : ''}`} ${connextSite}`}>
      {(userStateRef.current === 'logged-in'
      || userStateRef.current === 'authenticated') && (
        <IsAuthMenu
          isMobile={isMobile}
          isFlyout={isFlyout}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          userStateRef={userStateRef}
          custRegId={CustomerRegistrationId}
          isSidebar={isSidebar}
        />
      )}
      {userStateRef.current === 'logged-out' && (
        <NotAuthMenu
          isMobile={isMobile}
          isFlyout={isFlyout}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
          arcSite={arcSite}
          isSidebar={isSidebar}
        />
      )}
    </div>
  );
};

Login.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  isSticky: PropTypes.bool,
  isSidebar: PropTypes.bool,
};

export default Login;
