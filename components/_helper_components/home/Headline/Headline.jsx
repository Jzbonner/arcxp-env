import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default';
import SectionLabel from '../../global/sectionLabel/default';
import TimeStamp from '../../article/timestamp/default';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import './Headline.scss';

const Headline = ({
  promo_items: promoItems,
  label,
  taxonomy,
  publish_date: publishDate,
  display_date: displayDate,
  headlines,
  website_url: relativeURL,
}) => {
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  return (
    <div className="home-headline">
      <a href={relativeURL}>
        {promoItems && (
          <Image src={promoItems.basic || promoItems.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />
        )}
      </a>
      <div className="headline-box">
        <SectionLabel label={label} taxonomy={taxonomy} />
        <TimeStamp firstPublishDate={publishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
        <a href={relativeURL} className="headline">
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
  website_url: PropTypes.string,
};

export default Headline;
