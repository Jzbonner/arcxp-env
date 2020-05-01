import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import TimeStamp from '../../article/timestamp/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';

const ListItem = ({
  promo_items: promoItems,
  label,
  taxonomy,
  publish_date: publishDate,
  display_date: displayDate,
  headlines,
  websites,
  listPage,
  type: contentType,
  firstInlineImage,
}) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  const relativeURL = (websites && websites[sites] && websites[sites].website_url) || '/';
  const isListPage = listPage ? 'listPage' : '';

  const getPromoItem = () => {
    // standalone video/gallery
    if (contentType === 'video' || contentType === 'gallery') {
      if (promoItems.basic) {
        return <Image src={promoItems.basic} width={1066} height={600} imageType="isHomepageImage" teaseContentType={contentType} />;
      }
    }

    if (promoItems) {
      if (promoItems.basic && promoItems.basic.type === 'image') {
        return (
          <Image src={promoItems.basic || promoItems.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />
        );
      }

      if ((promoItems.basic && promoItems.basic.type === 'video') || (promoItems.basic && promoItems.basic.type === 'gallery')) {
        if (promoItems.basic.promo_items && promoItems.basic.promo_items.basic) {
          return <Image src={promoItems.basic.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
        }
      }
    }

    if (firstInlineImage) {
      return <Image src={firstInlineImage} width={1066} height={600} imageType="isHomepageImage" />;
    }

    return null;
  };

  return (
    <div className={`c-homeList ${isListPage}`}>
      <a href={`${contextPath}${relativeURL}`} className="homeList-image">
        {getPromoItem()}
      </a>

      <div className="homeList-text">
        <div className="c-label-wrapper">
          <SectionLabel label={label || {}} taxonomy={taxonomy} />
          <TimeStamp firstPublishDate={publishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} isTease={true} />
        </div>
        <div className={`headline ${isListPage}`}>
          <a href={`${contextPath}${relativeURL}`}>{truncateHeadline(headlines.basic)}</a>
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
