import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import imageResizer from '../../layouts/_helper_functions/Thumbor';
import getTeaseIcon from '../../_helper_components/global/image/_helper_functions/getTeaseIcon';
import './default.scss';

const Hero = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, startIndex = 1 },
  } = customFields;

  const appContext = useAppContext();
  const { contextPath } = appContext;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  if (data) {
    const { content_elements: innerData } = data || {};
    const singleItem = innerData[startIndex] ? innerData[startIndex - 1] : null; // adding "-1" so the array index always starts from 0
    const { url: heroBackground } = singleItem && singleItem.promo_items ? singleItem.promo_items.basic : '';
    const { basic: headline } = singleItem && singleItem.headlines ? singleItem.headlines : '';
    const { canonical_url: heroURL } = singleItem || '';
    const contentType = innerData[startIndex - 1] ? innerData[startIndex - 1].type : null;

    if (innerData && heroBackground) {
      return (
        <div className="c-heroFeature">
          <a href={`${contextPath}${heroURL}`} className="hero-url" />
          <div className="hero-img" style={{ backgroundImage: `url(${imageResizer(heroBackground)})`, backgroundRepeat: 'no-repeat' }}>
            <div className="hero-headline">
              <h2 className="headline-text">{truncateHeadline(headline)}</h2>
            </div>
            {contentType === 'gallery' || contentType === 'video' ? getTeaseIcon(contentType, heroURL) : null}
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
