import React from 'react';
import PropTypes from 'prop-types';
import renderCustomHtml from './renderCustomHtml';
import './styles.scss';

const HTML = ({ src }) => {
  const { content } = src || '';

  return <div className="b-margin-bottom-d40-m20 c-customHTML" dangerouslySetInnerHTML={{ __html: renderCustomHtml(content) }}></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
