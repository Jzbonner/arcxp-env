import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ nullForNow = null }) => {
  if (nullForNow === null) return null;

  return (
    <div>The Linter Makes You Do Crazy Things</div>
  );
};

NavBar.propTypes = {
  nullForNow: PropTypes.string,
};

export default NavBar;
