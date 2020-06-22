import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import TimeStamp from '../../article/timestamp/default';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import './SliderItem.scss';

const SliderItem = ({ data, refHook }) => {
  const {
    classes, headline, image: imageData, canonicalUrl, timestampData, sectionLabelData, contentType,
  } = data;
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const { displayDate, firstPublishDate } = timestampData;
  const { taxonomy, label } = sectionLabelData;
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const { tags = [] } = taxonomy || {};
  const isHyperlocalContent = checkTags(
    tags,
    hyperlocalTags.filter(tag => tag !== 'community contributor'),
  );
  const isCommunityContributor = checkTags(tags, 'community contributor');
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';

  return (
    <div ref={refHook || null} className={`c-slider-item ${classes || ''}`}>
      <a href={canonicalUrl || null}>
        <Image height={282} width={500} src={imageData} teaseContentType={contentType} canonicalUrl={canonicalUrl || null} />
      </a>

      <div className="sliderList-text">
        <div className="c-label-wrapper">
          {isHyperlocalContent && isCommunityContributor && <ContributorBadge tags={tags} ampPage={ampPage} />}
          {(!isHyperlocalContent || !isCommunityContributor) && (
            <>
              <SectionLabel label={label || {}} taxonomy={taxonomy} />
              <TimeStamp
                firstPublishDate={firstPublishDate}
                displayDate={displayDate}
                isHideTimestampTrue={isHideTimestampTrue}
                isTease={true}
              />
            </>
          )}
        </div>
        <a className="headline" href={canonicalUrl}>
          {truncateHeadline(headline)}
        </a>
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
