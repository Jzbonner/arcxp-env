import React from 'react';
import PropTypes from 'prop-types';
// import './default.scss';

const Header = ({ src }) => {
  const {
    content,
    level,
  } = src;

  const CustomTag = `h${level}`;
  return (
    <CustomTag
      className={`h${level}-heading b-margin-bottom-d40-m20`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

Header.propTypes = {
  src: PropTypes.object,
};

export default Header;
