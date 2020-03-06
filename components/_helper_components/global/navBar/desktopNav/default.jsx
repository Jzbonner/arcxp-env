import React from 'react';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import NavFooter from '../navFooter/default';
import '../default.scss';

const DesktopNav = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory, smallLogoUrl, social,
}) => {
  const {
    twitter,
    facebook,
  } = social;
  return (
  <nav className={`${hamburgerToggle} ${isMobile ? 'nav-mobile' : ''}`}>
    {/* <div className={'nav-wrapper'}></div> */}
    <div className='nav-menu-toggle' onClick={() => { setToggle(false); }}>
      <div className='nav-flyout-button'></div>
    </div>
    <div className='nav-menu-header'>
      <a href={rootDirectory}>
        <img src={smallLogoUrl} className='nav-menu-logo'></img>
      </a>
    </div>
    <ul className='nav-row'>
      <NavFooter facebook={facebook} twitter={twitter}/>
      <li className='nav-weather-widget'> Weather Widget</li>
      <div className='nav-sections'>{sections}</div>
      <Search/>
      <Weather/>
      <div className='nav-mobile-login'>
        <Login isMobile={isMobile} isFlyout={isMobile}/>
      </div>
    </ul>
  </nav>
  );
};

DesktopNav.propTypes = {
  sections: PropTypes.array,
  isMobile: PropTypes.bool,
  hamburgerToggle: PropTypes.string,
  setToggle: PropTypes.func,
  smallLogoUrl: PropTypes.string,
  rootDirectory: PropTypes.small,
  social: PropTypes.object,
};

export default DesktopNav;
