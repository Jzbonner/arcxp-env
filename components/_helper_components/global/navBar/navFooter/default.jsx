import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';

const NavFooter = ({ facebook, twitter }) => {
  const { ajcFacebookURL, ajcTwitterURL, siteDomainURL } = getProperties();
  return (
  <li className='nav-mobile-footer'>
    <div className='b-flexCenter b-flexRow'>
      <div className='nav-social'>
        <a href={ajcFacebookURL} target='_blank' rel='noopener noreferrer'>
          <img src={facebook}/>
        </a>
        <a href={ajcTwitterURL} target='_blank' rel='noopener noreferrer'>
          <img src={twitter}/>
        </a>
      </div>
    </div>
    <div className='nav-copyright b-flexRow b-flexCenter'>
      <span>© 2020</span>
      <a href={siteDomainURL} target='_blank' rel='noopener noreferrer'>The Atlanta Journal-Constitution</a>
    </div>
    <div className='b-flexRow b-flexCenter nav-copyright-links'>
      <a>Visitor Agreement</a>|
      <a>privacy policy</a>|
      <a>contact</a>
    </div>
    <div className='b-flexRow b-flexCenter'>
      <a>mobile apps</a>
    </div>
  </li>
  );
};

NavFooter.propTypes = {
  facebook: PropTypes.string,
  twitter: PropTypes.string,
};

export default NavFooter;
