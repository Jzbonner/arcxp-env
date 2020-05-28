import React from 'react';
import PropTypes from 'prop-types';

const TextOutputType = (props) => {
  const { children } = props;
  return <>{children}</>;
};

TextOutputType.contentType = 'text/plain';

TextOutputType.fallback = false;

TextOutputType.propTypes = {
  children: PropTypes.node,
};
export default TextOutputType;
