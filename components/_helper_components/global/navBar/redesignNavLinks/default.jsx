import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Search from '../search/default';

const RedesignNavLinks = ({
  sections = [], arcSite, setToggle, siteName, logoPath, isNonShareablePage, animationVisibility = false, primarySectionID,
}) => {
  const { siteDomainURL } = getProperties(arcSite);
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

    return (
    <li key={i}>
      <a href={destination.indexOf('/') === 0 ? `${siteDomainURL}${checkTrailingSlash(destination)}` : checkTrailingSlash(destination)} target='_self' className={`nav-itemText ${isHighlighted ? 'active' : ''}${itemCount > 7 ? 'sm-text' : ''}`}>{title}</a>
    </li>
    );
  });
  return (
    <div className={`c-topNavLinks ${isNonShareablePage ? '' : 'content'}`}>
      <div ref={hamburgerRef}className='nav-menu-toggle pulse' onClick={() => { setToggle(true); }}>
        <div className='nav-flyout-button'></div>
      </div>
      <div className={`sticky-logo-homepage ${siteName}`}>
        <a href="/">
          <img src={logoPath} className={siteName} alt={`${siteName} logo`} />
        </a>
      </div>
      <div className='stickyNav-homepage'>
        <ul>
          {items}
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
};

export default RedesignNavLinks;
