import React from 'react';
import { useContent } from 'fusion:content';

const WeatherAlerts = () => {
//   let gaCounties = [
//     'GAZ034',
//     'GAZ093',
//     'GAZ045',
//     'GAZ033',
//     'GAZ044',
//     'GAZ031',
//     'GAZ043',
//     'GAZ053',
//     'GAZ023',
//     'GAZ020',
//     'GAZ057',
//     'GAZ046',
//     'GAZ021',
//     'GAZ042',
//     'GAZ036',
//     'GAZ037',
//     'GAZ035',
//     'GAZ022',
//     'GAZ054',
//     'GAZ055',
//   ];
//   gaCounties = gaCounties.map(eachCounty => eachCounty);
  const weatherData = useContent({
    source: 'weather',
    query: {
      zones: 'MTC063',
    },
  });

  console.log('WEATHER DATA', weatherData);
  if (weatherData) {
    weatherData.map((zone, idx) => {
      const { headline: alertHeadline } = zone || {};
      const { areaDesc: alertArea } = zone || {};
      console.log('HEADLINE', alertHeadline);
      console.log('AREA', alertArea);
      return (
        <div className="testingWeather" key={idx}>
          THIS IS MY WEATHER DATA {alertHeadline} {alertArea}
        </div>
      );
    });
  }
  return null;
};

export default WeatherAlerts;
