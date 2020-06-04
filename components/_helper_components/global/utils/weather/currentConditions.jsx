import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';

const currentConditions = () => {
  const { weatherLocationId } = getProperties();
  const weatherData = useContent({
    source: 'weather',
    query: {
      endpoint: 'currentconditions',
      lookup: `location=${weatherLocationId || 348181}`,
    },
  });

  if (weatherData) {
    const {
      Temperature: temp,
      WeatherIcon: icon,
      WeatherText: text,
      PrecipitationType: precipitation = '',
    } = weatherData[0] || {};
    // icons are integers but the file path has leading zeroes, per https://developer.accuweather.com/weather-icons
    const iconPath = `https://developer.accuweather.com/sites/default/files/${icon < 10 ? `0${icon}` : icon}-s.png`;

    return {
      temp,
      iconPath,
      text,
      precipitation,
    };
  }
  return null;
};

export default currentConditions;
