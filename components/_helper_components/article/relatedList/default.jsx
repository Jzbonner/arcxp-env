import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ListItem from '../../home/ListItem/ListItem';
import filterDuplicateStory from '../sponsorRelatedBox/_helper_functions/filterDuplicateStory';
import AddFirstInlineImage from '../../../../content/sources/helper_functions/AddFirstInlineImage';
import FilterElements from '../../../../content/sources/helper_functions/FilterElements';
import '../../../features/List/default.scss';
import './default.scss';

const RelatedList = ({ taxonomy, uuid }) => {
  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};
  const mobileBreakpoint = 768;
  const windowExists = typeof window !== 'undefined';
  let limit = null;
  let contentData = null;
  let fixedImageData = null;
  let filteredData = null;
  let finalReferentId;

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
      size: 15,
    },
  });

  const getViewportSize = () => {
    if (windowExists && window.innerWidth) return window.innerWidth;
    return null;
  };

  if (windowExists) {
    if (getViewportSize() < mobileBreakpoint) {
      limit = 4;
    } else {
      limit = 8;
    }
  }

  if (data && data.content_elements && data.content_elements.length > 1) {
    contentData = filterDuplicateStory(data.content_elements, uuid);
    fixedImageData = AddFirstInlineImage(contentData, 'search', ['search']);
    filteredData = FilterElements(fixedImageData, 'search', ['search']);
  } else {
    return null;
  }

  return (
    <div className="c-relatedList b-margin-bottom-d40-m20">
      <h1 className="title">In Other News</h1>
      <div className="c-homeListContainer two-columns left-photo-display-class">
        {filteredData && filteredData.map((el, i) => {
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