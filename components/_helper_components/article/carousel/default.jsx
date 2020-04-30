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

  if (!relatedStoryData) return null;

  const carouselItems = buildCarouselItem(relatedStoryData, storyId);

  return (
    <div className="c-carousel">
      <amp-carousel width="100vw" height="200" layout="responsive" type="carousel">{carouselItems}</amp-carousel>
    </div>
  );
};

Carousel.propTypes = {
  storyId: PropTypes.string,
  taxonomy: PropTypes.object,
  ampPage: PropTypes.bool,
};

export default Carousel;
