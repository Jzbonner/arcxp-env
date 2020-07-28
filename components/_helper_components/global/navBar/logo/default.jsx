import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../src/styles/container/_c-headerNav.scss';

const Logo = ({
  source, rootDirectory, topRef, siteName,
}) => (
    <a href={rootDirectory}>
      <img src={source} className={`logo ${siteName}`} ref={topRef}></img>
    </a>
);

Logo.propTypes = {
  source: PropTypes.string,
  rootDirectory: PropTypes.string,
  topRef: PropTypes.any,
  siteName: PropTypes.string,
};

export default Logo;
