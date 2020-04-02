/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildSliderItems from './_helper_functions/buildSliderItems';
import './slider.scss';

const Slider = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      startIndex = 1,
      itemLimit = 100,
      displayClass = '',
      title = '',
    },
  } = customFields;

  const [sliderItems, setSliderItems] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  console.log(data);

  if (data && !sliderItems) setSliderItems(buildSliderItems(data));

  // console.log('slider items mapped', buildSliderItemArray());

  return (
    <div className="c-slider-wrapper">
      <h1 className="slider-title">{title}</h1>
      <div className="c-slider-content">{sliderItems}</div>
      <div className="c-slider-button">
        <button className="slider-button-left"></button>
        <button className="slider-button-right"></button>
      </div>
    </div>
  )
};

Slider.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections', 'query-feed').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 1,
    }),
    title: PropTypes.string.tag({
      name: 'Slider Title',
      defaultValue: 'Special Features',
    }),
    displayClass: PropTypes.oneOf(['Slider', 'Slider - Special Features']).tag({
      name: 'Display Class',
      defaultValue: 'Slider',
    }),
  }),
};

export default Slider;
