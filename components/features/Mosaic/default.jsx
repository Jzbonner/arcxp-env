import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import get from 'lodash/get';
import getProperties from 'fusion:properties';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import getQueryParams from '../../layouts/_helper_functions/getQueryParams';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ContributorBadge from '../../_helper_components/global/contributorBadge/default';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import getSponsorData from '../../../content/sources/helper_functions/getSponsorData';
import './default.scss';

const Mosaic = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(
    paramKey => paramKey === 'outputType',
  );
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';

  const {
    customFields: {
      content: {
        contentService = 'collections-api',
        contentConfigValues = { id: '' },
      } = {},
      title = '',
      moreURL = '',
    },
  } = customFields;

  let { size: itemLimit } = contentConfigValues || {};
  itemLimit = parseInt(itemLimit, 10) || 12;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  function patternMap(i) {
    const patternSpot = (i) % 6;
    switch (patternSpot) {
      case 0:
        return 'size-2';
      case 1:
        return 'size-3';
      case 2:
        return 'size-2';
      case 3:
        return 'size-4';
      case 4:
        return 'size-1';
      case 5:
        return 'size-2';
      default:
        return 'size-2';
    }
  }

  function getLabelContent({
    /* eslint-disable react/prop-types */
    sponsorName,
    isHyperlocalContent,
    isCommunityContributor,
    tags,
    /* eslint-enable react/prop-types */
  }) {
    if (sponsorName) {
      return <div className="c-sponsor">Advertiser Content</div>;
    }

    if (isHyperlocalContent && isCommunityContributor) {
      return (
        <ContributorBadge
        tags={tags}
        ampPage={ampPage}
        useWhiteLogos={true}
      />
      );
    }

    return null;
  }
  if (Array.isArray(data)) {
    return (
      <div className="c-mosaic">
      <FeatureTitle title={title} moreURL={moreURL} />
        <div className="c-mosaic-box">
          {data.map((el, i) => {
            const {
              canonical_url: canonicalUrl,
              website_url: websiteUrl,
              headlines,
              label,
              taxonomy,
              publish_date: firstPublishDate,
              display_date: displayDate,
            } = el;
            const { hide_timestamp: hideTimestamp } = el.label || {};
            const { text: isHideTimestampTrue } = hideTimestamp || {};
            const { tags = [], sections } = taxonomy || {};
            const sponsorName = getSponsorData(sections, { arcSite: 'ajc', type: 'navigation', hierarchy: 'default' });
            const hyperlocalTags = getProperties().hyperlocalTags || [];
            const isHyperlocalContent = checkTags(
              tags,
              hyperlocalTags.filter(tag => tag !== 'community contributor'),
            );
            const isCommunityContributor = checkTags(
              tags,
              'community contributor',
            );
            const relativeURL = websiteUrl || canonicalUrl || '/';
            const getLabelContentConfig = {
              sponsorName,
              isHyperlocalContent,
              isCommunityContributor,
              label,
              taxonomy,
              firstPublishDate,
              displayDate,
              isHideTimestampTrue,
              tags,
            };
            if (i < itemLimit) {
              return (
                <div
                  key={`Mosaic-${i}`}
                  className={`mosaic-box ${patternMap(i)}`}
                >
                  {/* the link is empty - 100% coverage of content via css - because sectionLabel outputs a link as well */}
                  <a href={relativeURL}></a>
                  <div className="c-sectionLabel">
                   {getLabelContent(getLabelContentConfig)}
                  </div>
                  <span className="headline">
                    {truncateHeadline(get(headlines, 'basic', ''), true)}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return null;
};
Mosaic.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections', 'query-feed').tag({
      name: 'Content',
    }),
    displayClass: PropTypes.oneOf(['Mosaic']).tag({
      name: 'Display Class',
      defaultValue: 'Mosaic',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};
export default Mosaic;
