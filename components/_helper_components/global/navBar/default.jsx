import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import topNavFilter from '../../../../content/filters/top-nav';
import Section from './section/default';
import Logo from './logo/default';
import HamburgerMenu from './hamburgerMenu/default';
import StickyNav from '../../article/stickyNav/default';
import RedesignNavLinks from './redesignNavLinks/default';
import AmpNavBar from './amp';
import Weather from './weather/default';
import BreakingNews from '../breakingNews/default';
import Login from './login/default';
import DarkModeToggle from '../../../../resources/icons/global/darkMode';

const NavBar = ({
  articleURL, headlines, comments, type, subtype, ampPage = false, hasWindowShade = false, omitBreakingNews = false, enableDarkMode, darkModeToggled, setDarkModeToggle, inMemoriam,
}) => {
  // amp hijack
  if (ampPage) return <AmpNavBar />;

  const [mobileMenuToggled, setToggle] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [activeSection, setSection] = useState(-1);
  const [stickyNavVisibility, setStickyNavVisibility] = useState(false);
  const [omitHeaderItems, setOmitHeaderItems] = useState(false);
  const logoRef = useRef(null);
  const paddingRef = React.useRef(null);
  const isMobileVisibilityRef = React.useRef(isMobile);
  const mobileBreakpoint = 767;
  const darkMode = darkModeToggled;
  const fusionContext = useFusionContext();
  const { arcSite, globalContent, outputType } = fusionContext;
  const {
    logoRedesign, siteName, weatherPageUrl, closeButton, burgerMenuBackground, burgerWhiteLogo,
  } = getProperties(arcSite);
  const darkModeSite = `${arcSite}_dark-mode`;

  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;

  const {
    taxonomy,
  } = globalContent || {};
  const {
    primary_section: primarySection,
  } = taxonomy || {};
  const {
    _id: primarySectionID,
  } = primarySection || {};

  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'MainMenuRedesign2021',
    },
  });

  const redesignSections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopicsBar',
    },
    filter: topNavFilter,
  });

  const navFooterContent = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'BottomNavRedesign2021',
    },
  });

  const { children: redesignChildren } = redesignSections || {};

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

    if (outputType === 'wraps' && window.location.href.includes('events.ajc.com')) {
      setOmitHeaderItems(true);
    }
  }, []);

  const [sidebarIsOpen, setSidebarState] = useState(false);

  useEffect(() => {
    const sidebarBtn = document.querySelectorAll('.nav-menu-toggle');
    sidebarBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        setSidebarState(!sidebarIsOpen);
      });
    });
  }, [sidebarIsOpen]);

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

  const verticalBarIndex = children?.length - 2;
  const finalIndex = children?.length - 1;

  const sectionLi = children?.map((section, i) => {
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
                   isSticky={stickyNavVisibility} isLast={i === finalIndex} primarySectionID={primarySectionID}/>
        </React.Fragment>
      );
    }

    return (
      <Section key={id} navigation={navigation} link={destination} childSections={childSections} index={sectionIndex}
      setSection={setSection} activeSection={activeSection} newTab={newTab} isMobile={isMobile} isSticky={stickyNavVisibility}
      isLast={i === finalIndex} primarySectionID={primarySectionID}/>
    );
  });

  return (
    <header className='c-nav'>
      {!omitBreakingNews && !enableDarkMode && <BreakingNews />}
      <div className={`c-headerNav b-sectionHome-padding
        ${stickyNavVisibility ? 'stickyActive' : ''}
        ${hasWindowShade ? 'above-shade' : ''}
        ${subtype === 'Flatpage' ? ' b-margin-bottom-40' : ''}`} style={sidebarIsOpen ? { opacity: 1 } : {}}>
        <div className={`c-logoAndLinks nav-logo
        ${stickyNavVisibility || (stickyNavVisibility && mobileMenuToggled) ? 'not-visible' : ''}`}>
          <div className='c-topNavItems'>
          <Weather weatherPageUrl={weatherPageUrl} omit={omitHeaderItems}/>
            <div className={`nav-mobile-logo ${stickyNavVisibility || (stickyNavVisibility
              && mobileMenuToggled) ? 'not-visible' : ''} ${siteName.toLowerCase()}`} ref={logoRef} >
              <Logo
                source={`${deployment(`${contextPath}${logoRedesign}`)}`}
                rootDirectory={rootDirectory} siteName={siteName.toLowerCase()}
              />
            </div>
          <Login
            isMobile={isMobileVisibilityRef.current} isSticky={stickyNavVisibility} darkMode={darkMode} omit={omitHeaderItems}
          />
          </div>
          <RedesignNavLinks
            sections={redesignChildren}
            arcSite={arcSite}
            setToggle={setToggle}
            animationVisibility={stickyNavVisibility}
            primarySectionID={primarySectionID}
            omitHeaderItems={omitHeaderItems}
            enableDarkMode={enableDarkMode}
            darkModeToggled={darkModeToggled}
            inMemoriam={inMemoriam}
            />
        </div>
        <HamburgerMenu
          sections={sectionLi}
          navFooterContent={navFooterContent}
          isMobile={isMobile}
          hamburgerToggle={mobileMenuToggled}
          setToggle={setToggle}
          whiteLogoRedesign={`${deployment(`${contextPath}${burgerWhiteLogo}`)}`}
          closeButton={`${deployment(`${contextPath}${closeButton}`)}`}
          rootDirectory={rootDirectory}
          stickyActive={stickyNavVisibility}
          type={type}
          burgerMenuBackground={`${deployment(`${contextPath}${burgerMenuBackground}`)}`}
          siteName={siteName.toLowerCase()}/>
        { !enableDarkMode && <div className={`connext-subscribe ${stickyNavVisibility || (stickyNavVisibility
          && mobileMenuToggled) || hasWindowShade ? 'not-visible' : ''} `}>
        </div>}
         <StickyNav
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
          type={type}
          sections={redesignChildren}
          articleUrl={articleURL}
          darkMode={darkMode}
          darkModeLogo={`${deployment(`${contextPath}${burgerWhiteLogo}`)}`}
          enableDarkMode={enableDarkMode}
          inMemoriam={inMemoriam}
        />
      </div>
      <div className={ `sticky-padding ${stickyNavVisibility ? 'is-visible' : ''}`} ref={paddingRef}></div>
      <div className={`darkModeToggle ${enableDarkMode && !inMemoriam ? 'is-visible' : ''}`} onClick={(e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
          const docBody = document.querySelector('body');
          if (darkModeToggled === false) {
            docBody.classList += ' dark-mode';
            window.localStorage.setItem(darkModeSite, 'enabled');
          } else if (darkModeToggled === true) {
            window.localStorage.setItem(darkModeSite, 'disabled');
            docBody.classList.remove('dark-mode');
          }
        }
        setDarkModeToggle(!darkModeToggled);
      }}>{<DarkModeToggle toggle={darkModeToggled}/>}</div>
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
  enableDarkMode: PropTypes.bool,
  darkModeToggled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setDarkModeToggle: PropTypes.func,
  specialPresentationDark: PropTypes.bool,
  inMemoriam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default NavBar;
