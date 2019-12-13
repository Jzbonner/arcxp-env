import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Oembed = ({ html, className, type }) => (
    <div
    data-oembed-type={type}
    className={className}
    dangerouslySetInnerHTML={{ __html: html }}/>
);

Oembed.propTypes = {
  html: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Oembed;
