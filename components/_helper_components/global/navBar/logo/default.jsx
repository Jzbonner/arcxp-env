import React from 'react';
import PropTypes from 'prop-types';
import '../default.scss';

const Logo = ({ source, rootDirectory }) => {
  const {
    site_logo_image: sourceURL,
  } = source;
  return (
            <a href={rootDirectory}>
                <img src={sourceURL} className='logo'></img>
            </a>
  );
};

Logo.propTypes = {
  source: PropTypes.object,
  rootDirectory: PropTypes.string,
};

export default Logo;
