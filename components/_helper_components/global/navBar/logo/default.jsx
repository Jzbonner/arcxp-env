import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Logo = ({ source, rootDirectory, topRef }) => (
    <a href={rootDirectory}>
      <img src={source} className='logo' ref={topRef}></img>
    </a>
);

Logo.propTypes = {
  source: PropTypes.string,
  rootDirectory: PropTypes.string,
  topRef: PropTypes.any,
};

export default Logo;
