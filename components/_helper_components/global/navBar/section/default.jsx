import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ config }) => {
  const {
    children: menuItems,
    _id: link,
    navigation,
  } = config;
  const {
    nav_title: sectionName,
  } = navigation;
  return (
    <li>
      <a href={link}>{sectionName}</a>
    </li>
  );
};

Section.propTypes = {
  config: PropTypes.object,
};

export default Section;
