import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Search from '../search/default';

const RedesignNavLinks = ({
  sections, arcSite, setToggle, siteName, logoPath, isNonShareablePage,
}) => {
  const { siteDomainURL } = getProperties(arcSite);
  const itemCount = sections.length;

  const items = sections.map((section, i) => {
    const {
      _id: id,
      navigation,
    } = section || {};

    const {
      nav_title: title,
    } = navigation || {};

    return (
    <li key={i}>
      <a href={id.indexOf('/') === 0 ? `${siteDomainURL}${id}` : id} target='_self' className={`nav-itemText ${itemCount > 7 ? 'sm-text' : ''}`}>{title}</a>
    </li>
    );
  });
  return (
    <div className='c-topNavLinks'>
      <div className='nav-menu-toggle' onClick={() => { setToggle(true); }}>
        <div className='nav-flyout-button'></div>
      </div>
      <div className={`sticky-logo-homepage ${siteName} ${isNonShareablePage ? '' : 'hidden'}`}>
        <a href="/">
          <img src={logoPath} className={siteName} alt={`${siteName} logo`} />
        </a>
      </div>
      <div className={`stickyNav-homepage ${isNonShareablePage ? '' : 'hidden'}`}>
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
};

export default RedesignNavLinks;
