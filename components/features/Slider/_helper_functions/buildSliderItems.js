import React from 'react';
import SliderItem from '../../../_helper_components/home/Slider/SliderItem';
import getItemThumbnail from './getItemThumbnail';

const buildSliderItems = (sliderCollection, ref, startIndex, itemLimit, viewport) => {
  let elCount = 0;
  const sliderItems = sliderCollection.map((elem, i) => {
    if (startIndex <= i && elCount < itemLimit) {
      const itemThumbnail = getItemThumbnail(elem.teaseImageObject || elem.promo_items || elem.firstInlineImage);

      const data = {};
      // data.classes = elCount === 0 ? 'is-firstItem' : '';
      data.index = elCount;

      elCount += 1;

      data.timestampData = {};
      data.sectionLabelData = {};

      data.image = itemThumbnail || null;

      data.contentType = elem.type || null;

      data.headline = elem.headlines && elem.headlines.basic ? elem.headlines.basic : null;

      data.canonicalUrl = elem.canonical_url || null;

      data.timestampData.displayDate = elem.display_date ? elem.display_date : null;

      data.timestampData.firstPublishDate = elem.first_publish_date ? elem.first_publish_date : null;

      data.sectionLabelData.taxonomy = elem.taxonomy ? elem.taxonomy : null;

      data.sectionLabelData.label = elem.label ? elem.label : null;

      return <SliderItem key={`tease-${elCount}`} data={data} refHook={ref} viewport={viewport} />;
    }
    return null;
  });

  return sliderItems;
};

export default buildSliderItems;
