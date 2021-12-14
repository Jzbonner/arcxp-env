import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../../../../src/styles/container/_c-headerNav.scss';
import currentConditions from '../../utils/weather/currentConditions';

const Weather = ({ weatherPageUrl }) => {
  const { temp = '', icon = '', text = '' } = currentConditions() || {};

  if (weatherPageUrl) {
    useEffect(() => {
      const callback = () => {
        window.location.href = weatherPageUrl;
      };
      const weatherIcon = document.querySelector('.nav-weather.weather-icon');

      weatherIcon.addEventListener('click', callback);
      return () => weatherIcon.removeEventListener('click', callback);
    }, []);
  }

  return (
    <div className="c-weather">
      <div className={`nav-weather weather-icon weather-${icon}`} title={text}></div>
      <div className='nav-itemText nav-weather weather-text'>
        {temp && <a href={weatherPageUrl}>{temp}&deg;</a>}
      </div>
    </div>
  );
};

Weather.propTypes = {
  weatherPageUrl: PropTypes.string,
};

export default Weather;
