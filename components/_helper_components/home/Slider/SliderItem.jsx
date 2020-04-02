import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default';
import TimeStamp from '../../article/timestamp/default';
import SectionLabel from '../../global/sectionLabel/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';


const SliderItem = ({ data }) => {
  const {
    headline, image, canonicalUrl, timestampData, sectionLabelData,
  } = data;
  const { displayDate, firstPublishDate } = timestampData;
  const { taxonomy, label } = sectionLabelData;
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  return (
    <div className="c-slider-item">
        <a href={canonicalUrl} className="slider-item-image">
          <Image src={image} imageType={'isInlineImage'}/>
        </a>
      <div className="homeList-text">
        <div className="c-label-wrapper">
          <SectionLabel label={label} taxonomy={taxonomy} />
          <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
        </div>
        <div className="headline">
          <a href={canonicalUrl}>{truncateHeadline(headline)}</a>
        </div>
      </div>
    </div>
  );
};

SliderItem.propTypes = {
  data: PropTypes.object,
  image: PropTypes.string,
  headline: PropTypes.string,
  canonicalUrl: PropTypes.string,
  timestampData: PropTypes.object,
  sectionLabelData: PropTypes.object,
  displayDate: PropTypes.string,
  firstPublishDate: PropTypes.string,
  taxonomy: PropTypes.object,
  label: PropTypes.object,
};

export default SliderItem;
