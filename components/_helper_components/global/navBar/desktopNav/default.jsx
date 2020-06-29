import React, { useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import NavFooter from '../navFooter/default';
import '../default.scss';

const DesktopNav = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory, smallLogoUrl, social,
  stickyActive,
}) => {
  const {
    twitter,
    facebook,
  } = social || {};
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
      <div className='nav-flyout-button'></div>
    </div>
    <div className='nav-menu-header'>
      <a href={rootDirectory}>
        <img src={smallLogoUrl} className='nav-menu-logo'></img>
      </a>
    </div>
    <ul className='nav-row'>
      <NavFooter facebook={facebook} twitter={twitter}/>
      {layout !== 'homepage-basic' && !(layout.indexOf('section') > -1 && requestUri.indexOf('/weather/') !== -1)
        && <li className='nav-weather-widget'>
        {
          // we're loading the widget in /resources/scripts/weather.js for now, to get around React's js-parsing limitations
          // this (all) will eventually change when we move to API-generated weather data sitewide
        }
        <div id='aw-widget-st'></div>
      </li>}
      <div className='nav-sections nav-itemBottomBorder'>{sections}</div>
      <Search sticky={stickyActive}/>
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
};

export default DesktopNav;
