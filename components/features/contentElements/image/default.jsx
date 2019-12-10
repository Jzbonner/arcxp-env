import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Image</strong>
      <img src={src.url} alt={src.caption} />
      <p>
        Image description: <strong>{src.caption}</strong>
      </p>
      <p>
        Author: <strong>{src.credits.by ? src.credits.by[0].name : 'No Author'}</strong>
      </p>
    </div>
);

Image.propTypes = {
  src: PropTypes.any,
};

export default Image;
