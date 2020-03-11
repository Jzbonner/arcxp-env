import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Section = ({
  navigation,
  link,
  childSections,
  newTab,
}) => {
  const [isVisible, flyoutVisible] = useState(false);
  const menuActivated = !isVisible ? 'menu-inactive' : 'menu-active';
  const {
    nav_title: name,
  } = navigation;

  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'nav-ePaper';
  }
  // Added protection if there are no subsections
  if (childSections.length === 0) {
    return <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}>
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

    const {
      nav_title: childName,
    } = childNav || {};
    const {
      site_url: childURL,
    } = site || {};

    if (childName) {
      return (
        <li key={id} className='flyout-item'>
          <a href={childURL}>{childName}</a>
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <li className={`nav-items nav-itemBottomBorder nav-itemText ${ePaperClass}`}
      onMouseEnter={() => flyoutVisible(true)}
      onMouseLeave={() => flyoutVisible(false)}>
        <a>{name}</a>
        <div className={`${menuActivated}`}>
          <div className='menu-item'>
            <a>{name}</a>
          </div>
          <div className={'subNav'}>
            <ul className='subNav-flyout'>
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
  visible: PropTypes.bool,
  newTab: PropTypes.string,
};

export default Section;
