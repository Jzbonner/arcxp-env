import React, { useEffect, useState } from 'react';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import NavFooter from '../navFooter/default';
import NavCopyright from '../navCopyright/default';
import Overlay from '../../overlay/default';
import '../../../../../src/styles/container/_c-headerNav.scss';

const HamburgerMenu = ({
  sections, hamburgerToggle, isMobile, setToggle, rootDirectory, whiteLogoRedesign,
  stickyActive, siteName, closeButton, burgerMenuBackground, navFooterContent,
}) => {
  const [isTablet, setTabletState] = useState(false);
  const windowExists = typeof window !== 'undefined';
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const handleWindowSize = () => {
    if (window.innerWidth <= 1023) {
      setTabletState(true);
    } else {
      setTabletState(false);
    }
  };
  useEffect(() => {
    document.body.style.position = hamburgerToggle && isMobile ? 'static' : '';
    window.isMobileBP = isMobile;
    if (windowExists) handleWindowSize();
  }, []);

  useEffect(() => {
    if (hamburgerToggle) {
      document.querySelector('.nav-mobile').scrollTo(0, 0);
    }
  }, [hamburgerToggle]);

  return (
  <>
  <Overlay toggle={hamburgerToggle} setToggle={setToggle}/>
  <nav className={`
  ${hamburgerToggle ? 'mobile-nav-activated' : ''}
  nav-mobile`}>
    {isTablet && <div className='nav-mobile-login'>
        <Login isMobile={isMobile} isFlyout={isMobile} isSidebar/>
      </div>}
      {isTablet && <Search sticky={stickyActive} isSidebar={true}/>}
    {arcSite === 'ajc' && <div className="nav-background">
      <img className="ajc-burgerBackgrnd" src={burgerMenuBackground} alt="ajc-burgerMenu-background"/>
    </div>}
    <div className='nav-menu-toggle' onClick={(e) => { e.preventDefault(); setToggle(false); }}>
        <img src={closeButton} alt="close-btn"/>
    </div>
    <ul className='nav-row'>
      {sections}
    </ul>
    <div className='nav-menu-header'>
      <a href={rootDirectory}>
        <img src={whiteLogoRedesign} className={`nav-menu-logo ${siteName}`} alt={`${siteName} logo in background`}></img>
      </a>
      <NavFooter navFooterContent={navFooterContent}/>
      <NavCopyright />
    </div>
  </nav>
  </>
  );
};

HamburgerMenu.propTypes = {
  sections: PropTypes.array,
  isMobile: PropTypes.bool,
  hamburgerToggle: PropTypes.bool,
  setToggle: PropTypes.func,
  whiteLogoRedesign: PropTypes.string,
  rootDirectory: PropTypes.string,
  stickyActive: PropTypes.bool,
  siteName: PropTypes.string,
  hasWindowShade: PropTypes.bool,
  closeButton: PropTypes.string,
  burgerMenuBackground: PropTypes.string,
  navFooterContent: PropTypes.object,
};

export default HamburgerMenu;
