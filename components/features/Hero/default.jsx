import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import './default.scss';

const Hero = (customFields = {}) => {
  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, startIndex = 1 },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });
  const { data: innerData } = data || {};
  const singleItem = innerData[startIndex] ? innerData[startIndex - 1] : null; // adding "-1" so the array index always starts from 0
  const { url: heroBackground } = singleItem && singleItem.promo_items ? singleItem.promo_items.basic : '';
  const { basic: headline } = singleItem && singleItem.headlines ? singleItem.headlines : '';
  const { canonical_url: heroURL } = singleItem || '';

  if (data && innerData && heroBackground) {
    const limitHeadline = () => {
      const dots = '...';
      if (headline.length > 72) {
        // add dots if the length is more than 72 characters
        let newHeadline = headline.substring(0, 72);
        // don't truncate mid-word
        newHeadline = newHeadline.substring(0, Math.min(newHeadline.length, newHeadline.lastIndexOf(' '))) + dots;
        return newHeadline;
      }
      return headline;
    };
    return (
      <div className="c-heroFeature">
        <a href={heroURL} className="hero-url" />
        <div className="hero-img" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="hero-headline">
            <h2 className="headline-text">{limitHeadline()}</h2>
          </div>
        </div>
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
      defaultValue: 1,
    }),
  }),
};

export default Hero;
