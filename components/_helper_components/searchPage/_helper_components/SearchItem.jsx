import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import getQueryParams from '../../../layouts/_helper_functions/getQueryParams';
import TimeStamp from '../../article/timestamp/default';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import ContributorBadge from '../../global/contributorBadge/default';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import ListItemPreview from '../../home/ListItemPreview/ListItemPreview';
import getTeaseIcon from '../../global/image/_helper_functions/getTeaseIcon';

const SearchItem = ({
  label,
  taxonomy,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines = [],
  canonical_url: canonicalUrl,
  website_url: websiteUrl,
  listPage,
  type: contentType,
  promo_items: promoItems,
  firstInlineImage,
  teaseImageObject,
  showPreview,
  _id: id,
  isSynopsis = false,
  displayClass,
  hidePromo,
  isTTDFeature = false,
  credits,
  description = {},
  noBorder = false,
}) => {
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const { tags = [], primary_site: primarySite, sections } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(
    paramKey => paramKey === 'outputType',
  );
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const { basic = '' } = description;
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
  let defaultPromoWidth = 500;
  let defaultPromoHeight = 282;
  const creditName = credits && credits.by && credits.by[0] && credits.by[0].name ? credits.by[0].name : null;
  const sectionName = primarySite && primarySite.name ? primarySite.name : null;

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
      if (promoItems.basic && promoItems.basic.type === 'image') {
        return promoItems.basic || promoItems.lead_art.promo_items.basic;
      }
      if (promoItems.basic && (promoItems.basic.type === 'video' || promoItems.basic.type === 'gallery')) {
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

  const buildSearchItemRow = () => {
    const sectionEl = () => <span className="search-section">{sectionName}</span>;
    const creditEl = () => <><div className="divider"></div><span className="search-credit">{creditName}</span></>;

    return (<div className="c-credit-row">
      {sectionName && sectionEl()}
      {creditName && creditEl()}
        <TimeStamp
          firstPublishDate={firstPublishDate}
          displayDate={displayDate}
          isHideTimestampTrue={isHideTimestampTrue}
          isTease={true}
          onSearchPage={true}
        />
    </div>);
  };

  return (
    <div className="c-search-item">
      <div className={`c-homeList isSearch ${isMissingPromo}  ${hidePromo ? 'no-photo' : ''} ${noBorder ? 'no-border-bottom' : ''}`} >
        {!hidePromo && getPromoItem() && (
          <a href={relativeURL} className="homeList-image">
            <Image src={getPromoItem()} width={promoWidth} height={promoHeight} imageType="isHomepageImage" teaseContentType={contentType === 'video' || contentType === 'gallery' ? contentType : null} squareImage={isListPage === 'listPage'} />
            {sponsorName && <div className="c-sponsorOverlay">{sponsorName}</div>}
          </a>
        )}
        <div className="homeList-text">
          {!hidePromo && getTeaseIcon(contentType)}
          <div className="c-label-wrapper">{getLabelContent(sponsorName)}</div>
          <div className={`headline ${isListPage}`}>
            <a href={relativeURL}>
              {truncateHeadline(headlines.basic, !isSynopsis)}
            </a>
            {showPreview && <ListItemPreview id={id} />}
          </div>
          {basic && <div className="item-text-preview">{truncateHeadline(basic, !isSynopsis)}</div>}
        </div>
      </div>
      <div className="bottom-content">
        {buildSearchItemRow()}
      </div>
    </div>
  );
};

SearchItem.propTypes = {
  label: PropTypes.object,
  taxonomy: PropTypes.object,
  display_date: PropTypes.string,
  first_publish_date: PropTypes.string,
  headlines: PropTypes.object,
  listPage: PropTypes.bool,
  type: PropTypes.string,
  canonical_url: PropTypes.string,
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
  credits: PropTypes.object,
  description: PropTypes.object,
  noBorder: PropTypes.bool,
};

export default SearchItem;
