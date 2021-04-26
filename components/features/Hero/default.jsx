import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import getTeaseIcon from '../../_helper_components/global/image/_helper_functions/getTeaseIcon';
import './default.scss';

const Hero = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {} },
  } = customFields;

  const displayClass = 'all';
  const displayClassesRequiringImg = ['all'];

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  if (Array.isArray(data)) {
    const singleItem = data[0];
    const { basic: headline = '' } = singleItem && singleItem.headlines ? singleItem.headlines : {};
    const { canonical_url: heroURL = '' } = singleItem || {};
    const contentType = singleItem?.type || null;
    const heroBackground = singleItem?.teaseImageObject?.url;

    if (data) {
      return (
        <div className="c-heroFeature">
          <a href={heroURL} className="hero-url" />
          <div className="hero-img"
          style={{ backgroundImage: `url(${heroBackground})`, backgroundRepeat: 'no-repeat' }}>
            <div className="hero-headline">
              <h2 className="headline-text">{truncateHeadline(headline, true)}</h2>
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
  }),
};

export default Hero;
