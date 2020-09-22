import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ListItem from '../../home/ListItem/ListItem';
import filterDuplicateStory from '../sponsorRelatedBox/_helper_functions/filterDuplicateStory';
import AddFirstInlineImage from '../../../../content/sources/helper_functions/AddFirstInlineImage';
import FilterElements from '../../../../content/sources/helper_functions/FilterElements';
import '../../../features/List/default.scss';

const RelatedList = ({ taxonomy, uuid }) => {
  console.log('taxonomy', taxonomy);
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};
  const mobileBreakpoint = 768;
  const windowExists = typeof window !== 'undefined';
  let limit = null;
  let filteredData = null;
  let finalizedData = null;
  let goodData = null;


  let finalReferentId;
  if (referentId) {
    [, finalReferentId] = referentId.split('/');
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;
  console.log('formattedPath', formattedPath);

  const data = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 15,
    },
  });

  const getViewportSize = () => {
    if (windowExists && window.innerWidth) return window.innerWidth;
    return null;
  };

  if (windowExists) {
    if (getViewportSize() <= mobileBreakpoint) {
      limit = 4;
    } else {
      limit = 8;
    }
  }

  if (data && data.content_elements && data.content_elements.length > 1) {
    filteredData = filterDuplicateStory(data.content_elements, uuid);
    finalizedData = AddFirstInlineImage(filteredData, 'dummy', ['dummy']);
    goodData = FilterElements(finalizedData, 'dummy', ['dummy']);

    console.log('filtertedData', finalizedData);
  } else {
    return null;
  }

  console.log('relatedStoryData', data);

  console.log('limit', limit);

  debugger;


  return (
    <div className="c-relatedList b-margin-bottom-d40-m20">
      <h1 className="titleURL">In Other News</h1>
      <div className="c-homeListContainer two-columns left-photo-display-class">
        {goodData && goodData.map((el, i) => {
          if (i < limit) {
            return <ListItem key={`ListItem-${i}`} {...el} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

RelatedList.propTypes = {
  taxonomy: PropTypes.string,
  uuid: PropTypes.string,
};

RelatedList.defaultProps = {
  componentName: 'RelatedList',
};

export default RelatedList;
