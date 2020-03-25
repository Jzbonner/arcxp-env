import React from 'react';
import PropTypes from 'prop-types';

const AmpHeadline = ({ headlines }) => {
  if (!headlines) return null;

  return (
    <div className="c-headline">
      <h1>{ headlines.basic }</h1>
    </div>
  );
};

AmpHeadline.propTypes = {
  headlines: PropTypes.object.isRequired,
};

export default AmpHeadline;
