import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Header = ({ src }) => {
  const {
    content,
    level,
  } = src;

  const CustomTag = `h${level}`;
  return (
    <CustomTag
      className={`h${level}-heading`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

Header.propTypes = {
  src: PropTypes.any,
  content: PropTypes.string,
  level: PropTypes.number,
};

export default Header;
