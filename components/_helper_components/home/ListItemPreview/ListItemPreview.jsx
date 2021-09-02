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

  if (storyData && storyData.headlines && storyData.headlines.web) {
    previewText = storyData.headlines.web;
  } else if (
    storyData
    && storyData.content_elements
    && storyData.content_elements[0]
    && storyData.content_elements[0].type === 'text'
  ) {
    let previewData = storyData.content_elements[0].content;
    if (storyData.content_elements[0].content.length < 90
    && storyData.content_elements[1]) {
      previewData = `${storyData.content_elements[0].content} ${storyData.content_elements[1].content}`;
    }
    const textContent = safeHtml(previewData, { whiteList: {} });
    previewText = textContent;
  }

  return <div className='c-listItemPreview'>
    <p>{previewText}</p>
  </div>;
};

ListItemPreview.propTypes = {
  id: PropTypes.string,
};

export default ListItemPreview;
