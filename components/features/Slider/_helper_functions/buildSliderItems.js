import React from 'react';
import SliderItem from '../../../_helper_components/home/Slider/SliderItem';
import getItemThumbnail from './getItemThumbnail';

const buildSliderItems = (sliderCollection, ref) => {
  let elCount = 0;
  const sliderItems = sliderCollection.content_elements.map((elem) => {
    const itemThumbnail = getItemThumbnail(elem.promo_items || elem.firstInlineImage);

    if (!itemThumbnail) return null;

    const data = {};
    data.classes = elCount === 0 ? 'is-firstItem' : '';
    data.index = elCount;

    elCount += 1;

    data.timestampData = {};
    data.sectionLabelData = {};

    data.image = itemThumbnail;

    data.contentType = elem.type || null;

    data.headline = elem.headlines && elem.headlines.basic ? elem.headlines.basic : null;

    data.canonicalUrl = elem.canonical_url ? elem.canonical_url : null;

    data.timestampData.displayDate = elem.display_date ? elem.display_date : null;

    data.timestampData.firstPublishDate = elem.first_publish_date ? elem.first_publish_date : null;

    data.sectionLabelData.taxonomy = elem.taxonomy ? elem.taxonomy : null;

    data.sectionLabelData.label = elem.label ? elem.label : null;

    return <SliderItem key={`tease-${elCount}`} data={data} refHook={ref} />;
  });

  return sliderItems;
};

export default buildSliderItems;
