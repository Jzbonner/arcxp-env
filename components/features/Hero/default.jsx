import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import './default.scss';

const Hero = (customFields = {}) => {
  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, startIndex = 0 },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  const { data: innerData } = data || {};

  console.log('DATA', innerData);

  if (data && innerData) {
    const singleItem = innerData[startIndex] ? innerData[startIndex] : null;
    const { url: heroBackground } = singleItem && singleItem.promo_items.basic ? singleItem.promo_items.basic : {};
    const { basic: headline } = singleItem && singleItem.headlines ? singleItem.headlines : {};
    const limitHeadline = () => {
      const dots = '...';
      if (headline.length > 72) {
        const newHeadline = headline.substring(0, 72) + dots;
        return newHeadline;
      }
      return headline;
    };

    return (
      <div className="c-heroFeature">
        <img className="hero-img" src={heroBackground} alt={headline} />
        <h2 className="hero-headline">{limitHeadline()}</h2>
      </div>
    );
  }
  return null;
};

Hero.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 0,
    }),
  }),
};

export default Hero;
