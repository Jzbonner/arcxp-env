import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
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
  websites,
}) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};

  const relativeURL = (websites && websites[sites] && websites[sites].website_url) || '/';

  function getPromoItem(items) {
    if (items.basic.type === 'image') {
      return <Image src={items.basic || items.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
    }
    if (items.basic.type === 'video' || items.basic.type === 'gallery') {
      if (items.basic.promo_items && items.basic.promo_items.basic) {
        return <Image src={items.basic.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
      }
    }
    return null;
  }

  return (
    <div className="home-headline">
      <a href={`${contextPath}${relativeURL}`}>{promoItems && getPromoItem(promoItems)}</a>
      <div className="headline-box">
        <SectionLabel label={label} taxonomy={taxonomy} />
        <TimeStamp firstPublishDate={publishDate} displayDate={displayDate} isHideTimestampTrue={isHideTimestampTrue} />
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
};

export default Headline;
