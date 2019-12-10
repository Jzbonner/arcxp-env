import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Video</strong>
      <p>{src.content}</p>
    </div>
);

Video.propTypes = {
  src: PropTypes.any,
};

export default Video;
