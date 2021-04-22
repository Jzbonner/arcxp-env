import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import getTeaseIcon from '../../global/image/_helper_functions/getTeaseIcon';
import TimeStamp from '../../article/timestamp/default';
import './SliderItem.scss';

const SliderItem = ({ data, refHook, viewport }) => {
  const {
    classes, headline, image: imageData, canonicalUrl, sectionLabelData, contentType, timestampData,
  } = data;
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const { taxonomy } = sectionLabelData;
  const { displayDate, firstPublishDate } = timestampData;
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const { tags = [], sections } = taxonomy || {};
  const isHyperlocalContent = checkTags(
    tags,
    hyperlocalTags.filter(tag => tag !== 'community contributor'),
  );
  const isCommunityContributor = checkTags(tags, 'community contributor');
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const sponsorName = getSponsorData(sections);

  const dimensionType = {
    HEIGHT: 'HEIGHT',
    WIDTH: 'WIDTH',
  };

  function getLabelContent() {
    if (sponsorName) {
      return <div className="c-sponsor">Advertiser Content</div>;
    }

    if (isHyperlocalContent && isCommunityContributor) {
      return <ContributorBadge tags={tags} ampPage={ampPage} />;
    }

    return null;
  }

  function getImageSize(type) {
    /* check viewport prop to decide img size */
    if (viewport === 'DESKTOP') {
      if (type === 'HEIGHT') {
        return 149;
      }
      return 150;
    }
    if (viewport === 'TABLET') {
      if (type === 'HEIGHT') {
        return 123;
      }
      return 124;
    }
    if (viewport === 'MOBILE') {
      if (type === 'HEIGHT') {
        return 104;
      }
      return 105;
    }

    return null;
  }

  if (!canonicalUrl || !imageData) return null;

  return (
    <div ref={refHook || null} className={`c-slider-item ${classes || ''}`}>
      <a href={canonicalUrl} className="homeList-image">
        <Image height={getImageSize(dimensionType.HEIGHT)}
          width={getImageSize(dimensionType.WIDTH)}
          src={imageData}
          canonicalUrl={canonicalUrl || null}
          imageType="isHomepageImage"
          teaseContentType={contentType}
          />
        {sponsorName && <div className="c-sponsorOverlay">{sponsorName}</div>}
      </a>
      <div className="sliderList-text">
      {contentType && getTeaseIcon(contentType)}
        <div className="c-label-wrapper">
          {getLabelContent()}
        </div>
        <a className="headline" href={canonicalUrl}>
          {truncateHeadline(headline, true)}
        </a>
        <TimeStamp
          firstPublishDate={firstPublishDate}
          displayDate={displayDate}
          isTease={true}
        />
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
  viewport: PropTypes.string,
};

export default SliderItem;
