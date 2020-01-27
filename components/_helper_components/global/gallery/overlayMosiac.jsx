// resolving git issues
import React from 'react';
import PropTypes from 'prop-types';

const OverlayMosiac = (props) => {
  const { data } = props;
  return (
    <div className="gallery-overlay-backdrop ">
      <div className="left-backdrop">
        {data && data[0]}
      </div>
      <div className="right-backdrop">
        {data && data[1]}
        {data && data[data.length - 1]}
      </div>
    </div>
  );
};

OverlayMosiac.propTypes = {
  data: PropTypes.array,
};

export default OverlayMosiac;
