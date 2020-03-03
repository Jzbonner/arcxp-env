import React from 'react';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import '../default.scss';

const DesktopNav = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory,
}) => (
  <nav className={`${hamburgerToggle} ${isMobile ? 'nav-mobile' : ''}`}>
    <div className='nav-menu-toggle' onClick={() => { setToggle(false); }}>
      <div className='nav-flyout-button'></div>
    </div>
    <div className='nav-menu-header'><a href={rootDirectory}>
      <img src='https://ajc.com/r/PortalConfig/np-ajc/assets-one/ajc/images/logo-mobile-hamburger.svg' className='nav-menu-logo'></img>
    </a></div>
    <ul className='nav-row'>
      <div className='nav-sections'>{sections}</div>
      <Search/>
      <Weather/>
      <div className='nav-mobile-login'>
        <Login/>
      </div>
    </ul>
  </nav>
);

DesktopNav.propTypes = {
  sections: PropTypes.array,
  isMobile: PropTypes.bool,
  hamburgerToggle: PropTypes.string,
  setToggle: PropTypes.func,
  // smallLogoUrl: PropTypes.string,
  rootDirectory: PropTypes.small,
};

export default DesktopNav;
