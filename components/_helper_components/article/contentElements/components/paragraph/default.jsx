import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Paragraph = ({ src }) => {
  const { content } = src;
  if (content === '<br/>') {
    return null;
  }
  return <p className="story-text b-margin-bottom-d60-m40" dangerouslySetInnerHTML={{ __html: content }} />;
};

Paragraph.propTypes = {
  src: PropTypes.object,
  content: PropTypes.string,
};
export default Paragraph;
