import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Paragraph = ({ src }) => {
  const { content } = src;
  if (src === '<br/>') {
    return null;
  }
  return (
    <p className="story-text">{content}</p>
  );
};

Paragraph.propTypes = {
  src: PropTypes.object,
  content: PropTypes.string,
};

export default Paragraph;
