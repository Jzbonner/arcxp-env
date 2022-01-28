import React from 'react';
import PropTypes from 'prop-types';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName.js';

export const AmpRelLink = ({
  type, noAmp, site, url,
}) => {
  if (type === 'story' && !noAmp && site && url) {
    return (
      <link rel="amphtml" href={`https://www.${handleSiteName(site)}.com${url}?outputType=amp`} />
    );
  }
  return null;
};

AmpRelLink.propTypes = {
  type: PropTypes.string,
  noAmp: PropTypes.bool,
  site: PropTypes.string,
  url: PropTypes.string,
};

export default AmpRelLink;
