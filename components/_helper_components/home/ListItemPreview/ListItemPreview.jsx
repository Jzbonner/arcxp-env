/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { safeHtml } from '../../global/utils/stringUtils';

const ListItemPreview = ({ id, storyData }) => {
  let previewText = '';

  const data = useContent({
    source: !storyData?.contentElements ? 'content-api' : null,
    query: {
      id,
    },
  });

  const headlines = storyData?.headlines || data?.headlines;
  const contentElements = storyData?.contentElements || data?.content_elements;

  if (headlines?.web) {
    previewText = headlines.web;
  } else if (contentElements && !headlines?.web) {
    const previewData = contentElements?.find(content => content?.type === 'text');
    const { _id: primaryContentId } = previewData || {};
    let { content: primaryContentText } = previewData || {};
    const secondaryContentText = contentElements?.find(content => content?.type === 'text' && content?._id !== primaryContentId)?.content || null;

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
  storyData: PropTypes.object,
};

export default ListItemPreview;
