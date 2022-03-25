import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../src/styles/container/_c-headerNav.scss';
import LogoFullRedesign from '../../../../../resources/logos/AJC/logo-full-redesign';

const Logo = ({
  source, rootDirectory, topRef, siteName, darkMode, darkModeLogo,
}) => {
  if (siteName === 'ajc') {
    console.log('Hello');
    return <LogoFullRedesign/>;
  }
  return (
    <a href={rootDirectory}>
      <img src={ !darkMode ? source : darkModeLogo} className={`logo ${siteName}`} ref={topRef} alt={`${siteName} logo`}></img>
    </a>
  );
};

Logo.propTypes = {
  source: PropTypes.string,
  rootDirectory: PropTypes.string,
  topRef: PropTypes.any,
  siteName: PropTypes.string,
  darkMode: PropTypes.bool,
  darkModeLogo: PropTypes.string,
};

export default Logo;
