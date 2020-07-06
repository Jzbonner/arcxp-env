import React, { useEffect } from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import NavFooter from '../navFooter/default';
import '../default.scss';

const DesktopNav = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory, smallLogoUrl, social,
  stickyActive, siteName,
}) => {
  const {
    twitter,
    facebook,
  } = social || {};
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { weatherPageURL } = getProperties(arcSite) || {};
  const weatherPageUrl = weatherPageURL || '/weather/';
  const appContext = useAppContext();
  const {
    layout,
    requestUri,
  } = appContext;

  useEffect(() => {
    document.body.style.position = hamburgerToggle && isMobile ? 'static' : '';
    document.body.style.overflowY = hamburgerToggle && isMobile ? 'hidden' : '';
    window.isMobileBP = isMobile;
  }, [hamburgerToggle, isMobile]);

  return (
  <>
  <div className={`nav-wrapper ${hamburgerToggle && isMobile ? 'isVisible' : ''}`}></div>
  <nav className={`
  ${hamburgerToggle && isMobile ? 'mobile-nav-activated' : ''}
  ${isMobile ? 'nav-mobile' : ''}
  ${stickyActive && !isMobile ? 'is-hidden' : ''}`}>
    <div className='nav-menu-toggle' onClick={(e) => { e.preventDefault(); setToggle(false); }}>
        <div className='nav-close-button'></div>
    </div>
    <div className='nav-menu-header'>
      <a href={rootDirectory}>
        <img src={smallLogoUrl} className={`nav-menu-logo ${siteName}`}></img>
      </a>
    </div>
    <ul className='nav-row'>
      <NavFooter facebook={facebook} twitter={twitter}/>
      {layout !== 'homepage-basic' && !(layout.indexOf('section') > -1 && requestUri.indexOf(weatherPageUrl) !== -1)
        && <li className='nav-weather-widget'>
        {
          // we're loading the widget in /resources/scripts/weather.js for now, to get around React's js-parsing limitations
          // this (all) will eventually change when we move to API-generated weather data sitewide
        }
        <div id='aw-widget-st'></div>
      </li>}
      <div className='nav-itemBottomBorder nav-sections'>
      {sections}
      <Search sticky={stickyActive}/>
      </div>
      <Weather sticky={stickyActive}/>
      <div className='nav-mobile-login'>
        <Login isMobile={isMobile} isFlyout={isMobile}/>
      </div>
    </ul>
  </nav>
  </>
  );
};

DesktopNav.propTypes = {
  sections: PropTypes.array,
  isMobile: PropTypes.bool,
  hamburgerToggle: PropTypes.bool,
  setToggle: PropTypes.func,
  smallLogoUrl: PropTypes.string,
  rootDirectory: PropTypes.string,
  social: PropTypes.object,
  stickyActive: PropTypes.bool,
  siteName: PropTypes.string,
};

export default DesktopNav;
