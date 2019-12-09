import React from 'react';
import PropTypes from 'prop-types';

const SocialURL = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Social URL</strong>
      <div>{src.raw_oembed.html}</div>
    </div>
);

SocialURL.propTypes = {
  src: PropTypes.node,
};

export default SocialURL;
