import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import '../default.scss';

const Section = ({ navigation, link, childSections }) => {
  console.log(link);
  const [isVisible, flyoutVisible] = useState(false);
  const subNavVisible = !isVisible ? 'subNavInvisible' : '';
  const menuActivated = !isVisible ? '' : 'menuActivated';
  const {
    nav_title: name,
  } = navigation;

  const childList = childSections.map((childSection) => {
    const {
      _id: id,
      navigation: childNav,
      site,
    } = childSection || {};

    const {
      nav_title: childName,
    } = childNav || 'Undefined';
    const {
      site_url: childURL,
    } = site || {};

    return (
      <li key={id} className='flyoutSubNavItem'>
        <a href={childURL}>{childName}</a>
      </li>
    );
  });
  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'b-ePaper';
  }

  return (
    <>
      <li className={`itemPadding itemBottomBorder b-itemText ${ePaperClass} ${menuActivated}`}
      onMouseEnter={() => flyoutVisible(true)}
      onMouseLeave={() => flyoutVisible(false)}>
        <a>{name}</a>
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
