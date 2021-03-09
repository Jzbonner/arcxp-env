import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import TimeStamp from '../../article/timestamp/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import './Headline.scss';

const Headline = ({
  promo_items: promoItems,
  label,
  taxonomy,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines,
  canonical_url: canonicalUrl,
  website_url: websiteUrl,
  type,
  firstInlineImage,
  isTease,
}) => {
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const { tags = [], sections } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const isHyperlocalContent = checkTags(
    tags,
    hyperlocalTags.filter(tag => tag !== 'community contributor'),
  );
  const isCommunityContributor = checkTags(tags, 'community contributor');
  const sponsorName = getSponsorData(sections);

  const relativeURL = websiteUrl || canonicalUrl || '/';

  function getPromoItem(contentType) {
    if (promoItems) {
      if (contentType === 'video' || contentType === 'gallery') {
        if (promoItems.basic) {
          return <Image src={promoItems.basic} width={1066} height={600} imageType="isHomepageImage" teaseContentType={contentType} />;
        }
      }
      if (promoItems.basic.type === 'image') {
        return (
          <Image src={promoItems.basic || promoItems.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />
        );
      }
      if (promoItems.basic.type === 'video' || promoItems.basic.type === 'gallery') {
        if (promoItems.basic.promo_items && promoItems.basic.promo_items.basic) {
          return <Image src={promoItems.basic.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
        }
      }
    }
    if (firstInlineImage) {
      return <Image src={firstInlineImage} width={1066} height={600} imageType="isHomepageImage" />;
    }
    return null;
  }

  function getLabelContent(sponsor) {
    if (sponsor) {
      return <div className="c-sponsor">Advertiser Content</div>;
    }

    if (isHyperlocalContent && isCommunityContributor) {
      return <ContributorBadge tags={tags} ampPage={ampPage} />;
    }

    if (!isTease) {
      return <SectionLabel label={label || {}} taxonomy={taxonomy || {}} />;
    }

    return null;
  }

  return (
    <div className={`home-headline ${sponsorName ? 'sponsored' : ''}`}>
      <a href={relativeURL} className='homeList-image'>
        {getPromoItem(type)}
        {sponsorName && <div className="c-sponsorOverlay">{sponsorName}</div>}
        </a>
      <div className="headline-box">
       {getLabelContent(sponsorName)}
        <a href={relativeURL} className="headline">
          {headlines && truncateHeadline(headlines.basic, true)}
        </a>
        {isTease
          ? <TimeStamp
              firstPublishDate={firstPublishDate}
              displayDate={displayDate}
              isHideTimestampTrue={isHideTimestampTrue}
              isTease={isTease} />
          : null
        }
      </div>
    </div>
  );
};

Headline.propTypes = {
  promo_items: PropTypes.object,
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  first_publish_date: PropTypes.string,
  display_date: PropTypes.string,
  headlines: PropTypes.object,
  type: PropTypes.string,
  firstInlineImage: PropTypes.object,
  isTease: PropTypes.bool,
  canonical_url: PropTypes.string,
  website_url: PropTypes.string,
};

export default Headline;
