import React from 'react';
import '../default.scss';
import weatherIcon from '../../../../../resources/images/cloudy.png';

const Weather = () => (
  <>
    <li className='nav-weather weather-icon'>
      <img height='35px' src={weatherIcon}></img>
     </li>
    <li className='nav-itemText nav-weather weather-text'>
      <a>89°</a>
    </li>
  </>
);

export default Weather;
