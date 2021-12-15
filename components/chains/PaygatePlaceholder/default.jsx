import React from 'react';
import PropTypes from 'prop-types';

const PaygatePlaceholder = ({ children }) => <div className="story-paygate_placeholder">{children}</div>;

PaygatePlaceholder.propTypes = {
  children: PropTypes.array,
};

export default PaygatePlaceholder;
