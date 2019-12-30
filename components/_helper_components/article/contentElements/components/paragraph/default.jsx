import React from 'react';
import PropTypes from 'prop-types';
import '../../default.scss';

const Paragraph = ({ src }) => {
  const { content } = src;
  if (content === '<br/>') {
    return <br />;
  }
  return <p className="paragraph" dangerouslySetInnerHTML={{ __html: content }} />;
};
Paragraph.propTypes = {
  src: PropTypes.string,
};
export default Paragraph;
