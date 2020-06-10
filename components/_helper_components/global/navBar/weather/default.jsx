import React from 'react';
import '../default.scss';
import currentConditions from '../../utils/weather/currentConditions';

const Weather = () => {
  const { temp = '', icon = '', text = '' } = currentConditions() || {};
  return (
    <>
      <li className={`nav-weather weather-icon weather-${icon}`} title={text}></li>
      <li className='nav-itemText nav-weather weather-text'>
        {temp && <a href='/weather/'>{temp}&deg;</a>}
      </li>
    </>
  );
};

export default Weather;
