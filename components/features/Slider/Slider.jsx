/* eslint-disable */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import SliderItem from '../../_helper_components/home/Slider/SliderItem';
import ListItem from '../../_helper_components/home/ListItem/ListItem';

const Slider = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      startIndex = 1,
      itemLimit = 100,
      displayClass = '',
    },
  } = customFields;

  const [translateX, setTranslateX] = useState(0);

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });





  const buildSliderItemArray = () => {

    const sliderItems = data.data.map((elem) => {
      let data = {};
      data.timestampData = {};
      data.sectionLabelData = {};

      data.headline = elem.headlines && elem.headlines.basic ? elem.headlines.basic : null;

      data.canonicalUrl = elem.canonical_url ? elem.canonical_url : null;

      data.timestampData.displayDate = elem.display_date ? elem.display_date : null;

      data.timestampData.firstPublishDate = elem.first_publish_date ? elem.first_publish_date : null;

      data.sectionLabelData.taxonomy = elem.taxonomy ? elem.taxonomy : null;

      data.sectionLabelData.label = elem.label ? elem.label : null;

      return <SliderItem data={data}/>;

    });

    return sliderItems;
  };

  // console.log('slider items mapped', buildSliderItemArray());
  return null;

/*   return (
    <div className="slider-wrapper">
      <div className="slider-background">
        <ul className="slider-content"></ul>
        <div className="slider-button-box">
          <button className="slider-button-left"></button>
          <button className="slider-button-right"></button>
        </div>
      </div>
    </div>
  ) */
};

Slider.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections','query-feed').tag({
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
    displayClass: PropTypes.oneOf(['Slider', 'Slider - Special Features']).tag({
      name: 'Display Class',
      defaultValue: 'Slider',
    }),
  }),
};

export default Slider;
