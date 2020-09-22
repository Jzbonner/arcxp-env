import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import DesktopNav from './desktopNav/default';
import StickyNav from '../../article/stickyNav/default';
import AmpNavBar from './amp';
import '../../../../src/styles/base/_utility.scss';
import '../../../../src/styles/container/_article-basic.scss';
import '../../../../src/styles/container/_c-headerNav.scss';
import BreakingNews from '../breakingNews/default';

const NavBar = ({
  articleURL, headlines, comments, type, subtype, ampPage = false, hasWindowShade = false, omitBreakingNews = false,
}) => {
  // amp hijack
  if (ampPage) return <AmpNavBar />;

  const [mobileMenuToggled, setToggle] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [activeSection, setSection] = useState(-1);
  const [stickyNavVisibility, setStickyNavVisibility] = useState(false);
  const logoRef = useRef(null);
  const paddingRef = React.useRef(null);
  const isMobileVisibilityRef = React.useRef(isMobile);
  const mobileBreakpoint = 1023;

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    logo, logoHamburger, siteName, cdnSite, cdnOrg,
  } = getProperties(arcSite);
  const appContext = useAppContext();
  const { deployment, contextPath, layout } = appContext;

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
    children,
    _id: rootDirectory,
  } = sections || {};

  if (!children) {
    return null;
  }

  const verticalBarIndex = children.length - 2;
  const finalIndex = children.length - 1;

  const sectionLi = children.map((section, i) => {
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
                   setSection={setSection} activeSection={activeSection} newTab={newTab} isMobile={isMobile}
                   isSticky={stickyNavVisibility} isLast={i === finalIndex}/>
        </React.Fragment>
      );
    }

    return (
      <Section key={id} navigation={navigation} link={destination} childSections={childSections} index={sectionIndex}
      setSection={setSection} activeSection={activeSection} newTab={newTab} isMobile={isMobile} isSticky={stickyNavVisibility}
      isLast={i === finalIndex}/>
    );
  });

  return (
    <header className="c-nav">
      {!omitBreakingNews && <BreakingNews />}
      <div className={`c-headerNav
        ${stickyNavVisibility || hasWindowShade ? 'stickyActive' : ''}
        ${hasWindowShade ? 'above-shade' : ''}
        ${subtype === 'Flatpage' ? ' b-margin-bottom-40' : ''}`}>
        <div className={`b-flexRow b-flexCenter nav-logo
        ${(stickyNavVisibility || hasWindowShade) || (stickyNavVisibility && mobileMenuToggled) ? 'not-visible' : ''}`}>
          <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
            <div className='nav-flyout-button'></div>
          </div>
          <div className={`nav-mobile-logo ${stickyNavVisibility || (stickyNavVisibility
            && mobileMenuToggled) ? 'not-visible' : ''}`} ref={logoRef} >
            <Logo
              source={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logo}`)}`}
              rootDirectory={rootDirectory} siteName={siteName.toLowerCase()}
            />
          </div>
        </div>
        <DesktopNav
          sections={sectionLi}
          isMobile={isMobile}
          hamburgerToggle={mobileMenuToggled}
          setToggle={setToggle}
          smallLogoUrl={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoHamburger}`)}`}
          rootDirectory={rootDirectory}
          stickyActive={stickyNavVisibility || hasWindowShade}
          type={type}
          siteName={siteName.toLowerCase()}/>
        <div className={`connext-subscribe ${stickyNavVisibility || (stickyNavVisibility
          && mobileMenuToggled) || hasWindowShade ? 'not-visible' : ''} `}>
        </div>
        <StickyNav
          headlines={headlines}
          comments={comments}
          hamburgerToggle={mobileMenuToggled}
          setStickyNavVisibility={setStickyNavVisibility}
          stickyNavVisibility={stickyNavVisibility || hasWindowShade}
          isMobile={isMobile}
          isMobileVisibilityRef={isMobileVisibilityRef}
          logoRef={logoRef}
          setToggle={setToggle}
          paddingRef={paddingRef}
          type={type}
          sections={sectionLi}
          articleUrl={articleURL}
          hasWindowShade={hasWindowShade}
        />
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
  subtype: PropTypes.string,
  ampPage: PropTypes.bool,
  hasWindowShade: PropTypes.bool,
  omitBreakingNews: PropTypes.bool,
};

export default NavBar;
