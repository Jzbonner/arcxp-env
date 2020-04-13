import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import imageResizer from '../../layouts/_helper_functions/Thumbor';
import './default.scss';

const Hero = (customFields = {}) => {
  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, startIndex = 1 },
  } = customFields;

  const appContext = useAppContext();
  const { contextPath } = appContext;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });
  if (data) {
    const { content_elements: innerData } = data || {};
    const singleItem = innerData[startIndex] ? innerData[startIndex - 1] : null; // adding "-1" so the array index always starts from 0
    const { url: heroBackground } = singleItem && singleItem.promo_items ? singleItem.promo_items.basic : '';
    const { basic: headline } = singleItem && singleItem.headlines ? singleItem.headlines : '';
    const { canonical_url: heroURL } = singleItem || '';
    if (innerData && heroBackground) {
      return (
        <div className="c-heroFeature">
          <a href={`${contextPath}${heroURL}`} className="hero-url" />
          <div className="hero-img" style={{ backgroundImage: `url(${imageResizer(heroBackground)})`, backgroundRepeat: 'no-repeat' }}>
            <div className="hero-headline">
              <h2 className="headline-text">{truncateHeadline(headline)}</h2>
            </div>
          </div>
        </div>
      );
    }
    return null;
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
