import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import '../default.scss';
import '../../../../../src/styles/base/_utility.scss';

const Section = ({
  navigation,
  link,
  childSections,
  index,
  setSection,
  activeSection,
  newTab,
  isMobile,
  isSticky,
}) => {
  const fusionContext = useFusionContext();
  const { globalContent } = fusionContext;
  const primarySection = globalContent && globalContent.taxonomy && globalContent.taxonomy.primary_section;

  const {
    nav_title: name,
  } = navigation;
  function activateMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    setSection(index);
  }
  const subNavRef = React.createRef(null);
  const [width, setWidth] = useState(null);
  let childSectionLength = 0;

  // manually sets the width for the parent container, was having issues with safari when no width was being set.
  useEffect(() => {
    if (subNavRef.current && !isMobile) {
      setWidth(subNavRef.current.getBoundingClientRect().width);
    }
  }, [subNavRef.current]);

  useEffect(() => {
    if (subNavRef.current && !isMobile) {
      setWidth(subNavRef.current.getBoundingClientRect().width);
    }
  }, [isSticky]);

  const isActive = index === activeSection ? 'isVisible' : '';

  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'nav-ePaper';
  }

  const isHighlighted = primarySection._id === link;
  const highlitClass = isHighlighted ? 'bold' : '';

  // Added protection if there are no subsections
  if (childSections.length === 0) {
    return <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}>
        {isHighlighted ? <div className="activeSelection" /> : null}
        <a href={link} target={newTab === 'true' ? '_blank' : '_self'}>{name}</a>
      </li>
        </>;
  }
  const childList = childSections.map((childSection) => {
    const {
      _id: id,
      navigation: childNav,
      site,
    } = childSection || {};

    childSectionLength = childNav ? childSectionLength + 1 : childSectionLength + 0;

    const {
      nav_title: childName,
    } = childNav || {};

    const {
      site_url: childURL,
    } = site || {};

    if (childName) {
      return (
        <li key={id} className='flyout-item'>
          <a href={childURL} target='_self'>{childName}</a>
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}>
      {isHighlighted ? <div className="activeSelection" /> : null}
        <div className={`nav-item-link ${highlitClass}`} onClick={ e => activateMenu(e)}>
          <a>{name}</a>
        </div>
        <div className={`section ${isActive}`}>
          <div className='section-item'>
            <a>{name}</a>
          </div>
          <div className={`subNav ${isActive}`} style={{ width: `${width}px` }}>
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
};

export default Section;
