import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Search from '../search/default';
import Hamburger from '../../../../../resources/icons/global/hamburger';
import HamburgerDark from '../../../../../resources/icons/global/hamburgerDark';

const RedesignNavLinks = ({
  sections = [], arcSite, setToggle, siteName, logoPath, isNonShareablePage, animationVisibility = false, primarySectionID, omitHeaderItems, enableDarkMode, darkModeToggled, inMemoriam,
}) => {
  const { siteDomainURL, darkModeSubscribe } = getProperties(arcSite);
  const itemCount = sections.length;
  const hamburgerRef = useRef(null);
  let animationCount = 0;

  useEffect(() => {
    animationCount = animationVisibility === true ? animationCount += 1 : animationCount += 0;
    if (typeof window !== 'undefined' && animationVisibility === true && hamburgerRef && hamburgerRef.current) {
      if (animationCount === 1) {
        hamburgerRef.current.classList.remove('pulse');
      }
    }
  }, [animationVisibility]);

  const items = sections.map((section, i) => {
    if (enableDarkMode && i > 5) {
      return null;
    }

    const {
      _id: id,
      navigation,
      site,
    } = section || {};

    const {
      site_url: siteURL,
    } = site || {};

    const {
      nav_title: title,
    } = navigation || {};

    const destination = id.includes('/configsection') ? siteURL : id;
    const isHighlighted = primarySectionID === destination;

    function checkTrailingSlash(link) {
      return link.endsWith('/') ? link : `${link}/`;
    }

    if (!destination) return null;

    return (
    <li key={i}>
      <a href={destination?.indexOf('/') === 0 ? `${siteDomainURL}${checkTrailingSlash(destination)}` : checkTrailingSlash(destination)} target='_self' className={`nav-itemText ${isHighlighted ? 'active' : ''}${itemCount > 7 ? 'sm-text' : ''}`}>{title}</a>
    </li>
    );
  });

  return (
    <div className={`c-topNavLinks ${isNonShareablePage ? '' : 'content'}`}>
      { !omitHeaderItems
      && <div ref={hamburgerRef}className='nav-menu-toggle pulse' onClick={() => { setToggle(true); }}>
       {(darkModeToggled || inMemoriam) ? <HamburgerDark/> : <Hamburger/>}
      </div>
      }
      {logoPath && siteName && <div className={`sticky-logo-homepage ${siteName}`}>
        <a href="/">
          <img src={logoPath} className={siteName} alt={`${siteName} logo`} />
        </a>
      </div> }
      <div className='stickyNav-homepage'>
        <ul>
          {items}
          {enableDarkMode && <li><a href={darkModeSubscribe} target='_self' className='nav-itemText dark-mode'>Subscribe Today</a></li>}
        </ul>
        <Search isHeader={true}/>
      </div>
    </div>
  );
};

RedesignNavLinks.propTypes = {
  sections: PropTypes.array,
  arcSite: PropTypes.string,
  setToggle: PropTypes.func,
  siteName: PropTypes.string,
  logoPath: PropTypes.string,
  isNonShareablePage: PropTypes.bool,
  animationVisibility: PropTypes.bool,
  primarySectionID: PropTypes.string,
  omitHeaderItems: PropTypes.bool,
  enableDarkMode: PropTypes.bool,
  darkModeToggled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inMemoriam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default RedesignNavLinks;
