import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import '../../../../../src/styles/container/_c-headerNav.scss';
import '../../../../../src/styles/base/_utility.scss';

const Section = ({
  navigation,
  link,
  childSections = [],
  index,
  activeSection,
  newTab,
  isLast,
  primarySectionID,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { siteDomainURL } = getProperties(arcSite);

  const {
    nav_title: name,
  } = navigation || {};

  const subNavRef = React.createRef(null);
  let childSectionLength = 0;

  // manually sets the width for the parent container, was having issues with safari when no width was being set.

  const isActive = index === activeSection ? 'isVisible' : '';

  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'nav-ePaper';
  }

  // Added protection if there are no subsections
  if (childSections.length === 0) {
    return <>
      <li className={`nav-items nav-itemText ${ePaperClass} nav-itemText-${primarySectionID}`}>
        <a href={link.indexOf('/') === 0 ? `${siteDomainURL}${link}` : link} target={newTab === 'true' ? '_blank' : '_self'} rel='noopener noreferrer'>
          {name}
        </a>
      </li>
        </>;
  }
  const childList = childSections.map((childSection, idx) => {
    const {
      _id: id,
      navigation: childNav,
      site,
    } = childSection || {};


    const {
      nav_title: childName,
    } = childNav || {};

    const {
      site_url: childURL,
    } = site || {};

    childSectionLength = childNav && childName ? childSectionLength + 1 : childSectionLength + 0;

    if (id.indexOf('/configsection/links/') !== -1 && !childURL) {
      // if it's a section link (not a true section) but has no URL defined, skip it
      return null;
    }

    if (childName) {
      return (
        <li key={id} className={`flyout-item flyout-item-${idx}`}>
          <a href={childURL || `${siteDomainURL}${id}/`} target='_self'>{childName}</a>
        </li>
      );
    }
    return null;
  });

  return (
    <>
    <li className={`nav-items nav-itemText ${ePaperClass}`}>
        <div className={`section ${isActive}`}>
          <div className='section-item'>
            <a href={link.indexOf('/') === 0 ? `${siteDomainURL}${link}/` : link}>{name}</a>
          </div>
          <div className={`subNav ${isActive} ${isLast ? 'expand-left' : ''}`}>
            <ul className={`subNav-flyout itemCount-${childSectionLength}`} ref={subNavRef}>
              {childList}
            </ul>
          </div>
        </div>
      </li>
    </>
  );
};

Section.propTypes = {
  navigation: PropTypes.object,
  link: PropTypes.string,
  childSections: PropTypes.array,
  index: PropTypes.number,
  setSection: PropTypes.func,
  activeSection: PropTypes.number,
  newTab: PropTypes.string,
  isMobile: PropTypes.bool,
  isSticky: PropTypes.bool,
  isLast: PropTypes.bool,
  id: PropTypes.string,
  primarySectionID: PropTypes.string,
};

export default Section;
