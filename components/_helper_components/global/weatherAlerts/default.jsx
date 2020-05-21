import React from 'react';
import { useContent } from 'fusion:content';

const WeatherAlerts = () => {
  const weatherData = useContent({
    source: 'weather',
    query: {
      zones: 'GAZ034',
    },
  });

  console.log('WEATHER DATA', weatherData);

  return <>WEATHER API</>;
};

export default WeatherAlerts;
