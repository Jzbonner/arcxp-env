import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import './default.scss';

const Carousel = ({ taxonomy }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path } = primarySection || {};
  // console.log(taxonomy);

  if (!path) return null;

  const relatedStoryData = useContent({
    source: 'search-api',
    query: {
      section: path,
      sort: true,
      size: 12,
    },
  });

  console.log('relatedData', relatedStoryData);

  return (
    <amp-carousel width="450" height="300" layout="responsive" type="slides">
{/*   <amp-img
        src="/static/inline-examples/images/image1.jpg"
        width="450"
        height="300"
      ></amp-img>
      <amp-img
        src="/static/inline-examples/images/image2.jpg"
        width="450"
        height="300"
      ></amp-img>
      <amp-img
        src="/static/inline-examples/images/image3.jpg"
        width="450"
        height="300"
      ></amp-img> */}
    </amp-carousel>
  );
};

Carousel.propTypes = {
  taxonomy: PropTypes.object,
};

export default Carousel;
