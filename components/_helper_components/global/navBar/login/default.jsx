/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import { connext } from 'fusion:environment';
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
  const {
    isEnabled = false,
    clientCode,
  } = connext;

  return isEnabled && (
    <li className={`nav-login nav-items ${isSticky ? 'isSticky' : ''}`} data-mg2-action='register'>
      <img src={source} />
      <div className='nav-itemText login-text is-profileAnon'>Log in</div>
      <div className='nav-itemText login-text is-profileAuthed'>My Profile</div>
      <div className={'section is-profileAuthed'}>
        <div className={'section-item'}>
          <a href={`//myaccount.${clientCode}.com/${clientCode}/myprofile`}>
            <img src={source} />
            <div className='nav-itemText login-text'>My Profile</div>
          </a>
        </div>
        <div className={'subNav'}>
          <ul className={'subNav-flyout'}>
            <li className={'flyout-item'}>
              <a href={`//myaccount.${clientCode}.com/${clientCode}/dashboard`} target='_blank'>My Account</a>
            </li>
            <li className={'flyout-item'}>
              <a href={`//myaccount.${clientCode}.com/${clientCode}/preference`} target='_blank'>Newsletters</a>
            </li>
            <li className={'flyout-item'}>
              <a href={`//events.${clientCode}.com`}>Events</a>
            </li>
            <li className={'flyout-item'}>
              <a href='/our-products/'>Our Products</a>
            </li>
            <li className={'flyout-item MG2activation'}>
              <a href='#' data-mg2-action='activation'>Activate My Account</a>
            </li>
          </ul>
          <a href='#' className='btn-logout nav-profileLogout' data-mg2-action='logout'>Logout</a>
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
