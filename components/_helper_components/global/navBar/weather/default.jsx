import React from 'react';
import '../default.scss';
import { useContent } from 'fusion:content';

const Weather = () => {
  const weatherData = useContent({
    source: 'weather',
    query: {
      endpoint: 'currentconditions',
      lookup: 'location=30303',
    },
  });

  if (weatherData) {
    alert('dave', weatherData);
    return (
      <>
        <li className='nav-weather weather-icon'>
          <img height='35px' src='weatherIcon'></img>
         </li>
        <li className='nav-itemText nav-weather weather-text'>
          <a>89°</a>
        </li>
      </>
      // <div className="c-weatherAlert">
      //   {weatherData.map((zone) => {
      //     const { headline: alertHeadline } = zone || {};
      //     const { areaDesc: alertArea } = zone || {};
      //     return (
      //       <>
      //         THIS IS MY WEATHER DATA {alertHeadline} {alertArea}
      //       </>
      //     );
      //   })}
      //   ;
      // </div>
    );
  }
  return null;
};

export default Weather;
