/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../utils/environment';
import '../default.scss';
import userIcon from '../../../../../resources/icons/login/user-icon.svg';
import userIconWhite from '../../../../../resources/icons/login/user-icon-white.svg';

const Login = ({ isMobile, isFlyout, isSticky }) => {
  let source;
  if (!isMobile || !isFlyout) {
    source = userIcon;
  } else {
    source = userIconWhite;
  }
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const {
    isEnabled = false,
    clientCode,
  } = connext[currentEnv] || {};

  if (!isEnabled) {
    return null;
  }

  const accountSubdomain = `//${currentEnv !== 'prod' ? 'test-' : ''}myaccount`;

  const profileLink = `${accountSubdomain}.${clientCode}.com/${clientCode}/myprofile`;
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
      if (!isSticky) {
        showUserMenuRef.current = data;
        _setShowUserMenu(data);
      } else if (userStateRef.current !== 'logged-out') {
        window.location.href = profileLink;
      }
    }
  };

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
    <li className={`nav-login nav-items ${isSticky ? 'isSticky' : ''}`}>
      <div
        data-mg2-action={userStateRef.current === 'logged-out' ? 'register' : ''}
        onClick={(e) => { e.preventDefault(); setShowUserMenu(!showUserMenuRef.current); }}>
        <img src={source} />
        <div className='nav-itemText login-text is-profileAnon'>Log in</div>
        <div className='nav-itemText login-text is-profileAuthed'>My Profile</div>
      </div>
      <div className={`section is-profileAuthed ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
        <div className={'section-item'}>
          <a href={profileLink}>
            <img src={source} />
            <div className='nav-itemText login-text'>My Profile</div>
          </a>
        </div>
        <div className={`subNav ${isMobile && showUserMenu ? 'isVisible' : ''}`}>
          <ul className={'subNav-flyout'}>
            {isMobile && <li className={'flyout-item'}>
              <a href='#' className='nav-profileLogout' data-mg2-action='logout'><b>Logout</b></a>
            </li>}
            <li className={'flyout-item'}>
              <a href={`${accountSubdomain}.${clientCode}.com/${clientCode}/dashboard`} target='_blank'>My Account</a>
            </li>
            <li className={'flyout-item'}>
              <a href={`${accountSubdomain}.${clientCode}.com/${clientCode}/preference`} target='_blank'>Newsletters</a>
            </li>
            <li className={'flyout-item'}>
              <a href={`//events.${clientCode}.com`}>Events</a>
            </li>
            <li className={'flyout-item'}>
              <a href='/our-products/'>Our Products</a>
            </li>
            {userStateRef.current !== 'authenticated' && <li className={'flyout-item MG2activation'}>
                <a href='#' data-mg2-action='activation'>Activate My Account</a>
            </li>}
          </ul>
          {!isMobile && <a href='#' className='btn-logout nav-profileLogout' data-mg2-action='logout'>Logout</a>}
        </div>
      </div>
    </li>
  );
};


Login.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  isSticky: PropTypes.bool,
};

export default Login;
