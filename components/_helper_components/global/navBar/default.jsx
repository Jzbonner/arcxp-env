import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
// import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import Subscribe from './subscribe/default';
import DesktopNav from './desktopNav/default';
import Login from './login/default';
import StickyNav from '../../article/stickyNav/default';
import '../../../../src/styles/base/_utility.scss';
import '../../../../src/styles/container/_article-basic.scss';
import './default.scss';

const NavBar = ({ articleURL, headlines, comments }) => {
  const [mobileMenuToggled, setToggle] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [activeSection, setSection] = useState(-1);
  const [stickyNavVisibility, setStickyNavVisibility] = useState(false);
  const logoRef = useRef(null);
  const mobileBreakpoint = 1023;

  // if(logoRef.current) {
  //   console.log(logoRef.current.scrollTop);
  //   console.log(logoRef.current.getBoundingClientRect().height);
  //   console.log(logoRef.current.offsetTop);

  // };

  const handleResizeEvent = () => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    // filter: topNavFilter,
  });

  const {
    site: logos,
    social,
    children,
    _id: rootDirectory,
  } = sections || {};

  const {
    site_logo_image: siteLogoImage,
    // site_logo_image_small: siteLogoImageSmall,
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
          setSection={setSection} activeSection={activeSection} newTab={newTab}/>
          <li className='nav-items nav-itemBottomBorder nav-separator'>
            <span className='separatorBar'></span>
          </li>
        </React.Fragment>
      );
    }

    return (
      <Section key={id} navigation={navigation} link={destination} childSections={childSections} index={sectionIndex}
      setSection={setSection} activeSection={activeSection} newTab={newTab}/>
    );
  });

  return (
  // <header className='c-nav'>
      <>
        <div className={`c-headerNav ${stickyNavVisibility ? 'not-visible' : ''}`}>
          <div className='b-flexRow b-flexCenter nav-logo'>
            <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
              <div className='nav-flyout-button'>
              </div>
            </div>
            <div className='nav-mobile-logo' ref={logoRef}>
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
            social={social}/>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
        </div>
        <StickyNav
          articleURL={articleURL}
          headlines={headlines}
          comments={comments}
          toggle={mobileMenuToggled}
          setStickyNavVisibility={setStickyNavVisibility}
          stickyNavVisibility={stickyNavVisibility}
          isMobile={isMobile}
          logoRef={logoRef}/>
      </>
  /* // </header> */
  );
};

NavBar.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
};

export default NavBar;
