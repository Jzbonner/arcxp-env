import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Section = ({ navigation, link }) => {
  console.log(link);
  const {
    nav_title: name,
  } = navigation;
  let ePaperClass = '';
  if (name === 'ePaper') {
    ePaperClass = 'b-ePaper';
  }
  return (
    <li className={`itemPadding itemBottomBorder b-itemText ${ePaperClass}`}>
      <a>{name}</a>
    </li>
  );
};

Section.propTypes = {
  navigation: PropTypes.object,
  link: PropTypes.string,
};

export default Section;
