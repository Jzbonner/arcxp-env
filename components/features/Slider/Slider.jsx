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


  const buildSliderItems = () => {

    const sliderItems = data.data.map((elem) => {
      const itemThumbnail = getItemThumbnail(elem.promo_items);
      
      if (!itemThumbnail) return null;

      let data = {};
      data.timestampData = {};
      data.sectionLabelData = {};

      data.image = itemThumbnail;

      data.headline = elem.headlines && elem.headlines.basic ? elem.headlines.basic : null;

      data.canonicalUrl = elem.canonical_url ? elem.canonical_url : null;

      data.timestampData.displayDate = elem.display_date ? elem.display_date : null;

      data.timestampData.firstPublishDate = elem.first_publish_date ? elem.first_publish_date : null;

      data.sectionLabelData.taxonomy = elem.taxonomy ? elem.taxonomy : null;

      data.sectionLabelData.label = elem.label ? elem.label : null;



      return <SliderItem data={data} />;

    });

    return sliderItems;
  };

  const getItemThumbnail = (promoItems) => {

    if (!promoItems.basic) return null;

    if (promoItems.basic.type && promoItems.basic.type === 'image' && promoItems.basic.url) return promoItems.basic.url;

    // getting nested image url if parent promo_item is type video
    if (promoItems.basic && promoItems.basic.type === 'video' && promoItems.basic.promo_items
      && promoItems.basic.promo_items.basic && promoItems.basic.promo_items.basic.type === 'image'
      && promoItems.basic.promo_items.basic.url) {
      return promoItems.basic.promo_items.basic.url;
    }


    return null;
  };

  // console.log('slider items mapped', buildSliderItemArray());

  return (
    <div className="slider-wrapper">
      <ul className="slider-content"></ul>
      <div className="slider-button-box">
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
    displayClass: PropTypes.oneOf(['Slider', 'Slider - Special Features']).tag({
      name: 'Display Class',
      defaultValue: 'Slider',
    }),
  }),
};

export default Slider;
