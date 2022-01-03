import React from 'react';
import PropTypes from 'prop-types';
import MarkupWrapper from './MarkupWrapper';

const HTML = ({ src, index }) => {
  const { content, alignment } = src || '';
  return <div className={`b-margin-bottom-d40-m20 c-customHTML ${alignment ? `align-${alignment}` : ''}`} data-index={index || null}><MarkupWrapper html={content} /></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
  index: PropTypes.number,
};

export default HTML;
