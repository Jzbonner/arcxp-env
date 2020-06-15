import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useContent } from 'fusion:content';
import buildCarouselItem from './_helper_functions/buildCarouselItems';
import './default.scss';

const Carousel = ({ storyId, taxonomy }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path } = primarySection || {};
  const { logoShort } = getProperties() || {};

  const formattedPath = path ? path.substring(1) : null;

  if (!formattedPath) return null;

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

  const carouselItems = buildCarouselItem(relatedStoryData, storyId, logoShort);

  return (
    <div className="c-carousel">
      <amp-carousel width="auto" height="94" layout="fixed-height" type="carousel">{carouselItems}</amp-carousel>
    </div>
  );
};

Carousel.propTypes = {
  storyId: PropTypes.string,
  taxonomy: PropTypes.object,
};

export default Carousel;
