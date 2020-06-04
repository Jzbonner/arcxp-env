import React from 'react';
import '../default.scss';
import currentConditions from '../../utils/weather/currentConditions';

const Weather = () => {
  const { temp, iconPath, text } = currentConditions() || {};
  return (
    <>
      <li className='nav-weather weather-icon'>
        {iconPath && <img height='35px' src={iconPath} alt={text} />}
      </li>
      <li className='nav-itemText nav-weather weather-text'>
        {temp && <a href='/weather/'>{temp}&deg;</a>}
      </li>
    </>
  );
};

export default Weather;
