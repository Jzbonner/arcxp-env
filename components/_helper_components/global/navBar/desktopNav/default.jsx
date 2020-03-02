import React from 'react';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import '../default.scss';

const DesktopNav = ({ sections, mobile, setToggle }) => (
  <nav className={mobile}>
    <div className='nav-menu-toggle' onClick={() => { setToggle(false); }}>
      <div className='nav-flyout-button'></div>
    </div>
    <div>AJC</div>
    <ul className='nav-row'>
      {sections}
      <Search/>
      <Weather/>
      <div className='nav-mobile-login'>
        <Login/>
      </div>
    </ul>
  </nav>
);

DesktopNav.propTypes = {
  sections: PropTypes.array,
  mobile: PropTypes.string,
  setToggle: PropTypes.func,
};

export default DesktopNav;
