import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ section, link }) => (
    <li>
      <a href={link}>{section}</a>
    </li>
);

Section.propTypes = {
  section: PropTypes.string,
  link: PropTypes.string,
};

export default Section;
