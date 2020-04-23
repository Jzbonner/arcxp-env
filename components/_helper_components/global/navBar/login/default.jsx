import React from 'react';
import PropTypes from 'prop-types';
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

  return (
    <li className={`nav-login ${isSticky ? 'isSticky' : ''}`} data-mg2-action="register">
      <img src={source}></img>
      <div className='nav-itemText login-text'>Log in</div>
    </li>
  );
};


Login.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
  isSticky: PropTypes.bool,
};

export default Login;
