import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import '../default.scss';

const Section = ({ navigation, link, childSections }) => {
  const [isVisible, flyoutVisible] = useState(false);
  const subNavVisible = !isVisible ? 'subNavInvisible' : '';
  const menuActivated = !isVisible ? 'menuInactive' : 'menuActivated';
  const {
    nav_title: name,
  } = navigation;

  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'b-ePaper';
  }
  // Added protection if there are no subsections
  if (childSections.length === 0) {
    return <>
      <li className={`itemPadding itemBottomBorder b-itemText ${ePaperClass}`}>
            <a href={link}>{name}</a>
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
        <li key={id} className='flyoutSubNavItem'>
          <a href={childURL}>{childName}</a>
        </li>
      );
    }
    return null;
  });

  return (
    <>
      <li className={`itemPadding itemBottomBorder b-itemText ${ePaperClass}`}
      onMouseEnter={() => flyoutVisible(true)}
      onMouseLeave={() => flyoutVisible(false)}>
        <a>{name}</a>
        <div className={`${menuActivated}`}>
          <a>{name}</a>
        </div>
        <div className={`c-subNavContainer ${subNavVisible}`}>
          <ul className='flyoutSubNav'>
            {childList}
          </ul>
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
};

export default Section;
