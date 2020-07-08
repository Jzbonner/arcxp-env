// import React from 'react';
// import { useContent } from 'fusion:content';

const WeatherAlerts = () => null;
/* "blanking out" weather alerts until we get the UI developed
  {

  let gaCounties = [
    'GAZ034',
    'GAZ093',
    'GAZ045',
    'GAZ033',
    'GAZ044',
    'GAZ031',
    'GAZ043',
    'GAZ053',
    'GAZ023',
    'GAZ020',
    'GAZ057',
    'GAZ046',
    'GAZ021',
    'GAZ042',
    'GAZ036',
    'GAZ037',
    'GAZ035',
    'GAZ022',
    'GAZ054',
    'GAZ055',
  ];
  gaCounties = gaCounties.map(eachCounty => eachCounty).join(',');
  const weatherData = useContent({
    source: 'weather',
    query: {
      endpoint: 'alerts',
      lookup: `zones=${gaCounties}`,
    },
  });

  if (weatherData) {
    return (
      <div className="c-weatherAlert">
        {weatherData.map((zone) => {
          const { headline: alertHeadline } = zone || {};
          const { areaDesc: alertArea } = zone || {};
          return (
            <>
              THIS IS MY WEATHER DATA {alertHeadline} {alertArea}
            </>
          );
        })}
      </div>
    );
  }
  return null;
};
*/

export default WeatherAlerts;
