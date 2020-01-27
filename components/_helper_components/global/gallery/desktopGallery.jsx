// resolving git issues
import React from 'react';
import PropTypes from 'prop-types';

const DesktopGallery = (props) => {
  const { data, translateX } = props;

  return (
    <div className="gallery-container " style={{ transform: `translateX(${translateX}px)` }}>
        {data}
    </div>
  );
};

export default DesktopGallery;

DesktopGallery.propTypes = {
  data: PropTypes.array,
  translateX: PropTypes.number,
};
