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

const ListItem = ({
  promo_items: promoItems,
  label,
  taxonomy,
  publish_date: publishDate,
  display_date: displayDate,
  headlines,
  websites,
  listPage,
  type,
}) => {
  const appContext = useAppContext();
  const { contextPath, requestUri } = appContext;
  const { tags = [] } = taxonomy || {};
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';
  const { sites } = getProperties();
  const { hide_timestamp: hideTimestamp } = label || {};
  const { text: isHideTimestampTrue } = hideTimestamp || {};
  const hyperlocalTags = getProperties().hyperlocalTags || [];
  const isHyperlocalContent = checkTags(tags, hyperlocalTags);

  const relativeURL = (websites && websites[sites] && websites[sites].website_url) || '/';
  const isListPage = listPage ? 'listPage' : '';

  const getPromoItem = (items, contentType) => {
    // standalone video/gallery
    if (contentType === 'video' || contentType === 'gallery') {
      if (items.basic) {
        return <Image src={items.basic} width={1066} height={600} imageType="isHomepageImage" teaseContentType={contentType} />;
      }
    }

    if (items.basic && items.basic.type === 'image') {
      return <Image src={items.basic || items.lead_art.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
    }

    if ((items.basic && items.basic.type === 'video') || (items.basic && items.basic.type === 'gallery')) {
      if (items.basic.promo_items && items.basic.promo_items.basic) {
        return <Image src={items.basic.promo_items.basic} width={1066} height={600} imageType="isHomepageImage" />;
      }
    }

    return null;
  };

  return (
    <div className={`c-homeList ${isListPage}`}>
      {promoItems && (
        <a href={`${contextPath}${relativeURL}`} className="homeList-image">
          {getPromoItem(promoItems, type)}
        </a>
      )}
      <div className="homeList-text">
        <div className="c-label-wrapper">
          {isHyperlocalContent && <ContributorBadge tags={tags} ampPage={ampPage} />}
          {!isHyperlocalContent && (
            <>
              <SectionLabel label={label || {}} taxonomy={taxonomy} />
              <TimeStamp
                firstPublishDate={publishDate}
                displayDate={displayDate}
                isHideTimestampTrue={isHideTimestampTrue}
                isTease={true}
              />
            </>
          )}
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
};

export default ListItem;
