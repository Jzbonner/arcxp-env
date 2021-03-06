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

  const { size } = contentConfigValues || {};

  let data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass: 'BigBreakingNews',
      displayClassesRequiringImg: ['BigBreakingNews'],
      width: 1108,
      height: 426,
      useSrcSet: true,
      srcSetSizes: [
        [1108, 426],
        [770, 296],
        [408, 300],
      ],
    },
  });

  data = data && data.slice(0, size);

  const renderLogic = () => {
    const leadItem = data[0];
    const {
      headlines: leadHeadlines,
      promo_items: leadPromoItems,
      canonical_url: leadItemURL,
      teaseImageObject,
    } = leadItem || {};
    const { basic: headline } = leadHeadlines || {};
    const { basic: imageData } = leadPromoItems || {};
    const [, ...restOfItems] = data;
    return (
      <>
        <h2><a href={leadItemURL}>{truncateHeadline(headline, true)}</a></h2>
        <div className="c-breakingContainer">
            <div className="leadItem">
              <a href={leadItemURL}>
                {(teaseImageObject || imageData) && <Image src={teaseImageObject || imageData} width={1108} height={426} imageType="isHomepageImage" useSrcSet={true} srcSetSizes={[[1108, 426], [770, 296], [408, 300]]} />}
              </a>
            </div>
            <div className="restOfItems">
            {restOfItems.map((item, i) => {
              const newItem = item;
              return <ListItem key={`ListItem-${i}`} {...newItem} hidePromo={true} />;
            })}
            </div>
        </div>
      </>
    );
  };

  if (Array.isArray(data)) {
    return <div className="c-bigBreakingNews">{renderLogic()}</div>;
  }
  return null;
};

BigBreakingNews.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
    }),
  }),
};

export default BigBreakingNews;
