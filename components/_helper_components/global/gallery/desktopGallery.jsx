import React from 'react';
import PropTypes from 'prop-types';

const DesktopGallery = (props) => {
  const { data, translateX, visibility } = props;

  return (
    <div className={`gallery-container ${visibility ? 'is-Visible' : ''}`} style={{ transform: `translateX(${translateX}px)` }}>
        {data}
    </div>
  );
};

export default DesktopGallery;

DesktopGallery.propTypes = {
  data: PropTypes.array,
  translateX: PropTypes.number,
  visibility: PropTypes.bool,
};
