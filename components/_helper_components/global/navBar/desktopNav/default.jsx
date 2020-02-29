import React from 'react';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import '../default.scss';

const DesktopNav = ({ sections }) => (
  <nav>
    {/* <div>X</div>
    <div>AJC</div> */}
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
};

export default DesktopNav;
