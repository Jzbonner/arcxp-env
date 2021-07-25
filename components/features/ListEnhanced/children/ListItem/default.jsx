import React, { useState } from 'react';
import PropTypes from 'prop-types';
import truncateHeadline from '../../../../layouts/_helper_functions/homepage/truncateHeadline';
import Image from '../../../../_helper_components/global/image/default';
import getTeaseIcon from '../../../../_helper_components/global/image/_helper_functions/getTeaseIcon';
import TimeStamp from '../../../../_helper_components/article/timestamp/default';

const ListItem = ({
  label,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines = [],
  canonical_url: canonicalUrl,
  website_url: websiteUrl,
  type: contentType,
  promo_items: promoItems,
  firstInlineImage,
  teaseImageObject,
}) => {
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const [isMissingPromo, setIsMissingPromo] = useState('');
  const relativeURL = websiteUrl || canonicalUrl || '/';

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
      if (promoItems.basic.type === 'image') {
        return promoItems.basic || promoItems.lead_art.promo_items.basic;
      }
      if (
        promoItems.basic.type === 'video'
        || promoItems.basic.type === 'gallery'
      ) {
        if (
          promoItems.basic.promo_items
          && promoItems.basic.promo_items.basic
        ) {
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

  if (relativeURL === '/') return null;

  return (
    <div className={`c-listpage-listitem ${isMissingPromo}`}>
      <div className="col-1">
        {getTeaseIcon(contentType)}
        <div className="headline">
          <a href={relativeURL}>{truncateHeadline(headlines.basic, false)}</a>
        </div>
        <TimeStamp
          firstPublishDate={firstPublishDate}
          displayDate={displayDate}
          isHideTimestampTrue={isHideTimestampTrue}
          isTease={true}
        />
      </div>
      <div className="col-2">
        {getPromoItem() && (
          <a href={relativeURL} className="image">
            <Image
              src={getPromoItem()}
              width={110}
              height={110}
              imageType="isHomepageImage"
              teaseContentType={
                contentType === 'video' || contentType === 'gallery'
                  ? contentType
                  : null
              }
              squareImage={true}
            />
          </a>
        )}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  label: PropTypes.object,
  display_date: PropTypes.string,
  first_publish_date: PropTypes.string,
  headlines: PropTypes.object,
  type: PropTypes.string,
  canonical_url: PropTypes.string,
  website_url: PropTypes.string,
  showPreview: PropTypes.bool,
  promo_items: PropTypes.object,
  firstInlineImage: PropTypes.object,
  teaseImageObject: PropTypes.object,
};

export default ListItem;
