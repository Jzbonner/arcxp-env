import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const MarkupWrapper = ({ html }) => {
  if (html.match(/<script/)) {
    return <iframe className="scriptIframe" frameBorder="0" scrolling="no" width="100%" srcDoc={html} />;
  }
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

MarkupWrapper.propTypes = {
  html: PropTypes.string,
};

export default MarkupWrapper;
