import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import filterDuplicateStory from '../sponsorRelatedBox/_helper_functions/filterDuplicateStory';
import filterByPrimarySection from '../../../../content/sources/helper_functions/filterByPrimarySection';
import truncateHeadline from '../../../layouts/_helper_functions/homepage/truncateHeadline';
import '../../../features/MostRead/default.scss';
import './default.scss';

const RelatedList = ({ taxonomy, uuid, isAmp = false }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};
  let contentData = null;
  let primaryData = null;
  let finalReferentId;
  let counter = 0;

  if (referentId) {
    [, finalReferentId] = referentId.split('/');
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;

  const data = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 30,
    },
  });

  if (data && data.content_elements && data.content_elements.length > 1) {
    contentData = filterDuplicateStory(data.content_elements, uuid);
    primaryData = filterByPrimarySection(contentData, formattedPath);
  } else {
    return null;
  }

  return (
    <>
      {primaryData.length > 1 && !isAmp && (
        <div className="c-mostRead">
          <div className="mostReadTitle">In Other News</div>
          <div className="mostReadList">
            {primaryData && primaryData.map((el) => {
              const {
                headlines = {},
                canonical_url: canonicalUrl,
                website_url: websiteUrl,
              } = el;
              const relativeURL = websiteUrl || canonicalUrl;
              const { basic: title } = headlines;
              if (!relativeURL || !title) return null;

              if (counter < 5) {
                counter += 1;
                return <a key={`Headline-${counter}`} href={relativeURL} target="_self">
                  <div className="mostReadRanking">{counter}</div>
                  <div></div>
                  <div className="mostReadHeadline">{truncateHeadline(title)}</div>
                </a>;
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

RelatedList.propTypes = {
  isAmp: PropTypes.bool,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
};

RelatedList.defaultProps = {
  componentName: 'RelatedList',
};

export default RelatedList;
