import React from 'react';
import PropTypes from 'prop-types';
import TimeStamp from '../../article/timestamp/default';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import './SliderItem.scss';


const SliderItem = ({ data, refHook }) => {
  const {
    classes, headline, image, canonicalUrl, timestampData, sectionLabelData, contentType,
  } = data;
  const { displayDate, firstPublishDate } = timestampData;
  const { taxonomy, label } = sectionLabelData;
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  const imageData = { url: image };

  return (
    <div ref={refHook || null} className={`c-slider-item ${classes || ''}`}>
        <Image
          height={282}
          width={500}
          src={imageData}
          teaseContentType={contentType}
          canonicalUrl={canonicalUrl || null}
        />
      <div className="sliderList-text">
        <div className="c-label-wrapper">
          <SectionLabel label={label} taxonomy={taxonomy} />
          <TimeStamp
            firstPublishDate={firstPublishDate}
            displayDate={displayDate}
            isHideTimestampTrue={isHideTimestampTrue}
            isTease={true}
          />
        </div>
        <a className="headline" href={canonicalUrl}>{truncateHeadline(headline)}</a>
      </div>
    </div>
  );
};

SliderItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  refHook: PropTypes.func,
  classes: PropTypes.string,
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
