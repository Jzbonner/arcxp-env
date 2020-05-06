import React from 'react';
import PropTypes from 'prop-types';

export const AmpRelLink = ({ type, url, noAmp }) => {
  if (type === 'story' && !noAmp && url) {
    return (
      <link rel="amphtml" href={`${url}?outputType=amp`}/>
    );
  }
  return null;
};

AmpRelLink.propTypes = {
  type: PropTypes.string,
  url: PropTypes.string,
  noAmp: PropTypes.bool,
};

export default AmpRelLink;
