import React from 'react';
import SliderItem from '../../../_helper_components/home/Slider/SliderItem';
import getItemThumbnail from './getItemThumbnail';

const buildSliderItems = (sliderCollection, ref) => {
  // temp
  let elCount = 0;

  const sliderItems = sliderCollection.content_elements.map((elem) => {
    // if (startIndex > 1 && i + 1 < startIndex) return null;
    const itemThumbnail = getItemThumbnail(elem.promo_items);

    if (!itemThumbnail) return null;

    const data = {};
    data.classes = elCount === 0 ? 'is-firstItem' : '';
    const refHook = elCount === 0 ? ref : null;

    // refactor to filter func
    elCount += 1;


    data.timestampData = {};
    data.sectionLabelData = {};

    data.image = itemThumbnail;

    data.headline = elem.headlines && elem.headlines.basic ? elem.headlines.basic : null;

    data.canonicalUrl = elem.canonical_url ? elem.canonical_url : null;

    data.timestampData.displayDate = elem.display_date ? elem.display_date : null;

    data.timestampData.firstPublishDate = elem.first_publish_date ? elem.first_publish_date : null;

    data.sectionLabelData.taxonomy = elem.taxonomy ? elem.taxonomy : null;

    data.sectionLabelData.label = elem.label ? elem.label : null;

    return <SliderItem key={`tease-${elCount}`} data={data} refHook={refHook} />;
  });

  return sliderItems;
};

export default buildSliderItems;
