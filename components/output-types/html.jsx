import React from 'react';
import PropTypes from 'prop-types';

const HtmlOutputType = (props) => {
  const { children } = props;
  return <>{children}</>;
};

HtmlOutputType.contentType = 'text/html';

HtmlOutputType.propTypes = {
  children: PropTypes.node,
};
export default HtmlOutputType;
