import React from 'react';
import PropTypes from 'prop-types';

const HTML = ({ src }) => {
  const { content } = src || {};
  if (!content) return null;
  return <div className="b-margin-bottom-d40-m20" dangerouslySetInnerHTML={{ __html: content }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
