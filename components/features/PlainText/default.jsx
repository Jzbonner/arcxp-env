import React from 'react';
import PropTypes from 'prop-types';

const TextFile = (props) => {
  const { customFields: { text } } = props;
  return <>{text || ''}</>;
};

TextFile.propTypes = {
  customFields: PropTypes.shape({
    text: PropTypes.richtext,
  }),
};
export default TextFile;
