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
  } else if (storyData?.content_elements && !storyData?.headlines?.web) {
    const previewData = storyData?.content_elements?.find(content => content.type === 'text');
    const { _id: primaryContentId } = previewData || {};
    let { content: primaryContentText } = previewData || {};
    const secondaryContentText = storyData?.content_elements?.find(content => content.type === 'text' && content._id !== primaryContentId).content || null;

    if (primaryContentText.length < 90 && secondaryContentText) {
      primaryContentText = `${primaryContentText} ${secondaryContentText}`;
    }
    const textContent = safeHtml(primaryContentText, { whiteList: {} });
    previewText = textContent;
  }

  return <div className='c-listItemPreview'>{previewText}</div>;
};

ListItemPreview.propTypes = {
  id: PropTypes.string,
};

export default ListItemPreview;
