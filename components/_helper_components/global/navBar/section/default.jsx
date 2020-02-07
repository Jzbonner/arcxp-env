import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Section = ({ navigation, link }) => {
  console.log(link);
  const {
    nav_title: name,
  } = navigation;
  return (
    <li className='itemPadding itemBottomBorder b-itemText'>
      <a>{name}</a>
    </li>
  );
};

Section.propTypes = {
  navigation: PropTypes.object,
  link: PropTypes.string,
};

export default Section;
