import React from 'react';
import PropTypes from 'prop-types';
import Search from '../search/default';
import Login from '../login/default';
import Weather from '../weather/default';
import '../default.scss';

const DesktopNav = ({ sections }) => (
  <nav>
    <ul className='nav-row'>
      {sections}
      <Search/>
      <Weather/>
      <Login/>
    </ul>
  </nav>
);

DesktopNav.propTypes = {
  sections: PropTypes.array,
};

export default DesktopNav;
