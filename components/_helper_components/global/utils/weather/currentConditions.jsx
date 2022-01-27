import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';

const currentConditions = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { weatherLocationId } = getProperties(arcSite);
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

    return {
      temp,
      icon,
      text,
      precipitation,
    };
  }
  return null;
};

export default currentConditions;
