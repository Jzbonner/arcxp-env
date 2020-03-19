import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import Subscribe from './subscribe/default';
import DesktopNav from './desktopNav/default';
import Login from './login/default';
import StickyNav from '../../article/stickyNav/default';
import '../../../../src/styles/base/_utility.scss';
import '../../../../src/styles/container/_article-basic.scss';
import './default.scss';

const NavBar = ({
  articleURL, headlines, comments, type,
}) => {
  const [mobileMenuToggled, setToggle] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [activeSection, setSection] = useState(-1);
  const [stickyNavVisibility, setStickyNavVisibility] = useState(false);
  const logoRef = useRef(null);
  const paddingRef = React.useRef(null);
  const isMobileVisibilityRef = React.useRef(isMobile);
  const mobileBreakpoint = 1023;

  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    filter: topNavFilter,
  });

  const setStickyMobileRef = (data) => {
    isMobileVisibilityRef.current = data;
    setMobile(data);
  };

  const handleResizeEvent = () => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
      setStickyMobileRef(true);
      setSection(-1);
    } else {
      setMobile(false);
      setStickyMobileRef(false);
      setSection(-1);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
      setStickyMobileRef(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  const {
    site: logos,
    social,
    children,
    _id: rootDirectory,
  } = sections || {};

  const {
    site_logo_image: siteLogoImage,
    site_logo_image_small_inverse: siteLogoImageSmallInverse,
  } = logos || {};

  if (!children) {
    return null;
  }

  const verticalBarIndex = children.length - 2;

  const sectionLi = children.map((section) => {
    const {
      _id: id,
      children: childSections,
      site,
      navigation,
    } = section || {};
    const {
      site_url: siteURL,
      section_url_open_new_tab: newTab,
    } = site || {};

    const sectionIndex = children.indexOf(section);
    const destination = id.includes('/configsection') ? siteURL : id;

    // return a section followed by the vertical separator bar
    if (children[verticalBarIndex] === section) {
      return (
        <React.Fragment key={id}>
          <Section navigation={navigation} link={destination} childSections={childSections} index={sectionIndex}
          setSection={setSection} activeSection={activeSection} newTab={newTab} isMobile={isMobile}/>
          <li className='nav-items nav-itemBottomBorder nav-separator'>
            <span className='separatorBar'></span>
          </li>
        </React.Fragment>
      );
    }

    return (
      <Section key={id} navigation={navigation} link={destination} childSections={childSections} index={sectionIndex}
      setSection={setSection} activeSection={activeSection} newTab={newTab} isMobile={isMobile}/>
    );
  });

  return (
    <header className="c-nav">
        <div className={`c-headerNav
        ${stickyNavVisibility ? 'stickyActive' : ''}`}>
          <div>
            <div className={`b-flexRow b-flexCenter nav-logo 
            ${stickyNavVisibility || (stickyNavVisibility && mobileMenuToggled) ? 'not-visible' : ''}`}>
              <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
                <div className='nav-flyout-button'>
                </div>
              </div>
              <div className={`nav-mobile-logo ${stickyNavVisibility || (stickyNavVisibility
                && mobileMenuToggled) ? 'not-visible' : ''}`} ref={logoRef} >
                <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
              </div>
              <Login isMobile={true} isFlyout={false}/>
            </div>
            <DesktopNav
              sections={sectionLi}
              isMobile={isMobile}
              hamburgerToggle={mobileMenuToggled}
              setToggle={setToggle}
              smallLogoUrl={siteLogoImageSmallInverse}
              rootDirectory={rootDirectory}
              social={social}
              stickyActive={stickyNavVisibility}/>
            </div>
          <div className={`sub b-flexRow b-flexCenter sub-text ${stickyNavVisibility || (stickyNavVisibility
            && mobileMenuToggled) ? 'not-visible' : ''}`}>
            <Subscribe/>
          </div>
          <StickyNav
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          hamburgerToggle={mobileMenuToggled}
          setStickyNavVisibility={setStickyNavVisibility}
          stickyNavVisibility={stickyNavVisibility}
          isMobile={isMobile}
          isMobileVisibilityRef={isMobileVisibilityRef}
          logoRef={logoRef}
          setToggle={setToggle}
          paddingRef={paddingRef}
          type={type}/>
        </div>
        <div className={ `sticky-padding ${stickyNavVisibility ? 'is-visible' : ''}`} ref={paddingRef}></div>
      </header>
  );
};

NavBar.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
  type: PropTypes.string,
};

export default NavBar;
