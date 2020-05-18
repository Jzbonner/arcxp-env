import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import truncateHeadline from '../../layouts/_helper_functions/homepage/truncateHeadline';
import SectionLabel from '../../_helper_components/global/sectionLabel/default';
import getQueryParams from '../../layouts/_helper_functions/getQueryParams';
import TimeStamp from '../../_helper_components/article/timestamp/default';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ContributorBadge from '../../_helper_components/global/contributorBadge/default';
import './default.scss';

const Mosaic = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const appContext = useAppContext();
  const { contextPath, requestUri } = appContext;
  const queryParams = getQueryParams(requestUri);
  const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
  const ampPage = outPutTypePresent && queryParams.outputType === 'amp';

  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      startIndex = 1,
      itemLimit = 100,
      title = '',
    },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: { ...contentConfigValues, arcSite },
  });

  function patternMap(index, i) {
    const patternSpot = (index + i - 1) % 6;
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

  if (data) {
    return (
      <div className="c-mosaic">
        {title && <div className="title">{title}</div>}
        <div className="c-mosaic-box">
          {data.content_elements.map((el, i) => {
            const {
              websites, headlines, label, taxonomy, publish_date: firstPublishDate, display_date: displayDate,
            } = el;
            const { hide_timestamp: hideTimestamp } = el.label || {};
            const { text: isHideTimestampTrue } = hideTimestamp || {};
            const { tags = [] } = taxonomy || {};
            const hyperlocalTags = getProperties().hyperlocalTags || [];
            const isHyperlocalContent = checkTags(tags, hyperlocalTags);

            const relativeURL = (websites && websites[arcSite] && websites[arcSite].website_url) || '/';

            if (startIndex - 1 <= i && i < startIndex - 1 + itemLimit) {
              return (
                <div key={`Mosaic-${i}`} className={`mosaic-box ${patternMap(startIndex, i)}`}>
                  {/* the link is empty - 100% coverage of content via css - because sectionLabel outputs a link as well */}
                  <a href={`${contextPath}${relativeURL}`}></a>
                  <div className="c-sectionLabel">
                    {isHyperlocalContent && <ContributorBadge tags={tags} ampPage={ampPage} useWhiteLogos={true} tease={true} />}
                    {!isHyperlocalContent && (
                      <>
                        <SectionLabel label={label || {}} taxonomy={taxonomy} />
                        <TimeStamp
                          firstPublishDate={firstPublishDate}
                          displayDate={displayDate}
                          isHideTimestampTrue={isHideTimestampTrue}
                          isTease={true}
                        />
                      </>
                    )}
                  </div>
                  <span className="headline">{truncateHeadline(headlines.basic)}</span>
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
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 100,
    }),
    displayClass: PropTypes.oneOf(['Mosaic']).tag({
      name: 'Display Class',
      defaultValue: 'Mosaic',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
  }),
};

export default Mosaic;
