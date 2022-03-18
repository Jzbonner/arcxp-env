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
import getTeaseIcon from '../../global/image/_helper_functions/getTeaseIcon';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName';

const ListItem = ({
  label,
  taxonomy,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines = [],
  canonical_url: canonicalUrl,
  canonical_website: canonicalSite,
  website_url: websiteUrl,
  listPage,
  type: contentType,
  promo_items: promoItems,
  firstInlineImage,
  teaseImageObject,
  showPreview,
  isSynopsis = false,
  displayClass,
  hidePromo,
  isDontMissFeature = false,
  isTTDFeature = false,
  noBorder = false,
  isStaffBioPage = false,
  content_elements: contentElements,
}) => {
  const appContext = useAppContext();
  const { arcSite, requestUri } = appContext;
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
  const finalURL = canonicalSite && canonicalSite !== arcSite && arcSite === 'ajc' ? `//${fetchEnv() !== 'prod' ? 'sandbox' : 'www'}.${handleSiteName(canonicalSite)}.com${relativeURL}` : relativeURL;
  const isListPage = listPage ? 'listPage' : '';
  let defaultPromoWidth = 500;
  let defaultPromoHeight = 282;
  if (isTTDFeature || isListPage) {
    defaultPromoWidth = 110;
    defaultPromoHeight = 110;
  }

  const isLeftPhotoNoPhotoItem = displayClass === 'Redesign Feature - Left Photo No Photo';
  const leftPhotoNoPhotoSizeInt = 80;
  const promoWidth = isLeftPhotoNoPhotoItem ? leftPhotoNoPhotoSizeInt : defaultPromoWidth;
  const promoHeight = isLeftPhotoNoPhotoItem ? leftPhotoNoPhotoSizeInt : defaultPromoHeight;

  function getPromoItem() {
    if (teaseImageObject) {
      return teaseImageObject;
    }
    if (promoItems) {
      if (contentType === 'video' || contentType === 'gallery') {
        if (promoItems.basic) {
          return promoItems.basic;
        }
      }
      if (promoItems?.basic?.type === 'image') {
        return promoItems.basic || promoItems.lead_art.promo_items.basic;
      }
      if (promoItems?.basic?.type === 'video' || promoItems?.basic?.type === 'gallery') {
        if (promoItems.basic.promo_items && promoItems.basic.promo_items.basic) {
          return promoItems.basic.promo_items.basic;
        }
      }
    }
    if (firstInlineImage) {
      return firstInlineImage;
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

  if (finalURL === '/') return null;

  return (
    <div className={`c-homeList ${isListPage} ${isMissingPromo} ${hidePromo ? 'no-photo' : ''} ${isLeftPhotoNoPhotoItem && !hidePromo ? 'left-photo' : ''} ${isStaffBioPage ? 'staffBio-listItem' : ''} ${noBorder ? 'no-border-bottom' : ''}`}>
      {!hidePromo && getPromoItem() && !isDontMissFeature && !isSynopsis && (
        <a href={finalURL} className="homeList-image">
          <Image src={getPromoItem()} width={promoWidth} height={promoHeight} imageType="isHomepageImage" teaseContentType={contentType === 'video' || contentType === 'gallery' ? contentType : null} squareImage={isListPage === 'listPage'}/>
            {!isLeftPhotoNoPhotoItem && sponsorName && <div className="c-sponsorOverlay">{sponsorName}</div>}
          </a>
      )}
      <div className="homeList-text">
        {!hidePromo && !isDontMissFeature && !isSynopsis && getTeaseIcon(contentType)}
        <div className="c-label-wrapper">{getLabelContent(sponsorName)}</div>
        <div className={`headline ${isListPage}`}>
          <a href={finalURL}>
            {truncateHeadline(headlines.basic, !isSynopsis)}
          </a>
          {showPreview && <ListItemPreview storyData={{ contentElements, headlines }} />}
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
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  display_date: PropTypes.string,
  first_publish_date: PropTypes.string,
  headlines: PropTypes.object,
  listPage: PropTypes.bool,
  type: PropTypes.string,
  canonical_url: PropTypes.string,
  canonical_website: PropTypes.string,
  website_url: PropTypes.string,
  showPreview: PropTypes.bool,
  _id: PropTypes.string,
  isSynopsis: PropTypes.bool,
  displayClass: PropTypes.string,
  hidePromo: PropTypes.bool,
  isDontMissFeature: PropTypes.bool,
  isTTDFeature: PropTypes.bool,
  promo_items: PropTypes.object,
  firstInlineImage: PropTypes.object,
  teaseImageObject: PropTypes.object,
  noBorder: PropTypes.bool,
  isStaffBioPage: PropTypes.bool,
  content_elements: PropTypes.object,
};

export default ListItem;
