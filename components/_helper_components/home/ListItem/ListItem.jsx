import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
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
}) => {
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  const relativeURL = websites[sites] && websites[sites].website_url;
  const isListPage = listPage ? 'listPage' : '';

  return (
    <div className={`c-homeList ${isListPage}`}>
      {promoItems && (
        <a href={relativeURL} className="homeList-image">
          <Image src={promoItems.basic || promoItems.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />
        </a>
      )}
      <div className="homeList-text">
        <div className="c-label-wrapper">
          <SectionLabel label={label} taxonomy={taxonomy} />
          <TimeStamp firstPublishDate={publishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
        </div>
        <div className={`headline ${isListPage}`}>
          <a href={relativeURL}>{truncateHeadline(headlines.basic)}</a>
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
};

export default ListItem;
