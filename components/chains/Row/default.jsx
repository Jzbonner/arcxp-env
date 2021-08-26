import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Row = ({ children }) => (
  <div className="c-Row">{children}</div>
);

Row.propTypes = {
  children: PropTypes.array,
};

export default Row;
