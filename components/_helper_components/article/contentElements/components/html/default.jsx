import React from 'react';
import PropTypes from 'prop-types';
import MarkupWrapper from './MarkupWrapper';
import './styles.scss';

const HTML = ({ src }) => {
  const { content } = src || '';
  return <div className="b-margin-bottom-d40-m20 c-customHTML"><MarkupWrapper html={content} /></div>;
};

HTML.propTypes = {
  src: PropTypes.object,
};

export default HTML;
