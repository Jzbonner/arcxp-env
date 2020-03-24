import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import TimeStamp from '../../article/timestamp/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';

const ListItem = ({
  promo_items: promoItems,
  label,
  taxonomy,
  first_publish_date: firstPublishDate,
  display_date: displayDate,
  headlines,
  website_url: relativeURL,
}) => {
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  return (
    <div className="c-homeList">
      {promoItems.basic && (
        <a href={relativeURL} className="homeList-image">
          <Image src={promoItems.basic || promoItems.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />
        </a>
      )}
      <div className="homeList-text">
        <div className="c-label-wrapper">
          <SectionLabel label={label} taxonomy={taxonomy} />
          <TimeStamp firstPublishDate={firstPublishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
        </div>
        <div className="headline">
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
  first_publish_date: PropTypes.string,
  display_date: PropTypes.string,
  headlines: PropTypes.object,
  website_url: PropTypes.string,
};

export default ListItem;
