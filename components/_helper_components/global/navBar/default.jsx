import React, { useState, useEffect } from 'react';
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

const NavBar = ({ articleURL, headlines, comments }) => {
  const [mobileMenuToggled, setToggle] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const mobileMenu = mobileMenuToggled ? 'mobile-nav-activated' : '';
  const mobileBreakpoint = 1023;
  const handleResizeEvent = () => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    filter: topNavFilter,
  });
  const {
    site: logos,
    social,
    children,
    _id: rootDirectory,
  } = sections || {};

  // console.log(sections);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  useEffect(() => {
    if (window.innerWidth <= mobileBreakpoint) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

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
    } = site || {};
    const destination = id.includes('/configsection') ? siteURL : id;
    if (children[verticalBarIndex] === section) {
      return (
      <React.Fragment key={id}>
        <Section navigation={navigation} link={destination} childSections={childSections}/>
        <li className='nav-items nav-itemBottomBorder nav-separator' key='nav-separator'>
          <span className='separatorBar' key='spanm'></span>
        </li>
      </React.Fragment>
      );
    }

    return (
     <Section key={id} navigation={navigation} link={destination} childSections={childSections}/>
    );
  });

  return (
      <header className="c-nav">
        <div className='c-headerNav'>
          <div className='b-flexRow b-flexCenter nav-logo'>
            <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
              <div className='nav-flyout-button'>
              </div>
            </div>
            <div className='nav-mobile-logo'>
              <Logo source={siteLogoImage} rootDirectory={rootDirectory}/>
            </div>
            <Login isMobile={true} isFlyout={false}/>
          </div>
          <DesktopNav
            sections={sectionLi}
            isMobile={isMobile}
            hamburgerToggle={mobileMenu}
            setToggle={setToggle}
            smallLogoUrl={siteLogoImageSmallInverse}
            rootDirectory={rootDirectory}
            social={social}/>
          <div className='sub b-flexRow b-flexCenter sub-text'>
            <Subscribe/>
          </div>
          <StickyNav
              articleURL={articleURL}
              headlines={headlines}
              comments={comments}
              toggle={mobileMenuToggled}

        />
        </div>
      </header>
  );
};

NavBar.propTypes = {
  articleURL: PropTypes.string,
  headlines: PropTypes.object,
  comments: PropTypes.object,
};

export default NavBar;
