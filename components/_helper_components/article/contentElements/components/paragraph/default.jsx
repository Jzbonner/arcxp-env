import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Paragraph = ({ src }) => {
  if (src === '<br/>') {
    return null;
  }
  return (
    <p className="story-text">{src.content}</p>
  );
};

Paragraph.propTypes = {
  src: PropTypes.string,
};

export default Paragraph;
