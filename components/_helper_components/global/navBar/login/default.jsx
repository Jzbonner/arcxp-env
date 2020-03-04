import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Login = ({ isMobile, isFlyout }) => {
  let source;
  if (!isMobile || !isFlyout) {
    source = 'https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/user-icon.svg';
  } else {
    source = 'https://ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/user-icon-white.svg';
  }
  return (
    <li className='nav-login'>
      <img src={source}></img>
      <div className='nav-itemText login-text'>Log in</div>
    </li>
  );
};


Login.propTypes = {
  isMobile: PropTypes.bool,
  isFlyout: PropTypes.bool,
};

export default Login;
