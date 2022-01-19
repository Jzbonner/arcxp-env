import React from 'react';
import PropTypes from 'prop-types';
import { ConnextAuthTrigger } from '../../_helper_components/global/connext/default';

const PaygatePlaceholder = ({ children }) => <>
  <div className="story-paygate_placeholder">{children}</div>
  {ConnextAuthTrigger()}
</>;

PaygatePlaceholder.propTypes = {
  children: PropTypes.array,
};

export default PaygatePlaceholder;
