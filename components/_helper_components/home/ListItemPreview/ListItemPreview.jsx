/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { safeHtml } from '../../global/utils/stringUtils';

const ListItemPreview = ({ id }) => {
  let previewText = '';

  const storyData = useContent({
    source: 'content-api',
    query: {
      id,
    },
  });

  if (storyData?.headlines?.web) {
    previewText = storyData.headlines.web;
  } else if (storyData?.content_elements[0]?.type === 'text') {
    let previewData = storyData.content_elements[0].content;
    const secondaryContent = storyData?.content_elements[1]?.content || null;
    if (previewData.length < 90 && secondaryContent) {
      previewData = `${previewData} ${secondaryContent}`;
    }
    const textContent = safeHtml(previewData, { whiteList: {} });
    previewText = textContent;
  }

  return <div className='c-listItemPreview'>{previewText}</div>;
};

ListItemPreview.propTypes = {
  id: PropTypes.string,
};

export default ListItemPreview;
