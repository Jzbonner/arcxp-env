import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import Image from '../../_helper_components/global/image/default';
import ListItem from '../../_helper_components/home/ListItem/ListItem';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import './default.scss';

const BigBreakingNews = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: { content: { contentService = 'collections-api', contentConfigValues } = {} },
  } = customFields;

  let data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
    },
  });
  data = data && data.slice(0, 5);

  const renderLogic = () => {
    const leadItem = data[0];
    const { basic: headline } = leadItem && leadItem.headlines;
    const { canonical_url: leadItemURL } = leadItem || {};
    const { basic: imageData } = leadItem && leadItem.promo_items ? leadItem.promo_items : {};
    const [, ...restOfItems] = data;
    return (
      <div className="c-breakingContainer">
          <div className="leadItem">
            <a href={leadItemURL}>
              <h2>{truncateHeadline(headline, true)}</h2>
              <Image src={imageData} width={1108} height={426} imageType="isHomepageImage"/>
            </a>
          </div>
          <div className="restOfItems">
          {restOfItems.map((item, id) => (
            <ListItem key={`ListItem-${id}`} {...item} />
          ))}
          </div>
      </div>
    );
  };

  if (Array.isArray(data)) {
    return <div className="c-bigBreakingNews">{renderLogic()}</div>;
  }
  return null;
};

BigBreakingNews.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
  }),
};

export default BigBreakingNews;
