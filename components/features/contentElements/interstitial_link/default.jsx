import React from 'react';
import PropTypes from 'prop-types';

const InterstitialLink = ({ src }) => (
    <div style={{ border: '1px solid #000', padding: '10px' }}>
      Content Element Type: <strong>Interstitial Link</strong>
      <p>{src.content}</p>
    </div>
);

InterstitialLink.propTypes = {
  src: PropTypes.node,
};

export default InterstitialLink;
