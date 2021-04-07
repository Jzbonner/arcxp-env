import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import TimeStamp from '../../article/timestamp/default';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import ListItemPreview from '../ListItemPreview/ListItemPreview';

const ListItem = ({
  promo_items: promoItems,
  label,
  taxonomy,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines = [],
  canonical_url: canonicalUrl,
  website_url: websiteUrl,
  listPage,
  type: contentType,
  firstInlineImage,
  showPreview,
  _id: id,
  isSynopsis = false,
  isDontMissFeature = false,
  isTTDFeature = false,
}) => {
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const { tags = [], sections } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(
    paramKey => paramKey === 'outputType',
  );
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

  const [isMissingPromo, setIsMissingPromo] = useState('');

  const relativeURL = websiteUrl || canonicalUrl || '/';
  const isListPage = listPage ? 'listPage' : '';
  let imageSizes = { width: 500, height: 282 };
  if (isTTDFeature) {
    imageSizes = { width: 110, height: 110 };
  }

  function getPromoItem(sponsor) {
    // standalone video/gallery
    if (contentType === 'video' || contentType === 'gallery') {
      if (promoItems && promoItems.basic) {
        return (
          <a href={relativeURL} className="homeList-image">
            <Image
              src={promoItems.basic}
              width={imageSizes.width}
              height={imageSizes.height}
              imageType="isHomepageImage"
              teaseContentType={contentType}
            />
            {sponsor && (
              <div className="c-sponsorOverlay">{sponsor}</div>
            )}
          </a>
        );
      }
    }

    if (promoItems) {
      if (promoItems.basic && promoItems.basic.type === 'image') {
        return (
          <a href={relativeURL} className="homeList-image">
            <Image
              src={promoItems.basic || promoItems.lead_art.promo_items.basic}
              width={imageSizes.width}
              height={imageSizes.height}
              imageType="isHomepageImage"
            />
            {sponsor && (
              <div className="c-sponsorOverlay">{sponsor}</div>
            )}
          </a>
        );
      }

      if (
        (promoItems.basic && promoItems.basic.type === 'video')
        || (promoItems.basic && promoItems.basic.type === 'gallery')
      ) {
        if (
          promoItems.basic.promo_items
          && promoItems.basic.promo_items.basic
        ) {
          return (
            <a href={relativeURL} className="homeList-image">
              <Image
                src={promoItems.basic.promo_items.basic}
                width={imageSizes.width}
                height={imageSizes.height}
                imageType="isHomepageImage"
              />
              {sponsor && (
                <div className="c-sponsorOverlay">{sponsor}</div>
              )}
            </a>
          );
        }
      }
    }

    if (firstInlineImage) {
      return (
        <a href={relativeURL} className="homeList-image">
          <Image
            src={firstInlineImage}
            width={imageSizes.width}
            height={imageSizes.height}
            imageType="isHomepageImage"
          />
          {sponsor && <div className="c-sponsorOverlay">{sponsor}</div>}
        </a>
      );
    }

    if (!isMissingPromo) {
      setIsMissingPromo('isMissingPromo');
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

    return null;
  }

  if (relativeURL === '/') return null;

  return (
    <div className={`c-homeList ${isListPage} ${isMissingPromo}`}>
      {getPromoItem(sponsorName)}
      <div className="homeList-text">
        <div className="c-label-wrapper">{getLabelContent(sponsorName)}</div>
        <div className={`headline ${isListPage}`}>
          <a href={relativeURL}>
            {truncateHeadline(headlines.basic, !isSynopsis)}
          </a>
          {showPreview && <ListItemPreview id={id} />}
        </div>
        {!isDontMissFeature && <TimeStamp
            firstPublishDate={firstPublishDate}
            displayDate={displayDate}
            isHideTimestampTrue={isHideTimestampTrue}
            isTease={true}
          />}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  promo_items: PropTypes.object,
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  display_date: PropTypes.string,
  first_publish_date: PropTypes.string,
  headlines: PropTypes.object,
  listPage: PropTypes.bool,
  type: PropTypes.string,
  firstInlineImage: PropTypes.object,
  canonical_url: PropTypes.string,
  website_url: PropTypes.string,
  showPreview: PropTypes.bool,
  _id: PropTypes.string,
  isSynopsis: PropTypes.bool,
  isDontMissFeature: PropTypes.bool,
  isTTDFeature: PropTypes.bool,
};

export default ListItem;
