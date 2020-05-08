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
import './Headline.scss';

const Headline = ({
  promo_items: promoItems,
  label,
  taxonomy,
  publish_date: publishDate,
  display_date: displayDate,
  headlines,
  websites,
  type,
  firstInlineImage,
}) => {
  const appContext = useAppContext();
  const { contextPath, requestUri } = appContext;
  const { tags = [] } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const isHyperlocalContent = checkTags(tags, hyperlocalTags);

  const relativeURL = (websites && websites[sites] && websites[sites].website_url) || '/';

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

  return (
    <div className="home-headline">
      <a href={`${contextPath}${relativeURL}`}>{getPromoItem(type)}</a>
      <div className="headline-box">
        {isHyperlocalContent && <ContributorBadge tags={tags} ampPage={ampPage} />}
        {!isHyperlocalContent && (
          <>
            <SectionLabel label={label} taxonomy={taxonomy} />
            <TimeStamp firstPublishDate={publishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} isTease={true} />
          </>
        )}
        <a href={`${contextPath}${relativeURL}`} className="headline">
          {truncateHeadline(headlines.basic)}
        </a>
      </div>
    </div>
  );
};

Headline.propTypes = {
  promo_items: PropTypes.object,
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  publish_date: PropTypes.string,
  display_date: PropTypes.string,
  headlines: PropTypes.object,
  websites: PropTypes.object,
  type: PropTypes.string,
  firstInlineImage: PropTypes.object,
};

export default Headline;
