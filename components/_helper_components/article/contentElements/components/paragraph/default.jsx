import React from 'react';
import PropTypes from 'prop-types';
import '../../default.scss';

const Paragraph = ({ src }) => {
  console.log('[PARAGRAPH]:', src);
  const { content } = src;
  if (content === '<br/>') {
    return <br />;
  }
  return <p className="" dangerouslySetInnerHTML={{ __html: content }} />;
};
Paragraph.propTypes = {
  src: PropTypes.any,
};
export default Paragraph;
