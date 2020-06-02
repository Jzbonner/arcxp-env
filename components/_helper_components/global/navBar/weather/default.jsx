import React from 'react';
import '../default.scss';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';

const Weather = () => {
  const { weatherLocationId } = getProperties();
  const weatherData = useContent({
    source: 'weather',
    query: {
      endpoint: 'currentconditions',
      lookup: `location=${weatherLocationId || 348181}`,
    },
  });

  if (weatherData) {
    const { Temperature: temp, WeatherIcon: icon, WeatherText: text } = weatherData[0] || {};
    // icons are integers but the file path has leading zeroes, per https://developer.accuweather.com/weather-icons
    const iconPath = `https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`;
    return (
      <>
        <li className='nav-weather weather-icon'>
          {icon && <img height='35px' src={iconPath} alt={text} />}
        </li>
        <li className='nav-itemText nav-weather weather-text'>
          {temp && <a href='/weather/'>{temp}&deg;</a>}
        </li>
      </>
    );
  }
  return null;
};

export default Weather;
