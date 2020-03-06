import React from 'react';
import PropTypes from 'prop-types';

const NavFooter = ({ facebook, twitter }) => (
  <li className='nav-mobile-footer'>
    <div className='b-flexCenter b-flexRow'>
      <div className='nav-social'>
        <a href={facebook} target='_blank' rel='noopener noreferrer'>
          <img src={'https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/facebook.svg'}/>
        </a>
        <a href={twitter} target='_blank' rel='noopener noreferrer'>
          <img src={'https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/twitter.svg'}/>
        </a>
      </div>
    </div>
    <div className='nav-copyright b-flexRow b-flexCenter'>
      <span>© 2020</span>
      <a href='http://www.ajc.com' target='_blank' rel='noopener noreferrer'>The Atlanta Journal-Constitution</a>
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

NavFooter.propTypes = {
  facebook: PropTypes.string,
  twitter: PropTypes.string,
};

export default NavFooter;
