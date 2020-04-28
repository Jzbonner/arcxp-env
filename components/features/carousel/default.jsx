import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildCarouselItem from './_helper_functions/buildCarouselItems';
import './default.scss';

const Carousel = ({ taxonomy/* , ampPage */ }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path } = primarySection || {};
  // console.log(taxonomy ? 'carsoul got taxes' : 'carsoul DID NOT ge taxes');

  const formattedPath = path ? path.substring(1) : null;

  // console.log('path without first:', formattedPath);

  if (!formattedPath) return null;

  const relatedStoryData = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 12,
    },
  });

  if (!relatedStoryData) return null;

  // console.log('relatedData', relatedStoryData);

  const carouselItems = buildCarouselItem(relatedStoryData);

  return <amp-carousel height="200" layout="responsive">{carouselItems}</amp-carousel>;
};

Carousel.propTypes = {
  taxonomy: PropTypes.object,
  ampPage: PropTypes.bool,
};

export default Carousel;
