import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import TimeStamp from '../../article/timestamp/default';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';

const ListItem = ({
  promo_items: promoItems,
  label,
  taxonomy,
  publish_date: publishDate,
  display_date: displayDate,
  headlines = [],
  websites,
  listPage,
  type: contentType,
  firstInlineImage,
}) => {
  const appContext = useAppContext();
  const { contextPath, requestUri } = appContext;
  const { tags = [], sections } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(
    paramKey => paramKey === 'outputType',
  );
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const isHyperlocalContent = checkTags(
    tags,
    hyperlocalTags.filter(tag => tag !== 'community contributor'),
  );
  const isCommunityContributor = checkTags(tags, 'community contributor');
  const sponsorName = getSponsorData(sections);


  const relativeURL = (websites && websites[sites] && websites[sites].website_url) || '/';
  const isListPage = listPage ? 'listPage' : '';

  function getPromoItem(sponsor) {
    // standalone video/gallery
    if (contentType === 'video' || contentType === 'gallery') {
      if (promoItems && promoItems.basic) {
        return (
          <a href={`${contextPath}${relativeURL}`} className="homeList-image">
            <Image
              src={promoItems.basic}
              width={500}
              height={282}
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
          <a href={`${contextPath}${relativeURL}`} className="homeList-image">
            <Image
              src={promoItems.basic || promoItems.lead_art.promo_items.basic}
              width={500}
              height={282}
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
            <a href={`${contextPath}${relativeURL}`} className="homeList-image">
              <Image
                src={promoItems.basic.promo_items.basic}
                width={500}
                height={282}
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
        <a href={`${contextPath}${relativeURL}`} className="homeList-image">
          <Image
            src={firstInlineImage}
            width={500}
            height={282}
            imageType="isHomepageImage"
          />
          {sponsor && <div className="c-sponsorOverlay">{sponsor}</div>}
        </a>
      );
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

    return (
      <>
        <SectionLabel label={label || {}} taxonomy={taxonomy} />
        <TimeStamp
          firstPublishDate={publishDate}
          displayDate={displayDate}
          isHideTimestampTrue={isHideTimestampTrue}
          isTease={true}
        />
      </>
    );
  }

  return (
    <div className={`c-homeList ${isListPage}`}>
      {getPromoItem(sponsorName)}
      <div className="homeList-text">
        <div className="c-label-wrapper">{getLabelContent(sponsorName)}</div>
        <div className={`headline ${isListPage}`}>
          <a href={`${contextPath}${relativeURL}`}>
            {truncateHeadline(headlines.basic)}
          </a>
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  promo_items: PropTypes.object,
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  publish_date: PropTypes.string,
  display_date: PropTypes.string,
  headlines: PropTypes.object,
  websites: PropTypes.object,
  listPage: PropTypes.bool,
  type: PropTypes.string,
  firstInlineImage: PropTypes.object,
};

export default ListItem;
