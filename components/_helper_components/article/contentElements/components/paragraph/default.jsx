import React from 'react';
import PropTypes from 'prop-types';
import { safeHtml } from '../../../../global/utils/stringUtils';
import './default.scss';

const Paragraph = ({ src }) => {
  const { content } = src;
  return <p className="story-text b-margin-bottom-d40-m20" dangerouslySetInnerHTML={{ __html: safeHtml(content) }} />;
};

Paragraph.propTypes = {
  src: PropTypes.object,
};
export default Paragraph;
