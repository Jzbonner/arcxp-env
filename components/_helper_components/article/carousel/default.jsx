import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildCarouselItem from './_helper_functions/buildCarouselItems';
import './default.scss';

const Carousel = ({ storyId, taxonomy, ampPage }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path } = primarySection || {};

  const formattedPath = path ? path.substring(1) : null;

  if (!ampPage || !formattedPath) return null;

  const relatedStoryData = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 18,
    },
  });

  const siteLogoData = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    filter: 'logo',
  });

  const fetchedSiteLogo = siteLogoData
    && siteLogoData.site
    && siteLogoData.site.site_logo_image_small
    ? siteLogoData.site.site_logo_image_small : null;

  if (!relatedStoryData) return null;

  const carouselItems = buildCarouselItem(relatedStoryData, storyId, fetchedSiteLogo);

  return (
    <div className="c-carousel">
      <amp-carousel width="auto" height="94" layout="fixed-height" type="carousel">{carouselItems}</amp-carousel>
    </div>
  );
};

Carousel.propTypes = {
  storyId: PropTypes.string,
  taxonomy: PropTypes.object,
  ampPage: PropTypes.bool,
};

export default Carousel;
