import React, { useEffect } from 'react';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import NavFooter from '../navFooter/default';
import '../../../../../src/styles/container/_c-headerNav.scss';

const HamburgerMenu = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory, smallLogoUrl,
  stickyActive, siteName, hasWindowShade,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { weatherPageURL } = getProperties(arcSite) || {};
  const weatherPageUrl = weatherPageURL || '/weather/';

  useEffect(() => {
    document.body.style.position = hamburgerToggle && isMobile ? 'static' : '';
    window.isMobileBP = isMobile;
  }, [hamburgerToggle, isMobile]);

  return (
  <>
  <div className={`nav-wrapper ${hamburgerToggle && isMobile ? 'isVisible' : ''}`}></div>
  <nav className={`
  ${hamburgerToggle ? 'mobile-nav-activated' : ''}
  ${(stickyActive || hasWindowShade) && !isMobile ? 'is-hidden' : ''}
  nav-mobile`}>
    <div className='nav-menu-toggle' onClick={(e) => { e.preventDefault(); setToggle(false); }}>
        <div className='nav-close-button'></div>
    </div>
    <div className='nav-menu-header'>
      <a href={rootDirectory}>
        <img src={smallLogoUrl} className={`nav-menu-logo ${siteName}`}></img>
      </a>
    </div>
    <ul className='nav-row'>
      <NavFooter />
      <li className='nav-weather-widget'></li>
      <div className='nav-itemBottomBorder nav-sections'>
      {sections}
      <Search sticky={stickyActive}/>
      </div>
      <Weather weatherPageUrl={weatherPageUrl}/>
      <div className='nav-mobile-login'>
        <Login isMobile={isMobile} isFlyout={isMobile}/>
      </div>
    </ul>
  </nav>
  </>
  );
};

HamburgerMenu.propTypes = {
  sections: PropTypes.array,
  isMobile: PropTypes.bool,
  hamburgerToggle: PropTypes.bool,
  setToggle: PropTypes.func,
  smallLogoUrl: PropTypes.string,
  rootDirectory: PropTypes.string,
  stickyActive: PropTypes.bool,
  siteName: PropTypes.string,
  hasWindowShade: PropTypes.bool,
};

export default HamburgerMenu;
